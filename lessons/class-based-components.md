---
path: "/class-based-components"
title: "Typing Class-based Components"
order: "3D"
section: "Interacting with Components"
description: "A brief look at how we can add type safety to class-based React cmponents."
---

So far, we've mostly looked at examples of components using hooks for state management, but you and I both know that there are still plenty of React codebases out there chock full of class-based components. Can we use TypeScript with those components? Absolutely. Let's take a look at how we might go about that.

Here is an [example sandbox](https://codesandbox.io/s/incident-counter-class-based-4h4d5) to check out.

```tsx
class VeryImportantComponent extends React.Component<MyProps, MyState> {
  // …
}
```

The important thing to note here is that we're passing in two types into `React.Component`: the type of the props we expect the component to receive and another type that dictates the shape of its state.

Let's look at our silly `Counter` example from earlier.

We want it to take a string that dictates what kind of incident we're coutning up from as a prop and then keep track of the number of days as a number in state.

```tsx
type CounterProps = {
  incident: string;
};

type CounterState = {
  count: number;
};
```

Next we'll pass them in as type declarations.

```tsx
class Counter extends Component<CounterProps, CounterState> {
  state: CounterState = {
    count: 0,
  };
  // …
}
```

One thing that you'll notice is that we called out `CounterState` twice. Once in the type parameter and again in the instance property. Why did we do this?

## What About Events?

We can wire up the buttons fairly easily.

```tsx
increment = () => {
  this.setState(({ count }) => ({ count: count + 1 }));
};

decrement = () => {
  this.setState(({ count }) => ({ count: count - 1 }));
};

reset = () => {
  this.setState({ count: 0 });
};
```

This get a little tricker with that `form` element.

```tsx
changeCount = (event: ChangeEvent<HTMLInputElement>) => {
  this.setState({ count: +event.target.value });
};
```

Different elements trigger different events in the browser. Those events have different properties. This means that TypeScript needs some help from us to let it know roughly what kind of event we're expecting so that it can help us avoid any mistakes.

You can view the completed version [here][complete].

[complete]: https://codesandbox.io/s/incident-counter-class-based-completed-p1fio

## Where Are We Now?

- `examples/13-counter-class-based-with-state`
- [CodeSandbox](https://codesandbox.io/s/incident-counter-class-based-completed-p1fiofile=/src/Application.tsx)
