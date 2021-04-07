---
path: "/migration"
title: "Migrating From JavaScript"
order: "10A"
section: "Appendix"
description: "A collection of high-level tips about how to migrate your application from JavaScript to TypeScript."
---

In my experience, most journeys from JavaScript to TypeScript are going to be a bit unique.

High-level advice:

- Start with a gentle set of TypeScript rules and the `allowJs` flag. This means a lot of stuff will be `any` but that's okay for now.

## Official Advice

There are some official guides around this topic:

- [TypeScript Docs: Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
- [TypeScript React Conversion Guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
