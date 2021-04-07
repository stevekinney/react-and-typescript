---
path: "/utility-types-character-cards"
title: "Refactoring the Character Cards with Utility Types"
order: "6C"
section: "Just Enough TypeScript"
description: "A quick rundown of some of the built-in type helpers and whatnot."
---

We'll start from this [base][].

We can do a quick refactor make our `TableRow` components better. This is what they look like right now.

```tsx
type TableProps = { children: React.ReactNode };
type TableRowProps = {
  heading: string;
  value: string | number;
};
```

It would be cool if I could enforce that the heading be property that is actually on a character.

Yes. I could hardcode in the values, but I don't love that.

```tsx
type TableRowProps = {
  heading:
    | "Name"
    | "Alignment"
    | "Intelligence"
    | "Strength"
    | "Speed"
    | "Durability"
    | "Power"
    | "Combat"
    | "Total";
  value: string | number;
};
```

This is problematic because the properties on the `CharacterType` could change and then we'd have the potential for an error in our code. It would be better if we could determine the keys eligble to be a row heading dynamically based off of `CharacterType` right?

```tsx
type TableRowProps = {
  heading: keyof CharacterType;
  value: string | number;
};
```

This gets us most of the way there, with some small issue. It's expecting lowercase headings.

We could handle this a few different ways:

- Capitalize the heading with JavaScript.
- Capitalize the heading with CSS.
- Fix the typing.

Since this is a course of TypeScript, we're going to go with the third option.

```tsx
type TableRowProps = {
  heading: Capitalize<keyof CharacterType>;
  value: string | number;
};
```

Now everything works. (ESLint in CodeSandbox might be a little upset with us, but that's not our concern right now.)

We can even dynamically type the `value` to be any reasonable type found in the _values_ of `CharacterType`.

```ts
type TableRowProps = {
  heading: Capitalize<keyof CharacterType>;
  value: CharacterType[keyof CharacterType];
};
```

The completed example can be found [here][complete].

[base]: https://codesandbox.io/s/character-sheet-utility-types-base-48cqu
[complete]: https://codesandbox.io/s/character-sheet-utility-types-complete-jb8d4?file=/src/Table.tsx

## Where Are We Now?

- `projects/character-card` on the `character-card-with-utility-types` branch
- `examples/28-character-card-with-utility-types`
- [CodeSandbox][complete]
