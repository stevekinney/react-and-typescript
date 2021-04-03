---
path: "/class-based-components"
title: "Typing Class-based Components"
order: "4A"
section: "Class-Based Components"
description: "A brief look at how we can add type safety to class-based React cmponents."
---

Here is an [example sandbox](https://codesandbox.io/s/incident-counter-class-based-4h4d5).

So, maybe you're not using fancy functional components everywhere. Maybe, you've still got some class components around. How do you use TypeScript with those components?

```tsx
class App extends React.Component<MyProps, MyState> {
  // …
}
```

So, let's look at our silly `Counter` example from earlier.

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
