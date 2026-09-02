// scripts/lib/ts-resolve-hooks.mjs — module-resolution hooks so plain Node can
// import the app's TypeScript modules the way Next does:
//   • `@/x`            → ./src/x            (tsconfig `paths`)
//   • extensionless    → .ts / .tsx / .json / index.*
//   • *.json           → loaded as JSON (Node needs `with { type: 'json' }`;
//                        the hook supplies the attribute)
// Type stripping itself is Node's own (22.18+ / 23.6+ by default, earlier
// 22.x with --experimental-strip-types). Registered by scripts/check-schema.mjs.
import { existsSync, statSync } from 'node:fs'
import { dirname, resolve as resolvePath } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..', '..')
const EXTENSIONS = ['.ts', '.tsx', '.mts', '.js', '.mjs', '.json']

const isFile = (p) => existsSync(p) && statSync(p).isFile()

function findFile(base) {
  const candidates = [base, ...EXTENSIONS.map((e) => base + e), ...EXTENSIONS.map((e) => resolvePath(base, 'index' + e))]
  return candidates.find(isFile) ?? null
}

export async function resolve(specifier, context, nextResolve) {
  let base = null
  if (specifier.startsWith('@/')) base = resolvePath(root, 'src', specifier.slice(2))
  else if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file:'))
    base = resolvePath(dirname(fileURLToPath(context.parentURL)), specifier)

  const file = base && findFile(base)
  if (!file) return nextResolve(specifier, context)
  // Declare the format up front: the app has no "type": "module" in
  // package.json, so without this Node would sniff each .ts file and warn.
  const format = file.endsWith('.json') ? 'json' : /\.(ts|mts|tsx)$/.test(file) ? 'module-typescript' : undefined
  return {
    url: pathToFileURL(file).href,
    shortCircuit: true,
    ...(format ? { format } : {}),
    ...(format === 'json' ? { importAttributes: { type: 'json' } } : {}),
  }
}
