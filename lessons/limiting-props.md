---
path: "/limiting-props"
title: "Limiting Props a Component Can Take Based on Other Props"
order: "9A"
section: "Component Patterns: Advanced"
description: "An investigation into how we can limit which combinations of properties can be used with a component."
---

Let's say we have some buttons and we want to give them an API that looks like the following:

```tsx
<Button primary>Primary</Button>
<Button secondary>Secondary</Button>
<Button destructive>Destructive</Button>
```

But, we want to disallow the ability for more than one of those properites to be passed.

We could create the following type:

```tsx
type ButtonProps = {
  children: string;
};

type PrimaryButtonProps = ButtonProps & { primary: boolean };
type SecondaryButtonProps = ButtonProps & { secondary: boolean };
type DestructiveButtonProps = ButtonProps & { destructive: boolean };
```

We can do something like this:

```tsx
type ButtonProps = {
  children: string;
};

type PrimaryButtonProps = {
  primary: boolean;
  secondary?: never;
  destructive?: never;
};

type SecondaryButtonProps = {
  primary?: never;
  secondary: boolean;
  destructive?: never;
};

type DestructiveButtonProps = {
  primary?: never;
  secondary?: never;
  destructive: boolean;
};
```
