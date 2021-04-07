---
path: "/context-with-reducer"
title: "The Context API with State Management"
order: "5C"
section: "Color and Context"
description: "Hooking up our Context API with our reducer."
---

This is our [starting point][base].

Next, let's move our state management into a Context and see if we have any new issues to deal with.

Let's start by pulling in everything we need.

```tsx
import { RGBColorType } from "./types";

const initialState: RGBColorType = {
  red: 0,
  green: 0,
  blue: 0,
};
```

Our context typing basically needs to be something like this:

```tsx
interface RGBContextType extends RGBColorType {
  dispatch: React.Dispatch<AdjustmentAction>;
}
```

But, we have a problem when we pass in the default value. We don't have a `dispatch` function yet that we can pass in as a default value. Contexts can only be created outside of components and `useReducer`—which we need to create a `dispatch` function—can only be used inside of a component.

So, this won't make TypeScript happy:

```tsx
export const RGBContext = React.createContext<RGBContextType>(null);
```

This is a bit of a conundrum, eh? Let's cheat for now.

```tsx
export const RGBContext = React.createContext<any>(null);
```

Not great, but we'll fix this later once we get the rest of it wired up.

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
    <RGBContext.Provider
      value={{
        ...rgb,
        dispatch,
      }}
    >
      {children}
    </RGBContext.Provider>
  );
};
```

Cool. Now, let's wrap that around the `Application` component so that we can use it.

In `ColorSliders.tsx`:

```tsx
export const ColorSliders = () => {
  const { red, green, blue, dispatch } = useContext(RGBContext);

  // …
};
```

We'll need to do something similar in the `ColorSwatch` since it depends on that state as well.

```tsx
export const ColorSwatch = () => {
  const { red, green, blue } = useContext(RGBContext);

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

Okay, but now we have to deal with our type issue. `any` is insidious. There is literally no typesafety with our context values. It's like we're writing JavaScript or something.

## Hypothesis One: Use a Fallback Value

We could try something like this in `context.tsx`:

```tsx
export const RGBContext = React.createContext<RGBContextType | null>(null);
```

This will make everyone happy in the `context.tsx` file. But, what about if we go into `ColorSwatch.tsx`.

```tsx
export const ColorSwatch = () => {
  // const { red, green, blue } = useContext(RGBContext);
  const value = useContext(RGBContext);

  return (
    <div
      className="color-swatch"
      style={{
        backgroundColor: `rgb(${value?.red}, ${value?.green}, ${value?.blue})`,
      }}
    ></div>
  );
};
```

Since it _can_ be `null`, TypeScript is trying to make us write better code.

## Hypothesis Two: Insist You Know What You're Doing

This is all kind of silly. We know what we're doing.

```tsx
export const RGBContext = React.createContext<RGBContextType>(
  initialState as RGBContextType
);
```

This basically saying. Listen. We know what we're doing here. We're going to have the `dispatch` function by the time we use these components. Just pretend that this object fits the type—even if it doesn't.

This will get us more protection than any. That's for sure. But, it's not perfect.

## To Be Continued…

There is another way to do this, that has some advantages, but we need to learn a little bit more first about TypeScript before we can dive in.

For now, the [final state for this section is here][complete].

[base]: https://codesandbox.io/s/red-green-blue-with-theme-context-bzykq?file=/src/Application.tsx
[complete]: https://codesandbox.io/s/red-green-blue-with-context-hoiiz?file=/src/Application.tsx

## Where Are We Now?

- `projects/color-swatch-base` on the `color-swatch-with-state-context` branch
- `examples/25-color-swatch-with-state-context`
- [CodeSandbox]
