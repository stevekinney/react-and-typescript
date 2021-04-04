---
path: "/utility-types-exercise"
title: "Utility Types (Exercise)"
order: "6D"
section: "Helpful TypeScript Concepts"
description: "An exercise for getting comfortable with utility types in TypeScript."
---

We'll start with the following code in [this sandbox](https://codesandbox.io/s/fun-with-utility-types-2lmj2?file=/src/Application.tsx).

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
