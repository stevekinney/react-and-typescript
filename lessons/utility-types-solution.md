---
path: "/utility-types-solution"
title: "Utility Types (Solution)"
order: "6E"
section: "Just Enough TypeScript"
description: "An exercise for getting comfortable with utility types in TypeScript."
---

<iframe src="https://codesandbox.io/embed/fun-with-utility-types-solution-x0i28?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApplication.tsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="fun-with-utility-types-solution"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You can find the solution [here](https://codesandbox.io/s/fun-with-utility-types-solution-x0i28?file=/src/Application.tsx).

## Solution

We can start by making a type that omits `accountId`.

```ts
type UserProps = Omit<UserModel, "accountId">;
```

If we hover over it, we'll see:

```ts
type UserProps = {
  displayName: string;
  isVerified: boolean;
};
```

Boom. That did the trick. Alternatively, we could do something like this:

```ts
type AlternateUserProps = Pick<UserModel, "displayName" | "isVerified">;
```

Same result.

### Copying Props

We can create a type for props out of the prop type of another component—even if we don't have direct access to the type itself.

```tsx
React.ComponentProps<typeof CurrentUser>
```

[completed]: https://codesandbox.io/s/fun-with-utility-types-solution-x0i28?file=/src/Application.tsx

## Where Are We Now?

- `examples/30-utility-types-solution`
- `projects/utility-types-exercise` on the `utility-types-solution` branch
- [CodeSandbox][completed]
