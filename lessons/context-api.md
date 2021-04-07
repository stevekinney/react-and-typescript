---
path: "/context-api"
title: "The Context API"
order: "5B"
section: "Color and Context"
description: "Get your hands dirty with the Context API and TypeScript."
---

We'll start from [here as a base][base].

[base]: https://codesandbox.io/s/red-green-blue-with-dispatch-8ketd?file=/src/Application.tsx:499-544

Instead of passing dispatch down to each of the components that need it, let's move our state management to the Context API.

We're going to do this twice, let's start with something simple, like a `ThemeContext` that will allow us to support light mode and dark mode.

I'll make a new file called `theme-context.tsx`.

We'll make a ThemeContext:

```tsx
import * as React from "react";

const ThemeContext = React.createContext({
  light: {
    backgroundColor: "white",
    color: "black",
  },
  dark: {
    backgroundColor: "#555",
    color: "white",
  },
});
```

TypeScript has already figured out the shape of this type.

```tsx
const ThemeContext: React.Context<{
  light: {
    backgroundColor: string;
    color: string;
  };
  dark: {
    backgroundColor: string;
    color: string;
  };
}>;
```

We can move this out to its own object as well.

```ts
const themes = {
  light: {
    backgroundColor: "white",
    color: "black",
  },
  dark: {
    backgroundColor: "#555",
    color: "white",
  },
};

export const ThemeContext = React.createContext(themes);
```

Now, we can do the rest of the ceremony ourselves. In `theme-context.tsx`:

```tsx
export const ThemeContext = React.createContext(themes);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
  );
};
```

In `index.tsx`

```tsx
import { ThemeProvider } from "./theme-context";

const rootElement = document.getElementById("root");
render(
  <ThemeProvider>
    <Application />
  </ThemeProvider>,
  rootElement
);
```

Now, in `Application.tsx`:

```tsx
const themes = React.useContext(ThemeContext);
```

We'll use the dark theme on the application for now.

```tsx
<main
  style={{
    borderColor: toRGB(rgb),
    ...themes.dark
  }}
>
```

So, that was simple, React pretty much inferred everything we needed it to.

The bad news, of course is that this is the happy path. We were able to tell React what was going down with the shape of this object pretty early.

## Where Are We Now?

- `projects/color-swatch-base` on the `color-swatch-with-theme-context`
- `examples/24-color-swatch-with-theme-context`
- [CodeSandbox](https://codesandbox.io/s/red-green-blue-with-theme-context-bzykq?file=/src/Application.tsx:540-563)
