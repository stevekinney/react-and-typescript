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
