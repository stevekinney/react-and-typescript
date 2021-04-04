---
path: "/context-api"
title: "The Context API"
order: "5B"
section: "A Color Swatch and the Context API"
description: "Get your hands dirty with the Context API and TypeScript."
---

We'll start from [here as a base][base].

[base]: https://codesandbox.io/s/red-green-blue-with-dispatch-8ketd?file=/src/Application.tsx:499-544

Instead of passing dispatch down to each of the components that need it, let's move our state management to the Context API.

We're going to do this twice, let's start with something simple, like a `ThemeContext` that will allow us to support light mode and dark mode.

I'll make a new file called `theme-context.tsx`.

We'll make a ThemeContext:

```tsx
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

Now, in `index.tsx`:

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
