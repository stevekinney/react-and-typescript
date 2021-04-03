---
path: "/use-effect"
title: "useEffect"
order: "3C"
section: "Typing with Hooks and State Management"
description: "Catching omissions with the useEffect hook using TypeScript."
---

Let's start with [this problematic piece of code](https://codesandbox.io/s/broken-counter-tiu6u?file=/src/App.tsx).

```tsx
const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => setTimeout(() => setCount(count + 1), 1000), [count]);

  return <main>{count}</main>;
};
```

Straight out of the box, TypeScript isn't happy with us. In fact, React isn't happy with us either.

**Quick Exercise**: Can you figure out what's wrong and fix the immediate error?

Solution:

```tsx
import { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count]);

  return <main>{count}</main>;
};

export default Counter;
```

(Yea, it's just curly braces.)
