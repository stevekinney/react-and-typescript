---
path: "/the-most-basic-example"
title: "The Very Basics"
order: "2A"
section: "TypeScript and React Fundamentals"
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

TypeScript has figured out that `NameTag`, in this case, is a function that takes no arguments and returns a `JSX.Element` , which is a type it knows about from React.

```tsx
const NameTag: () => JSX.Element;
```
