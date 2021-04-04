---
path: "/typing-styling"
title: "Typing Styling"
order: "2F"
section: "TypeScript and React Fundamentals"
description: "A quick look at how to type inline CSS styling with TypeScript"
---

What if we wanted to make the box a little bit more customizable?

We'll explore the following:

- How to type CSS properties.
- How to use an optional type.

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

Here is [sandbox with the completed version of what we've done so far][complete].

[complete]: https://codesandbox.io/s/typescript-children-completed-with-css-6bx23

<iframe src="https://codesandbox.io/embed/typescript-children-completed-with-css-6bx23?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="typescript-children-completed-with-css"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
