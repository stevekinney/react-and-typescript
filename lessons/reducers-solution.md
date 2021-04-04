---
path: "/reducers-solution"
title: "Reducers (Solution)"
order: "4C"
section: "Working with Reducers"
description: "Add type-safety to a reducer in a React application with TypeScript."
---

We can start by defining the shape of our state.

```tsx
type CounterAction = {
  type: "INCREMENT" | "DECREMENT" | "SET";
  payload?: number;
};

type CounterState = {
  value: number;
};
```

Let's get a simple version of this reducer in place.

```tsx
const reducer = (state: CounterState, action: CounterAction) => {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    case "SET":
      return { value: state.value + (action.payload || 0) };
  }
};
```

We can create our hooks and our action creators.

```tsx
const [state, dispatch] = useReducer(reducer, { value: 0 });

const increment = () => dispatch({ type: "INCREMENT" });
const decrement = () => dispatch({ type: "DECREMENT" });
const reset = () => dispatch({ type: "SET", payload: 0 });
const set = (n: number) => dispatch({ type: "SET", payload: n });
```

Let's get the basic buttons working:

```tsx
<p className="count">{state.value}</p>
<section className="controls">
  <button onClick={increment}>Increment</button>
  <button onClick={reset}>Reset</button>
  <button onClick={decrement}>Decrement</button>
</section>
```

### An Improvement

We can make our actions even better. By getting a little more nuanced with our types.

```ts
type BasicCounterAction = {
  type: "INCREMENT" | "DECREMENT";
};

type SetCounterAction = {
  type: "SET";
  payload: number;
};

type CounterAction = BasicCounterAction | SetCounterAction;
```

Now, TypeScript will protect us from firing an increment or decrement action with a `payload` and also omitting one from the actions for setting the value.

Even better, we've given TypeScript more information, which means we can remove that check to see if `action.payload` is undefined in the reducer.

```tsx
const reducer = (state: CounterState, action: BetterAction) => {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    case "SET":
      // No more `action.payload || 0`
      return { value: action.payload };
  }
};
```

The completed example is [here][completed].

[base]: https://codesandbox.io/s/incident-counter-simple-vjlph?file=/src/Application.tsx
[completed]: https://codesandbox.io/s/incident-counter-reducer-complete-yryxm?file=/src/application.tsx
