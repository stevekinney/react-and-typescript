---
path: "/use-state"
title: "useState Hook"
order: "3A"
section: "Interacting with Components"
description: "An introduction to typing useState in React."
---

When in doubt, TypeScript is going to try its hardest to infer types on your behalf. Let's look at the following silly update to our component.

<iframe src="https://codesandbox.io/embed/avengers-quiz-oxm68?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApplication.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="avengers-quiz"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```tsx
const Question = ({ question, answer }: QuestionProps) => {
  return (
    <article className="question">
      <header>{question}</header>
      <p className="answer">
        <span className="blurred">{answer}</span>
      </p>
      <footer>
        <button>Toggle Answer</button>
      </footer>
    </article>
  );
};
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

It looks like it was a string. So, we must be ready to go.

```tsx
const name: string;
const setName: React.Dispatch<React.SetStateAction<string>>;
```

[This sandbox][complete] represents where we are at the end of this section.

[complete]: https://codesandbox.io/s/avengers-quiz-use-state-z68vj?file=/src/Application.tsx

**Nota bene**: You might be wondering what this looks like when we change the state. We'll come back to that shortly, I promise.
