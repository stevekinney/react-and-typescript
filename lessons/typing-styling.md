---
path: "/typing-styling"
title: "Typing Styling"
order: "2E"
section: "TypeScript and React Fundamentals"
description: "A quick look at how to type inline CSS styling with TypeScript"
---

What if we wanted to make the box a little bit more customizable?

```tsx
import "./styles.css";

import * as React from "react";

type BoxProps = { children: React.ReactNode; style?: React.CSSProperties };

const Box = ({ children, style = {} }: BoxProps) => {
  return (
    <section style={{ padding: "1em", border: "5px solid purple", ...style }}>
      {children}
    </section>
  );
};

export default function Application() {
  return (
    <Box>
      Just a string.
      <p>Some HTML that is not nested.</p>
      <Box style={{ borderColor: "red" }}>
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
