---
path: "/overloads"
title: "Function Overloads"
order: "9E"
section: "Advanced Component Patterns"
description: "A brief look at function overloads in TypeScript."
---

TypeScript gives you the ability to provide more than one type signature to the same function.

```ts
type callback = (result: number) => void;

function asyncAdd(a: number, b: number): Promise<number>;
function asyncAdd(a: number, b: number, fn: callback): void;
function asyncAdd(a: number, b: number, fn?: callback) {
  const result = a + b;
  if (fn) return fn(result);
  else return Promise.resolve(result);
}
```

## Your Mission

We're going to to make an `add` function that works with partial application. You can use [this playground](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoBTIFzLATwBpEAjbFAgSkQG8BYAKEURmEQxMQF4fFxUApsBhgBqagCcBUEBKQdyefNS4A+FIgDUpANyNmUmXI3aSehgF8gA).

```ts
add(2, 2); // returns 4
add(2); // returns a function that accepts the second number

const addTwo = add(2);
addTwo(3); // returns 5
```

In case this is somewhat unfamiliar to you, this is what it might look like in JavaScript.

```js
function add(a, b) {
  if (b === undefined) return (b) => a + b;
  return a + b;
}
```

(You can take peek at the solution [here][solution].)

[solution]: https://www.typescriptlang.org/play?ssl=12&ssc=7&pln=12&pc=10#code/GYVwdgxgLglg9mABAQwCaoBTBgJwM5QBciYIAtgEYCmOAlMRnlRAqsaZTbYgLwB8JctRwBuALAAoUJFgIU6LLgLshNADSImLMG0Gc6K-eKnho8JGkyTEibPiJ7ha65uasA-IeGT6jmogAfRAxGNx0vLl4BDmFuAG8XGGBgrVZeHh5EcFQqbDAqVG4cKigQHCRQ7V0YyP55TDsCDVSdWmMbYtLy2yUoRABqVyrjAF9JSW0CeoAVAHc4XnqMACY2iYQpvBgADwicRcs5uAwAFjWJSb6qGABzAAs+zMtTjTORIA
