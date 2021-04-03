---
path: "/context"
title: "Typing the Context API"
order: "3F"
section: "Typing with Hooks and State Management"
description: "Using TypeScript with the Context API."
---

- [Code Sandbox](https://codesandbox.io/s/red-green-blue-k6frm)

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

### Exercise: Using the Context API

Use one of the following sandboxes:

- [Pizza Calculator](https://codesandbox.io/s/pizza-calculator-spyrs)
- [Pizza Calculator with Redux (Completed)](https://codesandbox.io/s/pizza-calculator-redux-completed-n8kip?file=/src/Application.tsx)

## Bonus: Passing in Components as Properties

Those two kinds of inputs make us really feel like we're repeating ourselves, right?

```tsx
const ColorAdjustment = ({
  Adjustment,
}: {
  Adjustment: React.ComponentType<IColorInputProps>;
}) => {
  // …
};
```

Now, we can do this in the `Application` component:

```tsx
<RGBProvider>
  <main>
    <ColorSwatch rgb={rgb} />
    <ColorAdjustment Adjustment={ColorInput} />
    <ColorAdjustment Adjustment={ColorSlider} />
  </main>
</RGBProvider>
```

## Refactoring the Context and Reducer

(Take a tour of the refactored application.)

Let's look at a slightly cleaned up version of where we left off last time.

```ts
import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { PizzaAction } from "./actions";
import { reducer } from "./reducer";
import { initialState, PizzaState } from "./state";

type PizzaContext = {
  state: PizzaState;
  dispatch: Dispatch<PizzaAction>;
};

export const CalculatorContext = createContext<PizzaContext>(null);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorProvider;
```

TypeScript is kind of angry at us with passing in `null` when we initiate our pizza context.

We can solve for this a few different ways.

```ts
export const CalculatorContext = createContext<PizzaContext | null>(null);
```

That satifies the problem here, but it pushes our problem elsewhere. Now, every component that consumes this container is going to have to deal with the fact that the value of the `PizzaContext` _could_ be `null`.

So, our next solution is to do something like this:

```tsx
export const CalculatorContext = createContext<PizzaContext>(
  {} as PizzaContext
);
```

This solves the problem _mostly_. We're basically just telling TypeScript to be quiet and we promise this is the right kind of object. You can probably get away with this.

But, we can do a little bit better if we wanted to.
