---
path: "/typing-children-solution"
title: "Typing Children (Solution)"
order: "2E"
section: "TypeScript and React Fundamentals"
description: "In which we determine what type to use for child components in React."
---

How do we type this? Well. We have a few choices.

- `JSX.Element;`: 💩 This doesn't account for arrays at all.
- `JSX.Element | JSX.Element[];` 😕 This doesn't accept strings.
- `React.ReactChildren;`: 🤪 Not at even an appropriate type; it's a utility function.
- `React.ReactChild[];`: 😀 Accepts multiple children, but it doesn't accept a single child.
- `React.ReactNode;`: 🏆 Accepts everything.
