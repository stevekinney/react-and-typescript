---
path: "/overloads"
title: "Function Overloads"
order: "9C"
section: "Advanced Component Patterns"
description: "A brief look at function overloads in TypeScript."
---

TypeScript gives you the ability to provide more than one type signature to the same function.

```ts
type callback = (result: number) => void;

function asyncAdd(a: number, b: number): Promise<number>;
function asyncAdd(a: number, b: number, fn: callback): void;
// define the actual implementation
// notice fn is optional
// also notice that the return type is inferred, but it could be specified as `void | Promise<number>`
function asyncAdd(a: number, b: number, fn?: callback) {
  const result = a + b;
  if (fn) return fn(result);
  else return Promise.resolve(result);
}
```

Let's do a second one.

```ts
function add(first: number): (second: number) => number;
function add(first: number, second: number): number;
function add(
  first: number,
  second?: number
): number | ((second: number) => number) {
  if (!second) return (second: number) => first + second;
  return first + second;
}

const addTwo = add(2);
const four: number = addTwo(4);
const eight = add(4, 4);
```
