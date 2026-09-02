#!/bin/zsh
# Encode every course recording in the module folders to a 1080p master (_MASTER/*_v1.mp4) and upload to Bunny.
# Skips files that already have a master. Safe to re-run. Logs to _MASTER/process.log
set -u
ROOT="/Users/abdulkhan/DSP-Mastery"; M="$ROOT/_MASTER"; LOG="$M/process.log"; SITE="/Users/abdulkhan/Desktop/dsp-bootcamp-site"
cd "$ROOT"
find Phase-* 00-Welcome -name "*.mp4" -not -name "*_DISCARDED*" | sort | while read SRC; do
  base=$(basename "$SRC" .mp4)
  # strip working suffixes (_VERIFY-GAP, _SECRETS-CHECK, _PROBABLE) from the master name
  stem=$(echo "$base" | sed -E 's/_(VERIFY-GAP|SECRETS-CHECK|PROBABLE)$//')
  OUT="$M/${stem}_v1.mp4"
  [ -f "$OUT" ] && { echo "$(date +%H:%M) skip  $stem (master exists)" >> "$LOG"; continue; }
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC" </dev/null)
  # trim trailing silence: last silence (>=3s, -35dB) that runs to within 30s of the end
  tail_cut=$(ffmpeg -hide_banner -nostdin -i "$SRC" -vn -af "silencedetect=n=-35dB:d=3" -f null - 2>&1 | grep -o "silence_start: [0-9.]*" | awk '{print $2}' | tail -1)
  T=""; if [ -n "$tail_cut" ] && awk -v a="$tail_cut" -v d="$dur" 'BEGIN{exit !(d-a<30)}'; then T="-t $tail_cut"; fi
  echo "$(date +%H:%M) start $stem (${dur%.*}s, trim=${tail_cut:-none})" >> "$LOG"
  ffmpeg -hide_banner -nostdin -y -i "$SRC" ${=T} -vf "scale=-2:1080,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x0E2A47,format=yuv420p" \
    -c:v h264_videotoolbox -b:v 4500k -maxrate 6000k -bufsize 9000k -profile:v high -r 25 \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a aac -b:a 192k -movflags +faststart "$OUT" > /dev/null 2>&1 \
    && echo "$(date +%H:%M) done  $stem ($(du -m "$OUT" | cut -f1) MB)" >> "$LOG" \
    || { echo "$(date +%H:%M) FAIL  $stem" >> "$LOG"; rm -f "$OUT"; continue; }
done
echo "$(date +%H:%M) encoding pass complete — uploading" >> "$LOG"
cd "$SITE" && node scripts/bunny-upload.mjs "$M" >> "$LOG" 2>&1
node scripts/bunny-sync.mjs >> "$LOG" 2>&1
echo "$(date +%H:%M) ALL DONE" >> "$LOG"
