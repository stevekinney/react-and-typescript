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

<iframe src="https://codesandbox.io/embed/buttons-as-n4wnm?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApplication.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="buttons-as"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
