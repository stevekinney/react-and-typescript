---
path: "/utility-types"
title: "A Tour of Utility Types in React"
order: "6B"
section: "Just Enough TypeScript"
description: "A quick rundown of some of the built-in type helpers and whatnot."
---

## `keyof`

```ts
type ObjectLiteralType = {
  first: 1;
  second: 2;
};

// %inferred-type: "first" | "second"
type Result = keyof ObjectLiteralType; // (A)
```

## Getting The Type Of A Single Key In An Object

Use the index operator.

```ts
type Obj = {
  0: "a";
  1: "b";
  prop0: "c";
  prop1: "d";
};

// %inferred-type: "c"
type Result0 = Obj["prop0"];

// %inferred-type: "a" | "b"
type Result1 = Obj[0 | 1];

// %inferred-type: "c" | "d"
type Result2 = Obj["prop0" | "prop1"];
```

## What About Getting The Values?

It's not as clean, but it'll work.

```ts
type Obj = {
  a: "A";
  b: "B";
  c: number;
};

// %inferred-type: number | "A" | "B"
type Values = Obj[keyof Obj];
```

## Unions

```ts
type A = "a" | "b" | "c";
type B = "b" | "c" | "d";

// %inferred-type: "a" | "b" | "c" | "d"
type Union = A | B;
```

### Unions With Objects

```ts
type ObjectTypeA = {
  propA: bigint;
  sharedProp: string;
};

type ObjectTypeB = {
  propB: boolean;
  sharedProp: string;
};

type Union = ObjectTypeA | ObjectTypeB;
```

You have to check for anything that is not shared between both.

## Intersections

This is useful when trying to combine the props that you're going to use for a React component, just sayin'.

```ts
type A = "a" | "b" | "c";
type B = "b" | "c" | "d";

// %inferred-type: "b" | "c"
type Intersection = A & B;
```

## Conditionals

Ternaries only.

```ts
type Wrap<T> = T extends { length: number } ? [T] : T;
```

### Conditionals: Example

There isn't much of a good reason for this one to exist, but it helps explain the syntax a bit, so here we are.

```ts
type IsAssignableTo<A, B> = A extends B ? true : false;

// Type `123` is assignable to type `number`
// %inferred-type: true
type Result1 = IsAssignableTo<123, number>;

// Type `number` is not assignable to type `123`
// %inferred-type: false
type Result2 = IsAssignableTo<number, 123>;
```

## Exclude

Takes stuff out of a union. It's built into TypeScript, but here is also what it would look like if you wanted to implement it yourself.

```ts
type Exclude<T, U> = T extends U ? never : T;

// %inferred-type: 1 | 3
type Result0 = Exclude<1 | 2 | 3, 2>;

// %inferred-type: "a" | "b"
type Result1 = Exclude<1 | "a" | 2 | "b", number>;

// %inferred-type: "a" | 2
type Result2 = Exclude<1 | "a" | 2 | "b", 1 | "b" | "c">;
```

## Extract

The opposite of `Exclude`.

```ts
type Extract<T, U> = T extends U ? T : never;

// %inferred-type: 1 | 2
type Result1 = Extract<1 | "a" | 2 | "b", number>;

// %inferred-type: 1 | "b"
type Result2 = Extract<1 | "a" | 2 | "b", 1 | "b" | "c">;
```

## Objects

```ts
type ObjectWithAKey = { a: string };
```

You can also define a type for keys as well.

```ts
type ObjectWithStringKeys = { [key: string]: number };
```

You can iterate over a union if you want.

```ts
// %inferred-type: { a: number; b: number; c: number; }
type Result = {
  [K in "a" | "b" | "c"]: number;
};
```

## `Pick`

## `Omit`

Literally the opposite of `Pick`

```ts
type ObjectLiteralType = {
  eeny: 1;
  meeny: 2;
  miny: 3;
  moe: 4;
};

// %inferred-type: { meeny: 2; moe: 4; }
type Result = Omit<ObjectLiteralType, "eeny" | "miny">;
```

### String Manipulation Utilities

```ts
type UppercaseWes = Uppercase<"wes">;
type LowercaseWes = Lowercase<"Wes">;
type CapitalizeWes = Capitalize<"wes">;
type UncapitalizeWes = Uncapitalize<"Wes">;
```

### `React.HTMLProps<HTMLXXXElement>`

Type representing Props of specified HTML Element - for extending HTML Elements

```ts
const Input: React.FC<Props & React.HTMLProps<HTMLInputElement>> = props => { ... }

<Input about={...} accept={...} alt={...} ... />
```

### `React.ComponentProps<typeof XXX>`

We'll use this one in the very next exercise—just sayin'.

```ts
type MyComponentProps = React.ComponentProps<typeof MyComponent>;
```

### Generic List Component

```ts
import * as React from "react";

export interface GenericListProps<T> {
  items: T[];
  itemRenderer: (item: T) => JSX.Element;
}

export class GenericList<T> extends React.Component<GenericListProps<T>, {}> {
  render() {
    const { items, itemRenderer } = this.props;

    return <div>{items.map(itemRenderer)}</div>;
  }
}
```
