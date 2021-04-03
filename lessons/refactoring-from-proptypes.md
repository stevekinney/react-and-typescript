---
path: "/refactoring-from-proptypes"
title: "Refactoring from PropTypes"
order: "2B"
section: "TypeScript and React Fundamentals"
description: "With TypeScript, we no longer need PropTypes to provide safety in our application."
---

In JavaScript, we've traditionally used `React.PropTypes` in order to make sure that we were passing the correct types to our React components. `React.PropTypes` would only run at run-time and in development and would spit out console warnings in the event that the component recieved the wrong types. This was good, but we can do better with TypeScript (namely, we can do this statically and at compile time).

Let's take a look at how this might look in JavaScript.

```jsx
import * as PropTypes from "prop-types";

const Greeting = ({ name }) => <h1>Hello {name}!</h1>;

Greeting.propTypes = {
  name: PropTypes.string,
};
```

There is no need for `PropTypes` in TypeScript as that's pretty much supposed to be what TypeScript does on our behalf.

```tsx
type GreetingProps = { name: string };

const Greeting = ({ name }: GreetingProps) => <h1>Hello {name}!</h1>;
```

TypeScript has now created the following type for this component:

```tsx
const Greeting: ({ name }: GreetingProps) => JSX.Element;
```

You could also do this inline if it makes you happier. But, it shouldn't make you happier, because it's one of those things that will get out of control fairly quickly.

```tsx
const Greeting = ({ name }: { name: string }) => <h1>Hello {name}!</h1>;
```

This is fine for one prop, but it doesn't scale particularly well.

### Commonly-Used Props

Take a look at [this gist](https://gist.github.com/stevekinney/2063a12c3bc76645f22e54e7d079ec39).
