---
path: "/polymorphic-components"
title: "Polymorphic Components with TypeScript"
order: "9B"
section: "Advanced Component Patterns"
description: "Typing Polymorphic components with TypeScript."
---

Let's start with a simplified version of what we had in the last example.

<iframe src="https://codesandbox.io/embed/buttons-as-base-w2pec?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApplication.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="buttons-as-base"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```tsx
import * as React from "react";

type ButtonProps = {
  children: string;
  primary?: boolean;
  secondary?: boolean;
  destructive?: boolean;
};

const createClassNames = (classes: { [key: string]: boolean }): string => {
  let classNames = "";
  for (const [key, value] of Object.entries(classes)) {
    if (value) classNames += key + " ";
  }
  return classNames.trim();
};

function Button({
  children,
  primary = false,
  secondary = false,
  destructive = false,
}: ButtonProps) {
  const classNames = createClassNames({ primary, secondary, destructive });
  return <button className={classNames}>{children}</button>;
}

const Application = () => {
  return (
    <main>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
      <Button destructive>Destructive</Button>
    </main>
  );
};

export default Application;
```

Augment the props with the fact that it _could_ take an element. We're also going to move `ButtonProps` into `ButtonOwnProps` so that we can combine it later.

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

What's happening here?

- We have a generic, `E`.
- We placed a constraint on `E` that it must be something that conforms to an HTML element.
- Take our `ButtonOwnProps` that we just made.
- Make a new type of whatever props that HTML element takes, but let us override it.

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

<iframe src="https://codesandbox.io/embed/buttons-as-n4wnm?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApplication.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="buttons-as"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Where Are We Now?

- `examples/37-buttons-polymorphic`
- [CodeSandbox](https://codesandbox.io/s/buttons-as-n4wnm?file=/src/Application.tsx)
