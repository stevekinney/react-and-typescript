---
path: "/typing-children"
title: "Typing Children"
order: "2D"
section: "TypeScript and React Fundamentals"
description: "In which we determine what type to use for child components in React."
---

Let's start with a super contrived example.

```tsx
import "./styles.css";

import * as React from "react";

const Box = ({ children }) => {
  return (
    <section style={{ padding: "1em", border: "5px solid purple" }}>
      {children}
    </section>
  );
};

export default function Application() {
  return (
    <Box>
      Just a string.
      <p>Some HTML that is not nested.</p>
      <Box>
        <h2>Another React component with one child.</h2>
      </Box>
      <Box>
        <h2>A nested React component with two children.</h2>
        <p>The second child.</p>
      </Box>
    </Box>
  );
}
```

### Exercise

We're going to use [this sandbox](https://codesandbox.io/s/typescript-children-3vu37?file=/src/App.tsx).

### Solution

What should you notied about this example?

- `Box` renders `children`.
- It can render more than one child.
- That child can be another React component.
- That child can be a standard HTML element.

So, how do we type this? Well. We have a few choices.

- `JSX.Element;`: 💩 This doesn't account for arrays at all.
- `JSX.Element | JSX.Element[];` 😕 This doesn't accept strings.
- `React.ReactChildren;`: 🤪 Not at even an appropriate type; it's a utility function.
- `React.ReactChild[];`: 😀 Accepts multiple children, but it doesn't accept a single child.
- `React.ReactNode;`: 🏆 Accepts everything.
