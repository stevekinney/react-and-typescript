---
path: "/generics"
title: "Working with Generics"
order: "5A"
section: "Helpful TypeScript Concepts"
description: "A gentle tour of what generics are in TypeScript and how they work."
---

You might have seen some syntax at looks like this.

```tsx
type Link<T> = {
  value: T;
  next: Link<T>;
};
```

We can't just make a new object with that type.

```ts
const link: Link = {};
```

Now, we can define what type `T` should be.

```ts
const link: Link<string> = { value: "hello" };
```

It's kind of like a variable.

You can use this variable to pay it forward a bit.

```ts
const firstLink: Link<number> = {
  value: 2,
  next: {
    value: "string", // This won't work.
  },
};
```

This will work, however:

```ts
const firstLink: Link<number> = {
  value: 2,
  next: {
    value: 4,
  },
};
```

TypeScript will try to help you out as much as possible.

You can also use this in a function.

```ts
function identity<T>(arg: T) {
  return arg;
}
```

This would be not great if we had to make new functions for every different type that we anted to use the indentity function on.

```ts
identity<number>(3);
```

It turns out that TypeScript will try its darnest to help out.

```ts
identity(3);
```

I'm just going to casually mention that this might be important for our understanding later.

## Your Mission

This will be quick, but we'll build a little break into it.

Are you familiar with the [`tap` utility method](https://lodash.com/docs/#tap)? `tap` takes an argument and a function. It passes the argument into the function and immediately returns the return value.

For example:

```js
const arrayWithoutLast = tap([1, 2, 3, 4], function (array) {
  // Pop always returns the value it removed from the end of the array.
  return array.pop();
});
```

So, here are the nuances.

It not only needs to figure out the type like `identity` but it also needs to pass that same type into the function, _and_ it needs to return that type. The callback function is just mutating the object, so it doesn't need to return anything.

The following code should return the original array without the last item.

```ts
const popped = tap([1, 2, 3], (n) => n.pop());
```

## Solution

```js
function tap<T>(arg: T, fn: (arg: T) => void): T {
  fn(arg);
  return arg;
}
```

## Use With Arrow Functions

You need a weird comma.

```ts
const createNode = <T>(value: T): Link<T> => ({ value });

const addNext = <T>(node: Link<T>, value: T): Link<T> => {
  node.next = createNode(value);
  return node;
};

const createNodeAndNext = <T>(first: T, second: T) => {
  const firstNode = createNode(first);
  firstNode.next = createNode(second);
  return firstNode;
};

const createNodeAndNextTapped = <T>(first: T, second: T): Link<T> =>
  tap(createNode(first), (node) => addNext(node, second));

const node = createNode(4);
const nextNode = addNext(node, 5);
const twoNodes = createNodeAndNextTapped(1, 2);
const twoMoreNodes = createNodeAndNext(4, 5);
```
