# secure-id

Secure id generator for Browsers, Node.js, and ReactNative written in TypeScript.

## Install

```sh
npm install secure-id
```

## Usage

```ts
import {create} from 'secure-id

const {generate, validate} = create('abc012')

// id -> 'c110ba', 'a21aac', '0cca01' etc.
const id = generate(6)

// true
validate(id)
validate(id+'a0')
validate(id+'b1')
validate(id+'c2')

// false
validate(id+'d')
```
