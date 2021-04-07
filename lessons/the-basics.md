---
path: "/the-most-basic-example"
title: "The Very Basics"
order: "2A"
section: "The Fundamentals"
description: "Let’s look at a very simple component and see what TypeScript gives us out of the box."
---

Okay, let's start small with [this sandbox](https://codesandbox.io/s/greeting-bts5l?file=/src/App.tsx).

<iframe src="https://codesandbox.io/embed/name-tag-bts5l?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApplication.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="name-tag"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Above, we can see a fairly simple `NameTag` component. As it stands right now, it doesn't take any props or hold onto any state. For our purposes, it might as well just be some static HTML. It really doesn't even need to be React.

Is this JavaScript or TypeScript? The answer is "yes." Out of the box, TypeScript is going to try to do everything in its power to infer all of the types for you.

This is a simple, but core concept that we're going to playing with during our time together. TypeScript is trying its hardest to stay out of your way. Occasionally, we need to step in a give it some hints about what we're intending to do. If you find yourself fighting with TypeScript—then it's worth taking a step back and considering your approach.

Looking at the component in this example. TypeScript has figured out that `NameTag`, in this case, is a function that takes no arguments and returns a `JSX.Element` , which is a type it knows about from React.

```tsx
const NameTag: () => JSX.Element;
```
