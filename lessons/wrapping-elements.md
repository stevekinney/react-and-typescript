---
path: "/wrapping-elements"
title: "Wrapping HTML Elements"
order: "7A"
section: "Component Patterns: Basic"
description: "How to wrap HTML elements and take advantage of all of their type properties."
---

```tsx
function App() {
  // Type '"foo"' is not assignable to type '"button" | "submit" | "reset" | undefined'.(2322)
  // return <Button type="foo"> sldkj </Button>

  // no error
  return <Button type="button"> text </Button>;
}

// implementation
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  specialProp?: string;
}

export function Button(props: ButtonProps) {
  const { specialProp, ...rest } = props;
  // do something with specialProp
  return <button {...rest} />;
}
```
