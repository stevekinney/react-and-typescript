---
path: "/polymorphic-components"
title: "Polymorphic Components with TypeScript"
order: "9B"
section: "Advanced Component Patterns"
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

## Polymorphic Components

So, let's start with a simplifed version of what we had before.

```tsx
import * as React from "react";

type TextProps = {
  children: string;
} & React.ComponentPropsWithoutRef<"div">;

const exampleText =
  "When I was born, the name for what I was did not exist. They called me nymph, assuming I would be like my mother and aunts and thousand cousins. Least of the lesser goddesses, our powers were so modest they could scarcely ensure our eternities. We spoke to fish and nurtured flowers, coaxed drops from the clouds or salt from the waves. That word, nymph, paced out the length and breadth of our futures.";

function Text({ children, ...rest }: TextProps) {
  return <div {...rest}>{children}</div>;
}

const Application = () => {
  return (
    <main>
      <Text id="main">{exampleText}</Text>
    </main>
  );
};

export default Application;
```

Right now, `div` is hard coded and so we can assume it takes the same props as `div` and then pass them through.

But, what about if we wanted to be able to swap out the underlying element?

We need to break this problem apart into two pieces.

- The properties of `Text` component itself.
- The passthrough properties.

The `Text` component has the following props:

```tsx
type TextOwnProps<E extends React.ElementType = React.ElementType> = {
  children: string;
  as?: E;
};
```

And we want out custom component to proxy all of its props to the HTML Element minus our special sauce.

```tsx
type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps>;
```

We're using `Omit` as a helper in this case.

Finally, we'll refactor our `Text` component as follows:

```tsx
function Text<E extends React.ElementType = typeof defaultElement>({
  children,
  as,
  ...rest
}: TextProps<E>) {
  const TagName = as || "div";
  return <TagName {...rest}>{children}</TagName>;
}
```

### Completed Example

```tsx
import * as React from "react";

type TextOwnProps<E extends React.ElementType = React.ElementType> = {
  children: string;
  as?: E;
};

type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps>;

const exampleText =
  "When I was born, the name for what I was did not exist. They called me nymph, assuming I would be like my mother and aunts and thousand cousins. Least of the lesser goddesses, our powers were so modest they could scarcely ensure our eternities. We spoke to fish and nurtured flowers, coaxed drops from the clouds or salt from the waves. That word, nymph, paced out the length and breadth of our futures.";

const defaultElement = "div";

function Text<E extends React.ElementType = typeof defaultElement>({
  children,
  as,
  ...rest
}: TextProps<E>) {
  const TagName = as || "div";
  return <TagName {...rest}>{children}</TagName>;
}

const Application = () => {
  return (
    <main>
      <Text id="main" as="label" htmlFor="wow">
        {exampleText}
      </Text>
    </main>
  );
};

export default Application;
```
