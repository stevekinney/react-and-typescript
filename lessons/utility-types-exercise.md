---
path: "/utility-types-exercise"
title: "Utility Types (Exercise)"
order: "6D"
section: "Just Enough TypeScript"
description: "An exercise for getting comfortable with utility types in TypeScript."
---

<iframe src="https://codesandbox.io/embed/fun-with-utility-types-2lmj2?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApplication.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="fun-with-utility-types"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

We'll start with the following code in [this sandbox](https://codesandbox.io/s/fun-with-utility-types-2lmj2?file=/src/Application.tsx).

## Your Mission

We're going to try two things here.

- We want to make it so that the CurrentUser component accepts all
  of the properties from the `UserModel` except for `accountId`.
- We want the Friend component to read the properties from the
  CurrentUser component and use the same props. (I know it's contrived,
  but see if you can do it without reusing the same type.)
