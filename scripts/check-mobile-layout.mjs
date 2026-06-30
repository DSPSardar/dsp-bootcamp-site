import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const URL = process.argv[2] || process.env.DSP_SITE_URL || 'http://127.0.0.1:3000'
const VIEWPORT = { width: 390, height: 844 }
const TOLERANCE = 2

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].filter(Boolean)

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await readFile(candidate)
      return candidate
    } catch {}
  }

  throw new Error('Chrome was not found. Set CHROME_PATH to a Chromium-compatible browser.')
}

async function waitForDevToolsPort(userDataDir) {
  const activePortFile = join(userDataDir, 'DevToolsActivePort')

  for (let i = 0; i < 100; i += 1) {
    try {
      const [port] = (await readFile(activePortFile, 'utf8')).trim().split('\n')
      return port
    } catch {
      await sleep(50)
    }
  }

  throw new Error('Chrome did not expose a DevTools port in time.')
}

async function waitForPageTarget(port) {
  for (let i = 0; i < 100; i += 1) {
    const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((res) => res.json())
    const page = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl)
    if (page) return page.webSocketDebuggerUrl
    await sleep(50)
  }

  throw new Error('Chrome did not create a page target in time.')
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl)
    this.id = 0
    this.pending = new Map()
    this.events = []

    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true })
      this.ws.addEventListener('error', reject, { once: true })
    })

    this.ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data)
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id)
        this.pending.delete(message.id)
        if (message.error) reject(new Error(message.error.message))
        else resolve(message.result)
        return
      }

      this.events.push(message)
    })
  }

  async send(method, params = {}) {
    await this.ready
    const id = (this.id += 1)
    this.ws.send(JSON.stringify({ id, method, params }))
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
    })
  }

  close() {
    this.ws.close()
  }
}

async function waitForReadyState(client) {
  for (let i = 0; i < 100; i += 1) {
    const result = await client.send('Runtime.evaluate', {
      expression: 'document.readyState',
      returnByValue: true,
    })

    if (result.result.value === 'complete') return
    await sleep(100)
  }

  throw new Error('Page did not finish loading in time.')
}

async function stopChrome(child) {
  if (child.exitCode !== null) return

  child.kill('SIGTERM')
  await Promise.race([once(child, 'exit'), sleep(2000)])
}

async function measureMobileLayout() {
  const chrome = await findChrome()
  const userDataDir = await mkdtemp(join(tmpdir(), 'dsp-mobile-layout-'))
  const child = spawn(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    '--remote-debugging-port=0',
    `--user-data-dir=${userDataDir}`,
    `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
    URL,
  ])

  try {
    const port = await waitForDevToolsPort(userDataDir)
    const wsUrl = await waitForPageTarget(port)
    const client = new CdpClient(wsUrl)

    await client.send('Runtime.enable')
    await client.send('Page.enable')
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: VIEWPORT.width,
      height: VIEWPORT.height,
      deviceScaleFactor: 3,
      mobile: true,
    })
    await client.send('Page.navigate', { url: URL })
    await waitForReadyState(client)

    const expression = `
      (() => {
        const viewportWidth = window.innerWidth;
        const documentWidth = Math.max(
          document.documentElement.scrollWidth,
          document.body.scrollWidth
        );
        const nodes = Array.from(document.querySelectorAll('#student-projects, #student-projects *'));
        const overflow = nodes
          .map((node) => {
            const rect = node.getBoundingClientRect();
            const style = window.getComputedStyle(node);
            return {
              tag: node.tagName.toLowerCase(),
              text: (node.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 90),
              className: typeof node.className === 'string' ? node.className : '',
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              display: style.display,
              gridTemplateColumns: style.gridTemplateColumns,
              padding: style.padding,
            };
          })
          .filter((item) =>
            item.width > 0 &&
            (item.left < -${TOLERANCE} || item.right > viewportWidth + ${TOLERANCE})
          );

        return {
          viewportWidth,
          documentWidth,
          overflow,
        };
      })()
    `

    const result = await client.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })

    client.close()
    return result.result.value
  } finally {
    await stopChrome(child)
    await rm(userDataDir, { recursive: true, force: true })
  }
}

const result = await measureMobileLayout()
const hasPageOverflow = result.documentWidth > result.viewportWidth + TOLERANCE
const hasElementOverflow = result.overflow.length > 0

if (hasPageOverflow || hasElementOverflow) {
  console.error(
    JSON.stringify(
      {
        message: 'Mobile layout overflows the viewport.',
        viewportWidth: result.viewportWidth,
        documentWidth: result.documentWidth,
        overflow: result.overflow.slice(0, 10),
      },
      null,
      2
    )
  )
  process.exit(1)
}

console.log(
  `Mobile layout fits within ${result.viewportWidth}px viewport (document width ${result.documentWidth}px).`
)
