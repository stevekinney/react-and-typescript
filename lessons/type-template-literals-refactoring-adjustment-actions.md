---
path: "/type-template-literals-refactoring-adjustment-actions"
title: "Type Template Literals: Refactoring Our Color Adjustment Actions"
order: "6G"
section: "Just Enough TypeScript"
description: "Using type template literals to dynamically create types."
---

```tsx
import { RGBColorType } from "./types";

type Colors = "RED" | "GREEN" | "BLUE";
type ActionTypes = `ADJUST_${Colors}`;

export type AdjustmentAction = {
  type: `ADJUST_${Colors}`;
  payload: number;
};

export const reducer = (
  state: RGBColorType,
  action: AdjustmentAction
): RGBColorType => {
  if (action.type === "ADJUST_RED") {
    return { ...state, red: action.payload };
  }

  if (action.type === "ADJUST_GREEN") {
    return { ...state, green: action.payload };
  }

  if (action.type === "ADJUST_BLUE") {
    return { ...state, blue: action.payload };
  }

  return state;
};
```

We can even take it one step further and use values that we seek to use in our code to inform our types.

```tsx
import { RGBColorType } from "./types";

const colors = ["red", "green", "blue"] as const;

type Colors = Uppercase<typeof colors[number]>;
type ActionTypes = `ADJUST_${Colors}`;

export type AdjustmentAction = {
  type: `ADJUST_${Colors}`;
  payload: number;
};

export const reducer = (
  state: RGBColorType,
  action: AdjustmentAction
): RGBColorType => {
  for (const color of colors) {
    if (action.type === `ADJUST_${color.toUpperCase()}`) {
      return { ...state, [color]: action.payload };
    }
  }

  return state;
};
```

You can find the result [here](https://codesandbox.io/s/red-green-blue-with-template-literals-4yf86?file=/src/reducer.ts).
