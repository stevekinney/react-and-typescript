---
path: "/class-based-components"
title: "Typing Class-based Components"
order: "4A"
section: "Class-Based Components"
description: "A brief look at how we can add type safety to class-based React cmponents."
---

So far, we've mostly looked at examples of components using hooks for state management, but you and I both know that there are still plenty of React codebases out there chock full of class-based components. Can we use TypeScript with those components? Absolutely. Let's take a look at how we might go about that.

Here is an [example sandbox](https://codesandbox.io/s/incident-counter-class-based-4h4d5).

```tsx
class VeryImportantComponent extends React.Component<MyProps, MyState> {
  // …
}
```

Let's look at our silly `Counter` example from earlier.

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

Things to do while live-coding:

- Add state and props.
- Pass in props in `Application`.

One thing that you'll notice is that we called out `CounterState` twice. Once in the type parameter and again in the instance property. Why did we do this?

## Working with Forms and Events

- Start with doing it in [the class-based example](https://codesandbox.io/s/incident-counter-class-based-4h4d5?file=/src/Application.tsx).
- Have them doing it in [a hooks-based example](https://codesandbox.io/s/incident-counter-5rvp3?file=/src/Application.tsx)

```tsx
changeCount = (event: ChangeEvent<HTMLInputElement>) => {
  this.setState({ count: +event.target.value });
};
```
