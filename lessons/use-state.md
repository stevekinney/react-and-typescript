---
path: "/use-state"
title: "useState Hook"
order: "3A"
section: "Typing with Hooks and State Management"
description: "An introduction to typing useState in React."
---

When in doubt, TypeScript is going to try its hardest to infer types on your behalf. Let's look at the following silly update to our component.

```tsx
import { useState } from "react";

type GreetingProps = { name: string };

const Greeting = ({ name }: GreetingProps) => {
  const [isHidden, toggleHidden] = useState(false);

  return (
    <section>
      {!isHidden && <h1>Hello {name}!</h1>}
      <button onClick={() => toggleHidden(!isHidden)}>Hide</button>
    </section>
  );
};

export default Greeting;
```

The notable and new piece is our use of React's `useState` hook.

```tsx
const [isHidden, toggleHidden] = React.useState(false);
```

- `isHidden` is defined as `false` from the get-go, which means TypeScript can assume it's supposed to be a boolean.
- `toggleHidden` infers that, since `isHidden` is supposed to be a boolean, that it should take a boolean as an argument.

The inferred types are as follows:

```tsx
const isHidden: boolean;
const toggleHidden: React.Dispatch<React.SetStateAction<boolean>>;
```

That second type for `toggleHidden` is a bit stranger than anything we've seen before, but we'll talk more about that later.

This will work any time that we have a default value for a piece of state.

```tsx
const [name, setName] = useState("Steve");
```

```tsx
const name: string;
const setName: React.Dispatch<React.SetStateAction<string>>;
```

### Setting State When We Might Not Have a Default Value

The above example works, but you might not always have a default value for a given piece of state at the time that the component is initiatlized. For example, here is some psuedo-code:

```jsx
const [user, setUser] = useState(null);
const [isLoading, toggleLoading] = useState(true);
```

Eventually, `user` should be something and we'll likely get it from the API, but—initially—we don't have a value just yet. So, there is nothing for TypeScript to infer.

Let's assume our User model has the following shape to it:

```tsx
interface IUser {
  name: string;
  userId: string;
  isAdmin: boolean;
}
```

(**Nota bene**: I've been intentionally somewhat quiet about the difference between types and interfaces, but we'll dig into this in a bit.)

Let's also imagine for a moment that we have an asynchronous API request called `getCurrentUser`. We'll polyfill it as follows for now.

```tsx
// Fake API Request
const getCurrentUser = () => {
  return new Promise<{ name: string }>((resolve) => {
    setTimeout(() => {
      const user: IUser = {
        name: "Tony Stark",
        userId: "fq298",
        isAdmin: true,
      };

      resolve(user);
    }, 2000);
  });
};
```

Basically, this fake API request just waits 2 seconds and then returns an object that adheres to the `IUser` interface that we defined earlier.

We can then give TypeScript a hint to the properties that we _expect_ the state to have once it's loaded.

```tsx
const [user, setUser] = useState<{ name: string } | null>(null);
```

We know that this component needs just the `name` property and that it expects it to be a string, but that's not really DRY code. Instead, we can just tell the component to expect an object that conforms to the `IUser` interface.

Our component, might look something like this.

```tsx
const Greeting = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, toggleLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      toggleLoading(false);
    });
  });

  return <section>{!isLoading && <h1>Hello {user && user.name}!</h1>}</section>;
};
```

**Quick Exercise**: You'll notice that we're still guarding again the fact that TypeScript is protecting us from accessing `user.name` without first checking to see if `user` exists. This is because TypeScript knows that it could be either an object _or_ `null` . Instead of using that `isLoading` toggle, what if we just checked to see if the user had loaded before rendering anything. Could we get away without the `&&` ?

We might eventually end up with something like this:

```tsx
const Greeting = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
  });

  return <section>{user && <h1>Hello {user.name}!</h1>}</section>;
};
```

There is also [optional chaining](https://www.typescriptlang.org/play?jsx=1#code/C4TwDgpgBJBODOB7AdgFXNAvFA3gKCimQEMBbCALinmFgEtkBzAGgKgGNjgB+Kz4dJFaEAJoka8oYxoIh4AvnjyhIHLrKjZ8hEuSo16TVouUYp4jdn6yA3EvYoaUYiIBuEZMACusCLCpwSGhmWmy6lFAA5ACCADZ07BCRwmrAVNqERGQRkQAiDMQAFpFsivJ2eA7ITtIActmazm4e3r6wAHTS3O3hdlVIsRDtseIAFHXZAJR2APQzUBAAHpDswBAiUIhewGDbVF7IIhAAZgzr9o6Ig8NjLu6ePn7tSOS1KACii3Q0LQCyEMBCogRN1RpNpng5gtlhBVutNttdmkoAcjqdkOcgA).
