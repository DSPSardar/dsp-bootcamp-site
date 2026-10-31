// Run the real components against a fake Player.js receiver and browser lifecycle.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root=process.argv[2]||path.resolve(__dirname,'..')
for(const name of (process.argv[3] ? [process.argv[3]] : ['WatchTracker','StableVideoFrame'])){
 const events=new Map(),timers=new Map(),effects=[],commands=[],queue=[],writes=[]
 let id=0,now=0
 const add=(k,f)=>{if(!events.has(k))events.set(k,new Set());events.get(k).add(f)},remove=(k,f)=>events.get(k)?.delete(f)
 const frame={src:'https://iframe.mediadelivery.net/embed/1/video',addEventListener:(k,f)=>add('frame:'+k,f),removeEventListener:(k,f)=>remove('frame:'+k,f)}
 frame.contentWindow={postMessage(raw){const d=JSON.parse(raw);commands.push(d)
  // Official Receiver replies immediately to ready subscriptions when already ready.
  if(d.method==='addEventListener'&&d.value==='ready')queue.push({event:'ready'})
  if(d.method==='getDuration')queue.push({event:'getDuration',value:100})
  if(d.method==='getCurrentTime')queue.push({event:'getCurrentTime',value:25})
  if(d.method==='getPaused')queue.push({event:'getPaused',value:false})
 }}
 const emit=(data,extra={})=>{for(const f of [...(events.get('message')||[])])f({source:frame.contentWindow,origin:'https://iframe.mediadelivery.net',data:JSON.stringify({context:'player.js',...data}),...extra})}
 const drain=()=>{let n=0;while(queue.length){assert.ok(++n<1000,name+': unbounded ready message loop');emit(queue.shift())}}
 const react={useRef:v=>({current:v}),useState:v=>[v,()=>{}],useCallback:f=>f,useEffect:f=>effects.push(f)}
 const jsx=(t,p)=>{if(t==='iframe'&&p.ref)p.ref.current=frame;return{type:t,props:p}}
 react.createElement=jsx
 const timer=(f,ms)=>{timers.set(++id,{f,ms});return id}
 const sandbox={exports:{},require:k=>k==='react'?react:k==='react/jsx-runtime'?{jsx,jsxs:jsx,Fragment:'fragment'}:k==='next/navigation'?{useRouter:()=>({refresh(){}})}:(()=>{throw new Error('Unexpected import: '+k)})(),
 window:{addEventListener:add,removeEventListener:remove,dispatchEvent:e=>{for(const f of events.get(e.type)||[])f(e)},location:{href:'https://example.com/app',reload(){}}},
 document:{querySelector:()=>frame,visibilityState:'visible',addEventListener:(k,f)=>add('doc:'+k,f),removeEventListener:(k,f)=>remove('doc:'+k,f)},
 navigator:{sendBeacon:()=>true},URL,Blob,Event,Date:{now:()=>now},fetch:async(u,o)=>{writes.push(JSON.parse(o.body));return{ok:true}},setInterval:timer,setTimeout:timer,clearInterval:i=>timers.delete(i),clearTimeout:i=>timers.delete(i)}
 const source=fs.readFileSync(path.join(root,'src/components/mastery',name+'.tsx'),'utf8')
 vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,sandbox)
 sandbox.exports.default(name==='WatchTracker'?{lesson:'test-lesson'}:{src:frame.src,title:'Test'})
 const cleanup=effects.map(f=>f())
 emit({event:'ready'});drain()
 assert.equal(commands.filter(d=>d.value==='ready').length,0)
 const once=commands.length
 emit({event:'ready'});drain()
 assert.equal(commands.length,once,'handle ready only once per frame')
 sandbox.window.dispatchEvent(new Event('dsp:video-remount'))
 const remountCommands=commands.length
 emit({event:'ready'});drain()
 assert.ok(commands.length>remountCommands,'reset ready guard on video remount')
 const before=commands.length
 emit({event:'ready'},{source:{}});emit({event:'ready'},{origin:'https://other.example'})
 assert.equal(commands.length,before,'ignore foreign frames/origins')
 if(name==='WatchTracker'){
  for(const {f,ms} of [...timers.values()])if(ms===15000)f()
  drain();assert.ok(writes.some(d=>d.seconds===25&&d.duration===100),'save getter event replies')
  emit({event:'timeupdate',value:{seconds:85,duration:100}})
  assert.ok(writes.some(d=>d.seconds===85),'save completion threshold')
 }else{
  emit({event:'play'});now=30000
  for(const {f,ms} of [...timers.values()])if(ms===5000)f()
  drain();assert.ok(commands.some(d=>d.method==='getPaused'),'keep stall watchdog')
 }
 for(const f of cleanup)f?.()
 assert.equal(timers.size,0,'clean up timers');assert.equal([...events.values()].reduce((n,s)=>n+s.size,0),0,'clean up listeners')
 console.log('PASS',name,': bounded ready messages, frame isolation, progress/recovery, cleanup')
}
