---
path: "/refactoring-color-inputs"
title: "Refactoring the Color Inputs"
order: "5D"
section: "A Color Swatch and the Context API"
description: "Let's DRY out our inputs?"
---

Okay, this is our first taste of the second major story arc of this workshop.

I've been mostly ignoring the text inputs around the color fields. This has mostly been because I am very lazy and I haven't wanted to do the same thing twice.

What I'd love to do is to make the need to do the same thing to both `ColorSliders` and `ColorInputs`. Literally, the only thing that makes these two things different is the fact that one of them uses the type of `slider` and the other one uses the type of `range`. That does not seem like a good reason to do everything twice.

Now is our change to fix that.

Let's start by making a copy of `ColorSliders.tsx` and naming it `ColorAdjustment.tsx`.

Rename the component to `ColorAdjustment` too, just to avoid any confusion later.

We're also going to lift the individual `ColorSliderProps` as well.

```tsx
export interface AdjustmentInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
```

Now, instead of hard coding in the inputs, we're going to let the consumer of the container pass in any component they want as long as it adheres to the shape of the props we're expecting.

```tsx
export interface ColorAdjustmentProps {
  Adjustment: React.ComponentType<AdjustmentInputProps>;
}
```

Now, we can swap out those hard-coded `ColorSlider` for whatever we pass in. TypeScript is cool with this because we've promise that whatever component we pass in, it'll conform to that shape.

```tsx
<section className="color-sliders">
  <Adjustment id="red-slider" label="Red" value={red} onChange={adjustRed} />
  <Adjustment
    id="green-slider"
    label="Green"
    value={green}
    onChange={adjustGreen}
  />
  <Adjustment
    id="blue-slider"
    label="Blue"
    value={blue}
    onChange={adjustBlue}
  />
</section>
```

It loads, but `ColorInput` needs a tiny bit of work that we'll handle later.

You can explore a version of this [here][complete].

[complete]: https://codesandbox.io/s/red-green-blue-with-better-color-adjustment-nppsf?file=/src/ColorInput.tsx
