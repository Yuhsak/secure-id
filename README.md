# secure-id

Secure id generator for Browsers, Node.js, and ReactNative written in TypeScript.

## Features

- **Secure**: Generates cryptographically secure random ids using `window.crypto` for Browsers, `require('crypto')` for Node.js, and `react-native-get-random-values` for ReactNative.
- **Fast**: Much faster than `uuid4`.
- **Tiny**: Only 612 bytes of gzipped, minified.

> Compatible for es6+

## Install

```sh
npm install secure-id
```

## Usage

```ts
import {create} from 'secure-id

// function create(characters: string): (length: number) => string
const {generate, validate} = create('ab01')(6)

// id -> 'b110ba', 'a01aab', '0bba01' etc.
const id = generate()

// true
validate(id)
validate('aaaaaa')
validate('01ab00')

// false
validate('aaaaa') //invalid length
validate('aaaaad') //invalid characters
```
