---
path: "/use-state-no-default-value"
title: "Setting State without a Default Value"
order: "3B"
section: "Interacting with Components"
description: "How to handle the case where we don’t have a default value for use with type inference. "
---

We'll start from this [base][]. You can also use `projects/character-card` or start with `examples/08-character-card` in the project repository.

The previous example works, but you might not always have a default value for a given piece of state at the time that the component is initiatlized. For example, here is some psuedo-code:

```jsx
const [character, setCharacter] = React.useState(null);
```

Eventually, `user` should be something and we'll likely get it from the API, but—initially—we don't have a value just yet. There is nothing for TypeScript to infer.

Let's assume our User model has the following shape to it:

```tsx
export type CharacterType = {
  name: string;
  alignment: string;
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
  total: number;
};
```

Let's also imagine for a moment that we have an asynchronous API request called `getCurrentUser`. We'll polyfill it as follows for now.

```tsx
// Fake API Request
export const fetchCharacter = (): Promise<CharacterType> => {
  const [character] = shuffle(data);
  return Promise.resolve(character);
};
```

Basically, this fake API request just waits a moment and then returns an object that adheres to the `User` interface that we defined earlier.

We can then give TypeScript a hint to the properties that we _expect_ the state to have once it's loaded.

```tsx
const [character, setCharacter] = React.useState<CharacterType | null>(null);
```

We know that this component needs just the `name` property and that it expects it to be a string, but that's not really DRY code. Instead, we can just tell the component to expect an object that conforms to the `User` interface.

Our component, might look something like this.

```tsx
const Application = () => {
  const [character, setCharacter] = React.useState<CharacterType | null>(null);

  React.useEffect(() => {
    fetchCharacter().then((c) => {
      setCharacter(c);
    });
  }, []);

  return (
    <main>
      {character ? <CharacterInformation character={character} /> : <Loading />}
    </main>
  );
};
```

What if we wanted to have a state that kept track of whether or not we loaded the component. It might look something like this.

```tsx
const Application = () => {
  const [character, setCharacter] = React.useState<CharacterType | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchCharacter().then((c) => {
      setCharacter(c);
      setLoading(false);
    });
  }, []);

  return (
    <main>
      {loading ? <Loading /> : <CharacterInformation character={character} />}
    </main>
  );
};
```

But wait! TypeScript is angry with us. That's because it doesn't know whether or not `character` is `null` or not.

There are a few ways that we can handle this.

```tsx
{
  loading ? (
    <Loading />
  ) : (
    character && <CharacterInformation character={character} />
  );
}
```

Or we can just flip the logic back to make sure we confirm that there is a `character`, this kind of defeats the purpose of having `loading` at all in this situation.

What's also interesting is that this doesn't satisfy TypeScript.

```tsx
{
  loading && !character ? (
    <Loading />
  ) : (
    <CharacterInformation character={character} />
  );
}
```

Simply asserting that it _doesn't_ exist is not enough to prove to TypeScript that it does.

Another option is to treat them independently.

```tsx
<main>
  {loading && <Loading />}
  {character && <CharacterInformation character={character} />}
</main>
```

You can see the completed example [here][complete].

## Where Are We Now?

You can find the current state of the code in:

- `examples/09-character-card-eventual-state`
- In `projects/character-card` on the `character-card-eventual-state` branch.
- [CodeSandbox][complete].

[base]: https://codesandbox.io/s/character-sheet-base-uxlfu?file=/src/Application.tsx
[complete]: https://codesandbox.io/s/character-sheet-complete-jb8d4?file=/src/Application.tsx:503-620
