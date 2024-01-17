---
title: 10 Common Mistakes in Typescript Development
date: 2023-11-16
tags:
  - Tutorials
author: Radu Dumitrescu
linkedIn: https://www.linkedin.com/in/radu-andrei-dumitrescu/
thumbnail: /images/mistakesintypescript.webp
preview: We will walk through the most common 10 mistakes in typescript and how to avoid them.
# meta data start
description: "We will walk through the most common 10 mistakes in typescript and how to avoid them."
meta_og_url: "https://genezio.com/blog/10-common-mistakes-in-typescript-development"
meta_og_image: "https://genezio.com/images/mistakesintypescript.webp"
# meta data end
---

We will walk through the most common 10 mistakes made in the TypeScript world, hoping to write cleaner, more reliable code.

Below are the subjects we will address:

1. [Overuse of type "any"](#1-overuse-of-type-any)
2. [Misusing "as" Casts](#2-misusing-as-casts)
3. [Ignoring Type-check Errors and Warning](#3-ignoring-type-check-errors-and-warning)
4. [Not Using Strict Mode](#4-not-using-strict-mode)
5. [Implicit "any" in Function Return Types](#5-implicit-any-in-function-return-types)
6. [Not using "const" and "read-only" correctly](#6-not-using-const-and-read-only-correctly)
7. [Inconsistent Coding Conventions](#7-inconsistent-coding-conventions)
8. [Overcomplicating Types](#8-overcomplicating-types)
9. [Not Leveraging TypeScript Features](#9-not-leveraging-typescript-features)
10. [Using third-party libraries](#10-using-third-party-libraries)

## 1. Overuse of type `any`

One of the most common mistakes when transiting from a non typed language to a typed one is using any type excessively. While any can come in handy in certain situations, relying on it too heavily undermines TypeScript’s benefits. It’s essential to use more specific types whenever possible to catch potential bugs early in the development process.

Here are two code examples illustrating the overuse of any type and how it can lead to issues in TypeScript:

Overusing any in Function Declarations:

```typescript
function add(a: any, b: any): any {
  return a + b;
}

const result = add(5, "10"); // No TypeScript error, logic error
console.log(result); // Outputs "510" instead of 15
```

In this example, the add function uses any type for its parameters and return type. While TypeScript doesn’t complain, it allows for adding up two values of different types (number and string), which results in an unexpected behavior.

Overusing any in Arrays:

```typescript
const data: any[] = [1, "two", true, { value: 4 }];

for (const item of data) {
  // No type-checking here
  console.log(item.value);
}

data.push(null); // No TypeScript error, but it can lead to issues later
```

Here an array data is declared with the type any\[], which means it can contain elements of any type. While this may be convenient in the short term, it bypasses TypeScript’s type-checking for array elements, potentially leading to runtime errors or unexpected behavior when working with the array’s contents.

## 2. Misusing `as` Casts

The `as` keyword allows you to assert a type for a variable, but it should be used with caution. Misusing `as` casts can lead to runtime errors if the assertion is incorrect.
It's better to let TypeScript infer types whenever possible and use `as` only when you have strong reasons to do so, such as when dealing with third-party libraries or complex type transformations.

```typescript
let userInput: any = "Hello, TypeScript!";
let strLength: number = (userInput as string).length;

console.log(strLength); // Outputs: 18
```

While this code works in this particular scenario, it's considered a misuse of `as` casts because we are bypassing TypeScript's type-checking. If `userInput` were not a string, a runtime error would occur.

## 3. Ignoring Type-check Errors and Warning

TypeScript provides valuable type-checking and inference, but some developers ignore or suppress type-check errors and warnings using the `//@ts-ignore` comment.
Ignoring these messages may hide potential issues that could lead to runtime errors or unexpected behavior. It's crucial to address type-check errors and warnings systematically to ensure code correctness.

```typescript
function add(a: number, b: number): number {
  return a + b;
}

//@ts-ignore
const result = add(5, "10"); // No type error suppressed
console.log(result); // Outputs "510" instead of 15
```

## 4. Not Using Strict Mode

TypeScript's `strict` mode enables a set of stricter type-checking options, including `noImplicitAny`, `strictNullChecks`. If you don't enable strict mode in your TypeScript configuration can result in less robust code. Enabling strict mode helps catch more type-related issues at compile-time and promotes safer coding practices.

## 5. Implicit `any` in Function Return Types

When TypeScript cannot infer the return type of a function, it defaults to `any`. This can lead to unexpected behavior and `null / undefined` related errors. Always explicitly declare function return types to ensure that TypeScript provides accurate type-checking and to make your code more predictable.

## 6. Not using `const` and `read-only` correctly

TypeScript supports `const` assertions and `readonly` properties to enforce immutability. Failing to use these features correctly can result in unintentional mutations and errors. Utilize "const" and `readonly` appropriately to ensure that your data remains consistent and your code behaves as expected.

Below are some examples of incorrect usage of `const` and `readonly`:

#### Incorrect Usage of `const` with Arrays

```typescript
const numbers = [1, 2, 3];

numbers.push(4); // No TypeScript error, but the array is modified.
numbers = [4, 5, 6]; // Error: Cannot assign to 'numbers' because it is a constant.
```

In this example, `const` is used to declare an array of numbers. While attempting to reassign the entire array results in an error, modifying the array using `push` does not produce a TypeScript error, even though it changes the array's content.

#### Misusing `readonly` with Class Properties

```typescript
class Circle {
  readonly radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  setRadius(newRadius: number) {
    // Error: Cannot assign to 'radius' because it is a read-only property.
    this.radius = newRadius;
  }
}
```

In this example, the `readonly` keyword is used correctly to declare a read-only property radius in the `Circle` class. However, the `setRadius` method attempts to reassign the `radius` property, which is not allowed.

## 7. Inconsistent Coding Conventions

Inconsistent coding conventions, such as using different naming conventions for variables or not following a consistent folder structure, can make your TypeScript project challenging to maintain. Establish clear coding conventions and adhere to them to enhance code readability and better collaboration among team members.

```typescript
// Inconsistent variable naming
const UserName = "John";
const user_age = 25;
const userAddress = "123 Main St";

// Inconsistent indentation
function greet() {
  console.log("Hello,");
  console.log("World!");
}

// Inconsistent use of quotes
const message = "Hello, TypeScript!";
const title = "Welcome to the TypeScript tutorial.";

// Inconsistent bracing style
if (condition) {
  console.log("This uses the 'K&R' style.");
} else {
  console.log("This uses a different style.");
}

// Inconsistent file naming
-userManagement.ts - User - Service.ts - userStore.ts;
```

## 8. Overcomplicating Types

While TypeScript allows you to create complex types, overcomplicating them can lead to code that is challenging to understand and maintain
Look for a balance between precision and simplicity in your type definitions, and consider using type aliases and interfaces to make your code more accessible.

Some examples of overcomplicated types:

#### Excessive Use of Mapped Types

```typescript
type OriginalData = {
  name: string;
  age: number;
  city: string;
};

type MakeReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

const readOnlyData: MakeReadOnly<OriginalData> = {
  name: "Alice",
  age: 30,
  city: "New York",
};
```

In this example, a mapped type `MakeReadOnly` is used to make all properties of a type `readonly`. While mapped types can be useful, excessive use of them can lead to code that is difficult to understand and maintain.

#### Complex Conditional Types

```typescript
type Vehicle = {
  type: "car" | "motorcycle" | "bicycle";
  wheels: 2 | 4;
};

type IsTwoWheeler<T> = T extends { wheels: 2 } ? true : false;

const isBicycle: IsTwoWheeler<Vehicle> = true;
```

In this example, a complex conditional type `IsTwoWheeler` is used to determine if a given `Vehicle` type has two wheels.

## 9. Not Leveraging TypeScript Features

TypeScript offers various advanced features like union types, intersection types, and mapped types. Failing to leverage these features effectively can limit the expressiveness and power of your TypeScript code. Invest time in understanding and using these features to write more robust and concise code.

Some examples of TypeScript features that are not used effectively:

#### Leveraging Type Inference

```typescript
const fruits = ["apple", "banana", "cherry"];
// TypeScript infers the type of 'fruits' as string[]
```

Here, TypeScript automatically infers the type of the fruits `array as string[]` based on the values it contains, eliminating the need for explicit type annotations.

#### Using Generic Types for Reusability

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const str: string = identity("Hello, TypeScript!"); // Type is inferred as string
const num: number = identity(42); // Type is inferred as number
```

In this example, we use a generic function `identity` that allows us to work with various types while maintaining type safety. This promotes code reusability and flexibility.

#### Type Aliases for Clarity

```typescript
type Point = {
  x: number;
  y: number;
};

function calculateDistance(point1: Point, point2: Point): number {
  // Calculate distance
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
```

Here, we define a `Point` type alias to make the code more self-explanatory, maintainable, and readable.

## 10. Using third-party libraries

Using third-party libraries is common in modern development, but not all libraries have strong TypeScript support. Relying on poorly typed or untyped libraries can introduce type-related bugs into your codebase. Whenever possible, choose well-maintained libraries with TypeScript typings or write your own typings to ensure type safety.

## Conclusion

TypeScript is a valuable tool for writing safer and more maintainable code, but it's essential to use it correctly. By avoiding these common mistakes and following best practices, you can harness the full potential of TypeScript and build more reliable software.

Let me know if you need help by contacting me on {{< external-link link="https://discord.gg/XmpKD9ytxS" >}}Discord{{< /external-link >}} or write me an email at radu@genez.io.
