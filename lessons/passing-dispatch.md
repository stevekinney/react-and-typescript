---
path: "/passing-dipatch"
title: "Prologue: Passing Dispatch as a Props"
order: "5A"
section: "Color and Context"
description: "Getting started with a simple color swatch application."
---

[Start with this CodeSandbox](https://codesandbox.io/s/red-green-blue-k6frm?file=/src/Application.tsx).

Before we dive into the Context API, let's wire this up so that we can update the state.

If you look at `Application.tsx`, it almost looks like we have no TypeScript at all.

```tsx
const Application = () => {
  const [rgb, dispatch] = React.useReducer(reducer, {
    red: 0,
    green: 0,
    blue: 0,
  });

  return (
    <main style={{ borderColor: toRGB(rgb) }}>
      <ColorSwatch rgb={rgb} />
      <ColorInputs rgb={rgb} />
      <ColorSliders rgb={rgb} />
    </main>
  );
};
```

But, if you hover over the `rgb` and the `dispatch` coming out of `useReducer`, you can see both definitely have some type information associated with them.

```ts
const rgb: RGBColorType;
const dispatch: React.Dispatch<AdjustmentAction>;
```

`RGBColorType` is freqently used in this application, so it's commonly stored in the `src/types` directory.

```tsx
export interface RGBColorType {
  red: number;
  green: number;
  blue: number;
}
```

If we look at the reducer, we can see that we have the type definition for our actions.

```tsx
export type AdjustmentAction = {
  type: "ADJUST_RED" | "ADJUST_GREEN" | "ADJUST_BLUE";
  payload: number;
};

export const reducer = (
  state: RGBColorType,
  action: AdjustmentAction
): RGBColorType => {
  if (action.type === "ADJUST_RED") {
    return { ...state, red: action.payload };
  }

  if (action.type === "ADJUST_GREEN") {
    return { ...state, green: action.payload };
  }

  if (action.type === "ADJUST_BLUE") {
    return { ...state, blue: action.payload };
  }

  return state;
};
```

We're going to pass `dispatch` down into a component just to see how it works. Technically, we need to do it twice. I'm not going to because I know I am going to refactor it in a bit, but if you want to as an exercise to the reader, the you're more than welcome to.

Let's head into `ColorSliders.tsx`.

We want to use the current type that we pulled from `RGBColorType` but we also want to extend it to support our dispatch.

I purposely used an interface instead of a type this time so that I could demonstrate the difference in how you extend each of them.

```tsx
interface ColorSidersProps extends RGBColorType {
  dispatch: Dispatch<AdjustmentAction>;
}
```

Okay, now we can pass in `dispatch` to our `ColorSliders` component in `Application.tsx`;

```tsx
<ColorSliders {...rgb} dispatch={dispatch} />
```

In `ColorSliders.tsx`, we can wire up the ability to dispatch actions.

```ts
const adjustRed = (event: ChangeEvent<HTMLInputElement>) => {
  dispatch({ type: "ADJUST_RED", payload: +event.target.value });
};

const adjustGreen = (event: ChangeEvent<HTMLInputElement>) => {
  dispatch({ type: "ADJUST_GREEN", payload: +event.target.value });
};

const adjustBlue = (event: ChangeEvent<HTMLInputElement>) => {
  dispatch({ type: "ADJUST_BLUE", payload: +event.target.value });
};
```

There are certainly some clever ways to DRY up this code, but I'll save that for a functional programming workshop.

We'd ideally like to pass these in as `onChange` props. They've got everything they need.

```tsx
<ColorSlider
  id="red-slider"
  label="Red"
  value={red}
  onChange={adjustRed}
/>
<ColorSlider
  id="green-slider"
  label="Green"
  value={green}
  onChange={adjustGreen}
/>
<ColorSlider
  id="blue-slider"
  label="Blue"
  value={blue}
  onChange={adjustBlue}
/>
```

But despite the fact that these `ColorSlider` props are basically some ceremony around an input field, it's a little ridiculous that we need to add props for everything that the underlying component supports.

**Take a mental note of how annoying this is.** (I don't want to spoil anything, but just take a mental note, okay?)

Fine. We'll go ahead and define a prop for this I guess.

In `ColorSlider.tsx`:

```tsx
export interface ColorInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ColorSlider = ({
  id,
  label,
  value,
  onChange,
}: ColorInputProps) => {
  return (
    <div className="color-slider">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min="0"
        max="255"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
```

Okay, great, it works. Let's slowly fix this up.

In the next few sections, we're going to:

- Refactor this a bit using the Context API.
- Create an abstraction for the two types of input fields on this page.
- Fix a bug that hasn't appeared yet with our sliders.
- Fix that annoying issue where we find outselves reimplementing the type properties of an input field.

[This][complete] is where we are at the end of this section.

[completed]: https://codesandbox.io/s/red-green-blue-with-dispatch-8ketd?file=/src/ColorSlider.tsx:38-524
