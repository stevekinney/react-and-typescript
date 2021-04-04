---
path: "/typing-children"
title: "Typing Children"
order: "2D"
section: "TypeScript and React Fundamentals"
description: "In which we determine what type to use for child components in React."
---

I don't want to ruin the surprise for you, but if this workshop was solely about just strings and numbers, we'd be spending very little time together. Things can get a little bit tricky when we want to use TypeScript to specify non-primitive types—namely other React components.

It's due time that we got our first taste of that right now.

<iframe src="https://codesandbox.io/embed/typescript-children-3vu37?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApplication.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="typescript-children"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Let's start with a super contrived example. As it stands right now, `children` has the type of `any`, which is basically an opt-out of every that TypeScript has to offer you. This isn't great.

What should you noticed about this example?

- `Box` renders `children`.
- It can render more than one child.
- That child can be another React component.
- That child can be a standard HTML element.

But, what can we use to specify that a given prop should be another React component?

Off the top of my head, here are some things that you could try.

- `JSX.Element`
- `JSX.Element[]`
- `JSX.Element | JSX.Element[]`
- `React.ReactNode`
- `React.ReactChildren`
- `React.ReactChild[]`

Why don't you take it for a spin and see what works best for you? You can use [this sandbox](https://codesandbox.io/s/typescript-children-3vu37?file=/src/Application.tsx).

```tsx
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
