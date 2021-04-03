---
path: "/the-basics"
title: "The Very Basics"
order: "2A"
section: "TypeScript and React Fundamentals"
description: "Let’s look at a very simple component and see what TypeScript gives us out of the box."
---

Okay, let's start small with [this sandbox](https://codesandbox.io/s/greeting-bts5l?file=/src/App.tsx).

<iframe src="https://codesandbox.io/embed/greeting-bts5l?fontsize=14&hidenavigation=1&theme=dark&view=editor"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="greeting"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Above, we can see a fairly simple component.

```tsx
const Greeting = () => <h1>Hello world!</h1>;
```

Is this JavaScript or TypeScript? The answer is "yes." Out of the box, TypeScript is going to try to do everything in its power to infer all of the types for you.

TypeScript has figured out that `Greeting` , in this case, is a function that takes no arguments and returns a `JSX.Element` , which is a type it knows about from React.

```tsx
const Greeting: () => JSX.Element;
```
