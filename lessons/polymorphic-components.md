---
path: "/polymorphic-components"
title: "Polymorphic Components with TypeScript"
order: "7B"
section: "Component Patterns: Advanced"
description: "Typing Polymorphic components with TypeScript."
---

Augment the props with the fact that it _could_ take an element.

```ts
type ButtonOwnProps<E extends React.ElementType = React.ElementType> = {
  children: string;
  primary?: boolean;
  secondary?: boolean;
  destructive?: boolean;
  as?: E;
};
```

Omit the parts that we're overriding.

```ts
type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps>;
```

```ts
const defaultElement = "button";

function Button<E extends React.ElementType = typeof defaultElement>({
  children,
  primary = false,
  secondary = false,
  destructive = false,
  as,
}: ButtonProps<E>) {
  const classNames = createClassNames({ primary, secondary, destructive });
  const TagName = as || defaultElement;
  return <TagName className={classNames}>{children}</TagName>;
}
```
