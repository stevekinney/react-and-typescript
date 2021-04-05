---
path: "/higher-order-components"
title: "Higher Order Components with TypeScript"
order: "8A"
section: "Higher Order Components"
description: "Implementing the higher-order component pattern with TypeScript."
---

We're going to base what we're doing off of [this sandbox][base].

[base]: https://codesandbox.io/s/character-sheet-utility-types-complete-jb8d4

We'll start at a super high level with just a component that wraps another component and does _nothing_ to it.

```tsx
const withCharacter = (Component: any) => {
  return Component;
};
```

In the `Application` component, we can use our pointless HOC.

```tsx
const CharacterInformationWithCharacter = withCharacter(CharacterInformation);
```

And, we'll swap it out in the return value of `Application`:

```tsx
{
  character && <CharacterInformationWithCharacter character={character} />;
}
```

This has just made it a worse component since it now has lost its type information. But, it's a start.

Let's move in the state management piece.

```tsx
const withCharacter = (Component: any) => {
  return (props) => {
    const [character, setCharacter] = React.useState<CharacterType | null>(
      null
    );
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      fetchCharacter().then((c) => {
        setCharacter(c);
        setLoading(false);
      });
    }, []);

    if (loading) return null;
    return <Component character={character} />;
  };
};
```

And now we can simplify `Application` a bit.

```tsx
const Application = () => {
  const CharacterInformationWithCharacter = withCharacter(CharacterInformation);

  return (
    <main>
      <CharacterInformationWithCharacter />
    </main>
  );
};
```

We still have the issue with the fact that it will take any props, however.

What we _want_ is for our higher order component to take any of the props the component it wraps takes, _except_ the ones we plan on passing in.

This sounds like a job for a generic.

Let's start somewhat naively.

```tsx
function withCharacter<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const [character, setCharacter] = React.useState<CharacterType | null>(
      null
    );
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      fetchCharacter().then((c) => {
        setCharacter(c);
        setLoading(false);
      });
    }, []);

    if (loading) return <Loading />;
    return <Component character={character} />;
  };
}
```

So, it loads, but—as usual—TypeScript is angry with us.

It's angry with us about two things:

- First, it's angry with us that `CharacterInformationWithCharacter` isn't getting the `character` that the underlying component is expecting.
- Our higher order component doesn't have any idea that `Component` is something that can accept a `character` prop.

So, it stands that we need to do two things.

- Tell our HOC that we will only wrap components that have take the props that we plan on passing in.
- Return a component that doesn't worry about the props that our HOC is passing in.

Okay, so what does our HOC pass in? Well, in this case, it passes in `character`. Right on. Let's get clear about that.

```ts
type WithCharacterProps = {
  character: CharacterType;
};
```

Now, we'll tell our HOC, that cool—set the generic, `T` to the type of the component that we pass in, _but_ that component _must_ have a `character` prop that is of the type `CharacterType`.

Next, we want to say that our wrapper is going to take all of the props that the wrapped component takes, except for `character` because we're passing that one in.

```tsx
return (props: Omit<T, keyof WithCharacterProps>) => {
  // …
};
```

This quiets the error in `Application`.

Next, we're going to have to help TypeScript along a little bit. We're going to promise that we're going to give it whatever other props it's expecting—none in this case—along with `character` and tell the component that's the complete package.

This makes sense because we _know_ that this component takes a `character` prop since we confirmed that we only accept components that take a `character` prop. So, we're passing that in and then whatever else that component might choose to take down the road.

The end result looks something like this and can be found [here][complete].

```tsx
import * as React from "react";

import { CharacterType, fetchCharacter } from "./characters";

import { Loading } from "./Loading";
import { CharacterInformation } from "./CharacterInformation";

type WithCharacterProps = {
  character: CharacterType;
};

function withCharacter<T extends WithCharacterProps>(
  Component: React.ComponentType<T>
) {
  return (props: Omit<T, keyof WithCharacterProps>) => {
    const [character, setCharacter] = React.useState<CharacterType | null>(
      null
    );
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      fetchCharacter().then((c) => {
        setCharacter(c);
        setLoading(false);
      });
    }, []);

    if (loading) return <Loading />;
    return character && <Component {...(props as T)} character={character} />;
  };
}

const Application = () => {
  const CharacterInformationWithCharacter = withCharacter(CharacterInformation);

  return (
    <main>
      <CharacterInformationWithCharacter />
    </main>
  );
};

export default Application;
```

[complete]: https://codesandbox.io/s/character-sheet-utility-with-hoc-3opyk?file=/src/Application.tsx:740-746
