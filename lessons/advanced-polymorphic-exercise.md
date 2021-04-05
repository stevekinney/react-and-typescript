---
path: "/polymorphic-components-exercise"
title: "Polymorphic Components (Exercise)"
order: "9C"
section: "Advanced Component Patterns"
description: "Typing Polymorphic components with TypeScript."
---

So, let's start with [a simplifed version of what we had before][base].

<iframe src="https://codesandbox.io/embed/as-prop-base-qmqnc?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApplication.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="as-prop-base"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

[base]: https://codesandbox.io/s/as-prop-base-qmqnc

```tsx
import * as React from "react";

type TextProps = {
  children: string;
} & React.ComponentPropsWithoutRef<"div">;

const exampleText =
  "When I was born, the name for what I was did not exist. They called me nymph, assuming I would be like my mother and aunts and thousand cousins. Least of the lesser goddesses, our powers were so modest they could scarcely ensure our eternities. We spoke to fish and nurtured flowers, coaxed drops from the clouds or salt from the waves. That word, nymph, paced out the length and breadth of our futures.";

function Text({ children, ...rest }: TextProps) {
  return <div {...rest}>{children}</div>;
}

const Application = () => {
  return (
    <main>
      <Text id="main">{exampleText}</Text>
    </main>
  );
};

export default Application;
```
