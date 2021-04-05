---
path: "/context-exercise"
title: "OLD: Context API (Exercise)"
order: "99A"
section: "Deprecated"
description: "Get your hands dirty with the Context API and TypeScript."
---

### Exercise: Using the Context API

Use one of the following sandboxes:

- [Pizza Calculator](https://codesandbox.io/s/pizza-calculator-spyrs)
- [Pizza Calculator with Redux (Completed)](https://codesandbox.io/s/pizza-calculator-redux-completed-n8kip?file=/src/Application.tsx)

## Bonus: Passing in Components as Properties

Those two kinds of inputs make us really feel like we're repeating ourselves, right?

```tsx
const ColorAdjustment = ({
  Adjustment,
}: {
  Adjustment: React.ComponentType<IColorInputProps>;
}) => {
  // …
};
```

Now, we can do this in the `Application` component:

```tsx
<RGBProvider>
  <main>
    <ColorSwatch rgb={rgb} />
    <ColorAdjustment Adjustment={ColorInput} />
    <ColorAdjustment Adjustment={ColorSlider} />
  </main>
</RGBProvider>
```
