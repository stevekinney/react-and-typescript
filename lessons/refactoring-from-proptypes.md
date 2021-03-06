---
path: "/refactoring-from-proptypes"
title: "Refactoring from PropTypes"
order: "2B"
section: "The Fundamentals"
description: "With TypeScript, we no longer need PropTypes to provide safety in our application."
---

In JavaScript, we've traditionally used `React.PropTypes` in order to make sure that we were passing the correct types to our React components. `React.PropTypes` would only run at run-time and in development and would spit out console warnings in the event that the component recieved the wrong types. This was good, but we can do better with TypeScript—specifically, we can do this statically and at compile time.

Let's take a look at how this might look in JavaScript.

```jsx
import * as PropTypes from "prop-types";

const Greeting = ({ name }) => <h1>Hello {name}!</h1>;

Greeting.propTypes = {
  name: PropTypes.string,
};
```

There is no need for `PropTypes` in TypeScript as that's pretty much a large part of what TypeScript does on our behalf.

```tsx
type GreetingProps = { name: string };

const Greeting = ({ name }: GreetingProps) => <h1>Hello {name}!</h1>;
```

TypeScript has now created the following type for this component:

```tsx
const Greeting: ({ name }: GreetingProps) => JSX.Element;
```

## Inline Type Declarations

**An aside**: You could also do this inline if it makes you happier. But, it shouldn't make you happier, because it's one of those things that will get out of control fairly quickly.

```tsx
const Greeting = ({ name }: { name: string }) => <h1>Hello {name}!</h1>;
```

This is fine for one prop, but it doesn't scale particularly well. If the number of curly braces is intimidating to you, let's think about what this looks like without all of the destructuring in place.

```tsx
type GreetingProps = { name: string };

const Greeting = (props: GreetingProps) => <h1>Hello {props.name}!</h1>;
```

This is not dissimiliar from if we did something simple, like this:

```tsx
const addTwo = (n: number) => n + 2;
```

We're just annotating our functions with some extra information to tell TypeScript what we're intending.

## Together

Let's update our [simple `NameTag` component][base] and add a name property just like we saw above.

It might look something like this:

```tsx
type NameTagProps = {
  name: string;
};

const NameTag = ({ name }: NameTagProps) => {
  return (
    <main>
      <header>
        <h1>Hello</h1>
        <p>My Name Is</p>
      </header>
      <section className="display-name">
        <p>{name}</p>
      </section>
      <footer />
    </main>
  );
};

const Application = () => <NameTag name="Steve" />;

export default Application;
```

## Where Are We Now?

The current state of our code can be found in:

- `examples/02-nametag-with-props`
- `projects/nametag` on the `nametag-with-props` branch.
- [CodeSandbox][complete]

[base]: https://codesandbox.io/s/name-tag-bts5l?file=/src/Application.tsx
[complete]: https://codesandbox.io/s/name-tag-solution-slwmk?file=/src/Application.tsx
