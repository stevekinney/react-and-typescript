---
path: "/reducers"
title: "Typing Reducers"
order: "4A"
section: "Working with Reducers"
description: "Using TypeScript beyond basic state management."
---

## Reducers

`useState` is great and wonderful for most simple use cases. But, once things get a little bit more complicated, you'll often find yourself reaching for `useReducer` . (I mean, you could also get really gnarly using `useState` , but you probably _should_ use `useReducer` .)

Let's just start by making sure that we're on the same page with how a reducer works.

We'll take a walk through [this sandbox](https://codesandbox.io/s/pizza-calculator-redux-2cd2b?file=/src/Application.tsx).

Let's start by removing those `any` declarations, shall we?

```tsx
const reducer = (state: any, action: any) => {
  // …
};
```

Well, we know the shape of the pizza state, right?

```tsx
const reducer = (state: PizzaState, action: any) => {
  // …
};
```

<!-- (If you remember, try to fat-finger it to use `PizzaData` first.) -->

We do need to figure out what we're going to do with the actions though, right? Luckily, they mostly conform to the same shape.

```tsx
type PizzaAction = {
  type:
    | "UPDATE_NUMBER_OF_PEOPLE"
    | "UPDATE_SLICES_PER_PERSON"
    | "UPDATE_SLICES_PER_PIE";
  payload: number;
};
```

Next, we'll update the reducer.

```tsx
const reducer = (state: PizzaState, action: PizzaAction) => {
  // …
};
```

There are a few cool things going on here:

- You've got that union type making sure that we only allow for a certain set of actions.
- This saves us from accidentally misspelling an action type and wondering why nothing works.

Now, we can update the `Calculator` component.

```tsx
const Calculator = ({
  dispatch,
  state,
}: {
  state: PizzaState;
  dispatch: Dispatch<PizzaAction>;
}) => {
  // …
};
```

Oh, look. We have some errors.

One of my least favorite things about the web is that inputs—even if they have `type` of "number"—will return strings and TypeScript is well aware of that.

We need to convert the output to numbers.

```tsx
dispatch({
  type: "UPDATE_SLICES_PER_PIE",
  payload: +event.target.value,
});
```

This will mostly get everything working.

## Reducer

Let's say that this is our reducer.

```ts
export const reducer = (state: PizzaState, action: PizzaAction): PizzaState => {
  switch (action.type) {
    case "UPDATE_NUMBER_OF_PEOPLE":
      return addPizzasNeededToPizzaData({
        ...state,
        numberOfPeople: action.payload,
      });

    case "UPDATE_SLICES_PER_PERSON":
      return addPizzasNeededToPizzaData({
        ...state,
        slicesPerPerson: action.payload,
      });

    case "UPDATE_SLICES_PER_PIE":
      return addPizzasNeededToPizzaData({
        ...state,
        slicesPerPie: action.payload,
      });
    default:
      return state;
  }
};
```

Those strings worry me. But, is that worry misguided?

We _could_ use constants. That's a common pattern in JavaScript.

Those `action.type` strings are being verified by TypeScript. If we mess one up, we're okay.

## Where Are We Now?

- `exercises/19-pizza-calculator-complete`
- `projects/pizza-calculator` on the `pizza-calculator-complete` branch
- [CodeSandbox](https://codesandbox.io/s/pizza-calculator-reducer-complete-y6vjc?file=/src/Application.tsx)
