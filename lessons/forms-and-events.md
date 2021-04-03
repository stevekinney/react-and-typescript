---
path: "/forms-and-events"
title: "Typing Forms and Events"
order: "3D"
section: "Typing with Hooks and State Management"
description: "Adding type safety to forms and events."
---

- Start with doing it in [the class-based example](https://codesandbox.io/s/incident-counter-class-based-4h4d5?file=/src/Application.tsx).
- Have them doing it in [a hooks-based example](https://codesandbox.io/s/incident-counter-5rvp3?file=/src/Application.tsx)

```tsx
changeCount = (event: ChangeEvent<HTMLInputElement>) => {
  this.setState({ count: +event.target.value });
};
```
