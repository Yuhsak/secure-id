const ctx =
  // Modern browsers and node.js
  typeof globalThis === 'object'
    ? globalThis
    // Old browsers
    : typeof window === 'object'
      ? window
      // Old node.js
      : typeof 'global' === 'object'
        ? global
        // Any other environment
        : {}

const copy = <D extends Uint8Array, S extends number[]>(d: D, s: S) => {
  let i = s.length
  while (i--) {
    d[i] = s[i]
  }
  return d
}

const randomFillSyncFallback = <T extends Uint8Array>(v: T) => copy(v, Array(v.length).fill(0).map(_ => Math.floor(Math.random() * 256)))

export const randomFillSync: <T extends Uint8Array>(uInt8Array: T) => T = ((g: any) => {
  if (g.crypto && typeof g.crypto.getRandomValues === 'function') {
    // Browser and ReactNative with 'react-native-get-random-values'
    return g.crypto.getRandomValues.bind(g.crypto)
  }
  if (typeof g.require === 'function') {
    try {
      // Node.js
      return g.require('crypto').randomFillSync
    } catch (e) {
      try {
        // ReactNative with Expo
        const f = g.require('expo-random').getRandomBytes
        return (v: Uint8Array) => copy(v, f(v.length))
      } catch (e) {}
    }
  }
  return void (0)
})(ctx) || randomFillSyncFallback

let p: Uint8Array, po: number

export const random = (bytes: number) => {

  if (!p || p.length < bytes) {
    p = new Uint8Array(bytes * 128)
    randomFillSync(p)
    po = 0
  } else if (bytes > p.length - po) {
    randomFillSync(p)
    po = 0
  }

  const r = p.subarray(po, po+bytes)

  po += bytes

  return r

}

// -, /, \, [, ]
const escapeRegExp = (source: string) => source.replace(/[\-\/\\\[\]]/g, s => '\\' + s)

export const create = (symbols: string) => (n: number=21) => {

  const l = symbols.length

  const regexp = new RegExp('^['+escapeRegExp(symbols)+']{'+n+'}$')

  const validate = (s: string) => regexp.test(s)

  const generate = () => {

    const b = random(n)

    let r = ''
    let i = n
    while(i--) {
      r += symbols[b[i] % l]
    }

    return r

  }

  return {
    regexp,
    validate,
    generate
  }

}
