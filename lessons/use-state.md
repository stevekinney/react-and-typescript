---
path: "/use-state"
title: "useState Hook"
order: "3A"
section: "Typing with Hooks and State Management"
description: "An introduction to typing useState in React."
---

When in doubt, TypeScript is going to try its hardest to infer types on your behalf. Let's look at the following silly update to our component.

```tsx
import { useState } from "react";

type GreetingProps = { name: string };

const Greeting = ({ name }: GreetingProps) => {
  const [isHidden, toggleHidden] = useState(false);

  return (
    <section>
      {!isHidden && <h1>Hello {name}!</h1>}
      <button onClick={() => toggleHidden(!isHidden)}>Hide</button>
    </section>
  );
};

export default Greeting;
```

The notable and new piece is our use of React's `useState` hook.

```tsx
const [isHidden, toggleHidden] = React.useState(false);
```

- `isHidden` is defined as `false` from the get-go, which means TypeScript can assume it's supposed to be a boolean.
- `toggleHidden` infers that, since `isHidden` is supposed to be a boolean, that it should take a boolean as an argument.

The inferred types are as follows:

```tsx
const isHidden: boolean;
const toggleHidden: React.Dispatch<React.SetStateAction<boolean>>;
```

That second type for `toggleHidden` is a bit stranger than anything we've seen before, but we'll talk more about that later.

This will work any time that we have a default value for a piece of state.

```tsx
const [name, setName] = useState("Steve");
```

```tsx
const name: string;
const setName: React.Dispatch<React.SetStateAction<string>>;
```
