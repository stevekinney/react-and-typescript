---
path: "/dog-facts"
title: "Exercise: Dog Facts"
order: "3F"
section: "Interacting with Components"
description: "Adding type safety to forms and events."
---

Let's pull everything together. We're going to wire up forms and events with some "asynchronous" data.

We'll start with [this sandbox][base]. Alternatively, you can use `projects/dog-facts` in the project repository.

## Your Mission

When the user hits submit on the form, we want to fetch however many facts about dogs as they requested.

## Solution

**Warning**: Spoilers below. Proceed at your own risk.

```tsx
import * as React from "react";

const Form = () => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="fact-input">
        <label htmlFor="number-of-facts">Number of Dog Facts</label>
        <input type="number" value="3" id="number-of-facts" />
      </div>
      <input type="submit" value="Fetch Dog Facts" />
    </form>
  );
};

const Fact = ({ fact }: { fact: string }) => {
  return (
    <article className="dog-fact">
      <h3>Dog Fact</h3>
      <p>{fact}</p>
    </article>
  );
};

const Application = () => {
  return (
    <main>
      <Form />
      <section></section>
    </main>
  );
};

export default Application;
```

### Getting the Form Working

The form is going to need some state of its own. It needs to know the following:

```tsx
const [value, setValue] = React.useState(1);
```

That can be plugged into the form.

```tsx
<input
  type="number"
  value={value}
  min="1"
  max="10"
  onChange={(event) => setValue(+event.target.value)}
  id="number-of-facts"
/>
```

We'll also need a way to hold onto whatever facts that we fetch in state. In our `Application` add the following:

```tsx
const [facts, setFacts] = React.useState([]);
```

There are a few ways that we can handle fetching the dog facts from the API, but let's start with this approach in `Application`.

```tsx
const handleSubmit = (n: number) => {
  fetchDogFacts(n).then((facts) => {
    setFacts(facts);
  });
};
```

We'll pass that handler into the `Form` component.

```tsx
<Form onSubmit={handleSubmit} />
```

This will, of course, make TypeScript upset. (In fairness, this is the first in a number of ways that we're going to make TypeScript upset, but let's go with it.)

Let's update the props for the `Form` component to get TypeScript off of our back.

```tsx
type FormProps = {
  onSubmit: (n: number) => void;
};

const Form = ({ onSubmit }: FormProps) => {
  // …
};
```

Then we'll call our handler when the form is submitted.

```tsx
<form
  onSubmit={(event) => {
    event.preventDefault();
    onSubmit(value);
  }}
></form>
```

Next, let's render our facts in the `Application` component.

```tsx
{
  facts.map((fact) => <Fact key={fact.id} fact={fact.fact} />);
}
```

TypeScript is _not_ happy with us _again_. We've been blissfully ignoring the fact that it thinks that `facts` is of the type `never`.

We didn't give TypeScript enough information about what we were going to put in that array, so it didn't know what to do. It thought it should just be a perpectually empty array.

Let's give TypeScript a hint about what we're expecting.

```tsx
const [facts, setFacts] = React.useState<DogFactType[]>([]);
```

Now it's happier. It knows what to expect from our API and can allow us to move forward safety. Like I keep saying, TypeScript is just trying to protect us from ourselves.

The end result looks something like this:

```tsx
import * as React from "react";
import { fetchDogFacts, DogFactType } from "./dog-facts";

type FormProps = {
  onSubmit: (n: number) => void;
};

const Form = ({ onSubmit }: FormProps) => {
  const [value, setValue] = React.useState(1);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
      <div className="fact-input">
        <label htmlFor="number-of-facts">Number of Dog Facts</label>
        <input
          type="number"
          value={value}
          min="1"
          max="10"
          onChange={(event) => setValue(+event.target.value)}
          id="number-of-facts"
        />
      </div>
      <input type="submit" value="Fetch Dog Facts" />
    </form>
  );
};

const Fact = ({ fact }: { fact: string }) => {
  return (
    <article className="dog-fact">
      <h3>Dog Fact</h3>
      <p>{fact}</p>
    </article>
  );
};

const Application = () => {
  const [facts, setFacts] = React.useState<DogFactType[]>([]);

  const handleSubmit = (n: number) => {
    fetchDogFacts(n).then((facts) => {
      setFacts(facts);
    });
  };

  return (
    <main>
      <Form onSubmit={handleSubmit} />
      <section>
        {facts.map((fact, index) => (
          <Fact key={index} fact={fact.fact} />
        ))}
      </section>
    </main>
  );
};

export default Application;
```

### A Quick Refactor

You might have decided to create a function to handle the form submission.

```tsx
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  onSubmit(value);
};
```

### Where Are We Now?

A completed version can be found in:

- `projects/dog-facts` on the `dog-facts/complete` branch
- `examples17-dog-facts-complete`
- [CodeSandbox][complete]

[base]: https://codesandbox.io/s/dog-facts-24bqt?file=/src/Application.tsx
[complete]: https://codesandbox.io/s/dog-facts-complete-80d61
