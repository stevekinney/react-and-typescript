---
path: "/context-api"
title: "Typing the Context API"
order: "5A"
section: "The Context API"
description: "Using TypeScript with the Context API."
---

[Start with this CodeSandbox](https://codesandbox.io/s/red-green-blue-k6frm).

My solution:

```tsx
interface IRGBContext {
  red: number;
  green: number;
  blue: number;
  setRed: React.Dispatch<React.SetStateAction<number>>;
  setGreen: React.Dispatch<React.SetStateAction<number>>;
  setBlue: React.Dispatch<React.SetStateAction<number>>;
}

const RGBContext = createContext<IRGBContext>(undefined!);

const RGBProvider = ({ children }: { children: ReactNode }) => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  return (
    <RGBContext.Provider
      value={{ red, green, blue, setRed, setGreen, setBlue }}
    >
      {children}
    </RGBContext.Provider>
  );
};
```

This one is going to be a bit of a cliff-hanger that we'll pick up for next time, but we have a bunch of not-great solutions.

- `const RGBContext = createContext<IRGBContext>(undefined!);`
- `const RGBContext = createContext<IRGBContext>({} as IRGBContext);`

In the next session (or maybe as an addendum, we'll look at how to write a better helper that will work with the Context API.)
