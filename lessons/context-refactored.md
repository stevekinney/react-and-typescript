---
path: "/context-solution"
title: "OLD Context API Solution"
order: "99A"
section: "Deprecated"
description: "Refactoring the Context API"
---

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

Our next solution is to do something like this:

```tsx
export const CalculatorContext = createContext<PizzaContext>(
  {} as PizzaContext
);
```

This solves the problem _mostly_. We're basically just telling TypeScript to be quiet and we promise this is the right kind of object. You can probably get away with this.

But, we can do a little bit better if we wanted to.
