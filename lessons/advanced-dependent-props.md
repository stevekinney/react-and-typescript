---
path: "/dependent-props"
title: "Demanding Props Based on Other Props"
order: "9D"
section: "Advanced Component Patterns"
description: "A look at how to implement props that rely on other props being set."
---

Let's start with the following example:

```tsx
import { useState } from "react";

type TextProps = {
  children: string;
  truncate?: boolean;
  expanded?: boolean;
};

const exampleText =
  "When I was born, the name for what I was did not exist. They called me nymph, assuming I would be like my mother and aunts and thousand cousins. Least of the lesser goddesses, our powers were so modest they could scarcely ensure our eternities. We spoke to fish and nurtured flowers, coaxed drops from the clouds or salt from the waves. That word, nymph, paced out the length and breadth of our futures.";

const truncateString = (string: string, length = 100) =>
  string.slice(0, length) + "…";

function Text({ children, truncate = false, expanded = false }: TextProps) {
  const shouldTruncate = truncate && !expanded;
  return (
    <div aria-expanded={!!expanded}>
      {shouldTruncate ? truncateString(children) : children}
    </div>
  );
}

const Application = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <main>
      <Text truncate expanded={expanded}>
        {exampleText}
      </Text>
      <section style={{ marginTop: "1em" }}>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "Contract" : "Expand"}
        </button>
      </section>
    </main>
  );
};

export default Application;
```

Now, let's say that we want to make it so that you can't pass in `expanded` unless `truncate` is also passed in.

How would we do that?

We're going to create three combinations:

- The common, shared props
- A version where we pass in a `truncate` prop.
- A version where we pass in a `truncate` and an optional `expanded` prop.

What we're missing here is a version of the type that has `expanded` without `truncate` .

```tsx
type TextProps = {
  children: string;
};

type NoTruncateTextProps = TextProps & { truncate?: false };
type TruncateTextProps = TextProps & { truncate: true; expanded?: boolean };
```

Now, we can use function overloads to get what we're looking for.

```tsx
function Text(props: NoTruncateTextProps): JSX.Element;
function Text(props: TruncateTextProps): JSX.Element;
function Text(props: TextProps & { truncate?: boolean; expanded?: boolean }) {
  const { children, truncate, expanded } = props;
  const shouldTruncate = truncate && !expanded;
  return (
    <div aria-expanded={!!expanded}>
      {shouldTruncate ? truncateString(children) : children}
    </div>
  );
}
```

## Mirroring to an HTML Element

There are some more problems with this component. It wraps a `div` and gives us this ability to truncate the text, but we still don't have the ability to do anything with that `div` .

We _could_ do something like this:

```tsx
type TextProps = {
  children: string;
  otherProps?: any;
};
```

And then pass those through to the `div` like so:

```tsx
function Text(props: NoTruncateTextProps): JSX.Element;
function Text(props: TruncateTextProps): JSX.Element;
function Text(props: TextProps & { truncate?: boolean; expanded?: boolean }) {
  const { children, truncate, expanded, otherProps } = props; // 👈
  const shouldTruncate = truncate && !expanded;
  return (
    <div aria-expanded={!!expanded} {...otherProps}>
      {" "}
      // 👈
      {shouldTruncate ? truncateString(children) : children}
    </div>
  );
}
```

And then take it for a spin:

// TODO

But, we can do better. We can say that our `Text` component takes our special overides and expects a string as a child, but also takes whatever a `div` takes. Either of these will work.

```tsx
interface TextProps extends React.ComponentPropsWithoutRef<"div"> {
  children: string;
}

type TextProps = {
  children: string;
} & React.ComponentPropsWithoutRef<"div">;
```

We can now do something like this…

```tsx
<Text truncate expanded={expanded} id="Text" style={{ color: "red" }}>
  {exampleText}
</Text>
```

This is what it looks like at the end.

```tsx
import * as React from "react";
import { useState } from "react";

type TextProps = {
  children: string;
} & React.ComponentPropsWithoutRef<"div">;

type NoTruncateTextProps = TextProps & { truncate?: false };
type TruncateTextProps = TextProps & { truncate: true; expanded?: boolean };

const exampleText =
  "When I was born, the name for what I was did not exist. They called me nymph, assuming I would be like my mother and aunts and thousand cousins. Least of the lesser goddesses, our powers were so modest they could scarcely ensure our eternities. We spoke to fish and nurtured flowers, coaxed drops from the clouds or salt from the waves. That word, nymph, paced out the length and breadth of our futures.";

const truncateString = (string: string, length = 100) =>
  string.slice(0, length) + "…";

function Text(props: NoTruncateTextProps): JSX.Element;
function Text(props: TruncateTextProps): JSX.Element;
function Text(props: TextProps & { truncate?: boolean; expanded?: boolean }) {
  const { children, truncate, expanded, ...otherProps } = props;
  const shouldTruncate = truncate && !expanded;
  return (
    <div aria-expanded={!!expanded} {...otherProps}>
      {shouldTruncate ? truncateString(children) : children}
    </div>
  );
}

const Application = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <main>
      <Text truncate expanded={expanded} id="Text" style={{ color: "red" }}>
        {exampleText}
      </Text>
      <section style={{ marginTop: "1em" }}>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "Contract" : "Expand"}
        </button>
      </section>
    </main>
  );
};

export default Application;
```
