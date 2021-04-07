---
path: "/create-context"
title: "Solving for Context API Edge Cases"
order: "9G"
section: "Advanced Component Patterns"
description: "We can make an abstraction that solves for what to do if a context isn't set."
---

Now that we know a little bit more about generics, we can make an abstraction for solving for what to do if our context value isn't set yet.

Make a new file called `create-context.tsx`:

```tsx
import * as React from "react";

export function createContext<A extends {} | null>() {
  const context = React.createContext<A | undefined>(undefined);

  const useContext = () => {
    const c = React.useContext(context);
    if (c === undefined)
      throw new Error("useContext must be inside a Provider with a value");
    return c;
  };
  return [useContext, context.Provider] as const;
}
```

This will make a context and give us a hook that will always check to see if it's defined—thus making TypeScript happier.

Pull it into `context.tsx`.

```tsx
import { createContext } from "./create-context";
```

And now, swap it in.

```tsx
export const [useContext, Provider] = createContext<RGBContextType>();
```

We need to update our provider a bit since we have a different signature as we've hidden away our actual context object.

```tsx
export const RGBContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rgb, dispatch] = React.useReducer(reducer, {
    red: 0,
    green: 0,
    blue: 0,
  });

  return (
    <Provider
      value={{
        ...rgb,
        dispatch,
      }}
    >
      {children}
    </Provider>
  );
};
```

And now, we can use it in our component.

```tsx
const { red, green, blue, dispatch } = useContext();
```

We also need to swap it out in `ColorSwatch.tsx`:

```tsx
import { useContext } from "./context";

export const ColorSwatch = () => {
  const { red, green, blue } = useContext();

  return (
    <div
      className="color-swatch"
      style={{
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
      }}
    ></div>
  );
};
```

## Thoughts

This is more correct than using `as` to tell TypeScript that we know what we're doing.

That said, I'm not sure it's worth all of the extra overhead. You're going to have a specific `useContext` hook for _every_ context.

## Where Are We Now?

- `examples/42-context-refactor`
- `projects/color-swatch-base` on the `one-last-context-refactor` branch
- [CodeSandbox]
