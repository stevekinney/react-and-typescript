---
path: "/reducers"
title: "Typing Reducers"
order: "3E"
section: "Typing with Hooks and State Management"
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
const reducer = (state: pizzaState, action: any) => {
  // …
};
```

(If you remember, try to fat-finger it to use `pizzaData` first.)

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
const reducer = (state: pizzaState, action: PizzaAction) => {
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
  state: pizzaState;
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

### Exercise: Reducers for Counter

For the Incident Counter sandbox from earlier and take it for a spin.

## Context API

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

### Typesafe Actions

One pattern that we'll see a lot is the use of action creators:

```ts
export const updateNumberOfPizzas = (value: number): PizzaAction => {
  return {
    type: "UPDATE_NUMBER_OF_PEOPLE",
    payload: value,
  };
};

export const updateSlicesPerPerson = (value: number): PizzaAction => {
  return {
    type: "UPDATE_SLICES_PER_PERSON",
    payload: value,
  };
};

export const updateSlicesPerPie = (value: number): PizzaAction => {
  return {
    type: "UPDATE_SLICES_PER_PIE",
    payload: value,
  };
};
```

We might then change these as follows:

```tsx
<CalculatorInput
  label="Number of People"
  htmlId="number-of-people"
  value={state.numberOfPeople}
  onChange={(event) =>
    dispatch(updateNumberOfPeople(+event.target.value))
  }
/>
<CalculatorInput
  label="Slices Per Person"
  htmlId="slices-per-person"
  value={state.slicesPerPerson}
  onChange={(event) =>
    dispatch(updateSlicesPerPerson(+event.target.value))
  }
/>
<CalculatorInput
  label="Slices Per Pie"
  htmlId="slices-per-pie"
  value={state.slicesPerPie}
  onChange={(event) => dispatch(updateSlicesPerPie(+event.target.value))}
/>
```

## Type-Safe Actions

With this awesome library called "type-safe" actions, we can do the following:

```ts
export const updateNumberOfPeople = (value: number): PizzaAction =>
  action("UPDATE_NUMBER_OF_PEOPLE", value);

export const updateSlicesPerPerson = (value: number): PizzaAction =>
  action("UPDATE_SLICES_PER_PERSON", value);

export const updateSlicesPerPie = (value: number): PizzaAction =>
  action("UPDATE_SLICES_PER_PIE", value);
```

It's just a helper, but it gets a bit cooler than this.

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

Those strings worry me.

We _could_ use constants. That's a common pattern in JavaScript.

Last time around, we used conditionals, which helped. But TypeSafe actions gives us another option.

I'd rather see us do something like this:

```ts
export const reducer = (state: PizzaState, action: PizzaAction): PizzaState => {
  if (action.type === "UPDATE_NUMBER_OF_PEOPLE") {
    return addPizzasNeededToPizzaData({
      ...state,
      numberOfPeople: action.payload,
    });
  }

  if (action.type === "UPDATE_SLICES_PER_PERSON") {
    return addPizzasNeededToPizzaData({
      ...state,
      slicesPerPerson: action.payload,
    });
  }

  if (action.type === "UPDATE_SLICES_PER_PIE") {
    return addPizzasNeededToPizzaData({
      ...state,
      slicesPerPie: action.payload,
    });
  }

  return state;
};
```

Pro-tip: Look at [typesafe-actions](https://github.com/piotrwitek/typesafe-actions#2-fsa-compliant-actions)
