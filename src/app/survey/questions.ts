// src/app/survey/questions.ts — the Pakistan AI Skills Survey 2026, as data.
//
// The single source for both the visible form (SurveyForm.tsx) and the
// validator in /api/survey, so a stored answer can never be something the
// form did not offer. Ten questions, from Section 3.2 of the plan; every
// question and option carries its Urdu, because the audience this survey is
// about is the one that gets left out of English-only research.
export type Choice = { en: string; ur: string }
export type Question = { id: string; en: string; ur: string; options: readonly Choice[] }

export const QUESTIONS: readonly Question[] = [
  {
    id: 'country',
    en: 'Where do you live?',
    ur: 'آپ کہاں رہتے ہیں؟',
    options: [
      { en: 'Pakistan', ur: 'پاکستان' },
      { en: 'Saudi Arabia', ur: 'سعودی عرب' },
      { en: 'United Arab Emirates', ur: 'متحدہ عرب امارات' },
      { en: 'Qatar', ur: 'قطر' },
      { en: 'Oman', ur: 'عمان' },
      { en: 'Kuwait', ur: 'کویت' },
      { en: 'Bahrain', ur: 'بحرین' },
      { en: 'United Kingdom', ur: 'برطانیہ' },
      { en: 'United States', ur: 'امریکہ' },
      { en: 'Canada', ur: 'کینیڈا' },
      { en: 'Australia', ur: 'آسٹریلیا' },
      { en: 'Malaysia', ur: 'ملائیشیا' },
      { en: 'Other', ur: 'کوئی اور ملک' },
    ],
  },
  {
    id: 'age',
    en: 'How old are you?',
    ur: 'آپ کی عمر؟',
    options: [
      { en: 'Under 18', ur: '۱۸ سال سے کم' },
      { en: '18–24', ur: '۱۸ سے ۲۴' },
      { en: '25–34', ur: '۲۵ سے ۳۴' },
      { en: '35–44', ur: '۳۵ سے ۴۴' },
      { en: '45 or older', ur: '۴۵ یا اس سے زیادہ' },
    ],
  },
  {
    id: 'work',
    en: 'What do you do right now?',
    ur: 'اس وقت آپ کیا کرتے ہیں؟',
    options: [
      { en: 'Student', ur: 'طالبِ علم' },
      { en: 'Employed full time', ur: 'مکمل وقتی ملازمت' },
      { en: 'Employed part time', ur: 'جزوقتی ملازمت' },
      { en: 'Freelancer', ur: 'فری لانسر' },
      { en: 'Business owner', ur: 'اپنا کاروبار' },
      { en: 'Looking for work', ur: 'کام کی تلاش میں' },
      { en: 'Not working right now', ur: 'فی الحال کچھ نہیں کر رہا/رہی' },
    ],
  },
  {
    id: 'tried',
    en: 'Have you ever tried to learn AI?',
    ur: 'کیا آپ نے کبھی AI سیکھنے کی کوشش کی؟',
    options: [
      { en: 'Yes, and I am still learning', ur: 'ہاں، اور اب بھی سیکھ رہا/رہی ہوں' },
      { en: 'Yes, but I stopped', ur: 'ہاں، لیکن چھوڑ دی' },
      { en: 'No, not yet', ur: 'نہیں، ابھی تک نہیں' },
    ],
  },
  {
    id: 'blocker',
    en: 'What has stopped you most?',
    ur: 'سب سے بڑی رکاوٹ کیا رہی؟',
    options: [
      { en: 'Everything is in English', ur: 'ہر چیز انگریزی میں ہے' },
      { en: 'I cannot code', ur: 'مجھے کوڈنگ نہیں آتی' },
      { en: 'Courses cost too much', ur: 'کورس بہت مہنگے ہیں' },
      { en: 'I do not have time', ur: 'وقت نہیں ملتا' },
      { en: 'I do not know where to start or who to trust', ur: 'سمجھ نہیں آتی کہاں سے شروع کروں یا کس پر بھروسہ کروں' },
      { en: 'Internet or device problems', ur: 'انٹرنیٹ یا ڈیوائس کا مسئلہ' },
      { en: 'Nothing has stopped me', ur: 'کوئی رکاوٹ نہیں آئی' },
    ],
  },
  {
    id: 'language',
    en: 'Which language would you rather learn in?',
    ur: 'آپ کس زبان میں سیکھنا پسند کریں گے؟',
    options: [
      { en: 'Urdu', ur: 'اردو' },
      { en: 'English', ur: 'انگریزی' },
      { en: 'A mix of Urdu and English', ur: 'اردو اور انگریزی ملا کر' },
      { en: 'Roman Urdu', ur: 'رومن اردو' },
      { en: 'It makes no difference to me', ur: 'مجھے کوئی فرق نہیں پڑتا' },
    ],
  },
  {
    id: 'budget',
    en: 'What would you pay for a complete AI agents course?',
    ur: 'مکمل AI ایجنٹ کورس کے لیے آپ کتنی رقم دے سکتے ہیں؟',
    options: [
      { en: 'Free only', ur: 'صرف مفت' },
      { en: 'Under PKR 5,000', ur: 'پانچ ہزار روپے سے کم' },
      { en: 'PKR 5,000–15,000', ur: 'پانچ سے پندرہ ہزار' },
      { en: 'PKR 15,000–30,000', ur: 'پندرہ سے تیس ہزار' },
      { en: 'PKR 30,000–60,000', ur: 'تیس سے ساٹھ ہزار' },
      { en: 'More than PKR 60,000', ur: 'ساٹھ ہزار سے زیادہ' },
    ],
  },
  {
    id: 'tools',
    en: 'Which AI tools have you used?',
    ur: 'آپ نے کون سے AI ٹولز استعمال کیے ہیں؟',
    options: [
      { en: 'ChatGPT', ur: 'ChatGPT' },
      { en: 'Claude', ur: 'Claude' },
      { en: 'Gemini', ur: 'Gemini' },
      { en: 'More than one of these', ur: 'ان میں سے ایک سے زیادہ' },
      { en: 'None of them', ur: 'ان میں سے کوئی نہیں' },
    ],
  },
  {
    id: 'goal',
    en: 'Why do you want to learn this?',
    ur: 'آپ یہ کیوں سیکھنا چاہتے ہیں؟',
    options: [
      { en: 'A job', ur: 'نوکری کے لیے' },
      { en: 'Freelancing income', ur: 'فری لانسنگ سے آمدنی' },
      { en: 'To use AI in my own business', ur: 'اپنے کاروبار میں استعمال کے لیے' },
      { en: 'Curiosity — I just want to understand it', ur: 'صرف سمجھنے کے لیے' },
      { en: 'To teach it to others', ur: 'دوسروں کو سکھانے کے لیے' },
    ],
  },
  {
    id: 'built',
    en: 'Have you ever built anything with AI?',
    ur: 'کیا آپ نے AI سے کبھی کچھ بنایا ہے؟',
    options: [
      { en: 'No, I have only chatted with AI', ur: 'نہیں، صرف بات چیت کی ہے' },
      { en: 'I have tried but never finished anything', ur: 'کوشش کی لیکن مکمل نہیں کر سکا/سکی' },
      { en: 'Yes, something small', ur: 'ہاں، کچھ چھوٹا سا' },
      { en: 'Yes, something running that other people use', ur: 'ہاں، کچھ ایسا جو چل رہا ہے اور لوگ استعمال کرتے ہیں' },
    ],
  },
]

/** Field id → the exact strings the form can submit. The API validates
 *  against this, so the sheet only ever holds answers the form offered. */
export const ALLOWED: Record<string, readonly string[]> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q.options.map((o) => o.en)]),
)
