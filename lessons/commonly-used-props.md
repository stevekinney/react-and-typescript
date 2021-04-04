---
path: "/commonly-used-props"
title: "Commonly-Used Props"
order: "2C"
section: "TypeScript and React Fundamentals"
description: "A tour of some of the types that you’ll commonly use in your React applications."
---

Let's take a moment to look at some of the types that go along with some of the more common props that we tend to see in React applications.

For starters, we have our basic primitives.

```ts
type CounterProps = {
  incident: string;
  count: number;
  enabled: boolean;
};
```

We can also have arrays or collections of primitives.

```ts
type GroceryListProps = {
  items: string[];
};
```

Sometimes, we don't want to allow _any_ string—only certain strings. We can use a [union type][union] to represent this.

[union]: https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html

```ts
type GroceryListProps = {
  items: string[];
  status: "loading" | "error" | "success";
};
```

It's not uncommon for us to find ourselves using objects in JavaScript (erm, TypeScript). So, what would that look like?

```ts
type ContrivedExampleComponmentProps = {
  anObject: object; // Useful as a placeholder.
  anotherObject: {}; // Can have any properties and values.
  item: {
    id: string;
    title: string;
  };
  items: {
    id: string;
    title: string;
  }[]; // An array of objects of a certain shape.
};
```

We could refactor this a bit. (I know, it's a contrived example, but go along with it.)

```ts
type Item = {
  id: string;
  title: string;
};

type ContrivedExampleComponmentProps = {
  item: Item;
  items: Item[];
};
```

So, if you look at our two object examples above, we're missing something.

- `{}` will allow for an object with any keys and any values.
- `{ id: string; title: string; }` will only allow for an object with _two_ keys: `id` and `title` as long as those values are both strings.

But, what if we wanted to find a happy medium? What if we wanted a situation where we said, "Listen, the key can be _any_ string and the value has to be of a certain type.

That might look something like this:

```ts
type ItemHash = {
  [key: string]: Item;
};
```

Or, if we wanted to say the keys are number and the values are strings, it would look like this:

```ts
type Dictionary = {
  [key: number]: string;
};
```

Another way of writing either of those would be as follows:

```ts
Record<string, Item>
Record<number, string>
```

I prefer the first syntax, personally. But, this is your life. You do what you want.

Okay, so we tend to also pass functions around, right? What does that look like?

```ts
type ContrivedExampleProps = {
  // Does not take any arguments. Does not return anything.
  onHover: () => void;
  // Takes a number. Returns nothing (e.g. undefined).
  onChange: (id: number) => void;
  // Takes an event that is based on clicking on a button.
  // Returns nothing.
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};
```

Finally, we should consider the fact that not every prop is required.

```ts
type ContrivedProps = {
  requiredProp: boolean;
  optionalProp?: string;
};
```

## Your Turn

<!-- TODO: Consider making an intermediate sandbox between the very beginning that you did and where they should start. -->

Start [here][base].

[base]: https://codesandbox.io/s/name-tag-bts5l?file=/src/Application.tsx

Okay, just to get the blood flowing and build up some muscle memory. Why don't you add a second _optional_ prop: the ability to replace "Hello" with the greeting of your choosing.

You can see the solution [here][solution].

[solution]: https://codesandbox.io/s/name-tag-solution-slwmk?file=/src/Application.tsx

Let's experiment a bit.

- What happens if we omit the property all together?
- What happens if we try to call a method on the string?
- What happens if we try to set a default value?
