# TypeScript

A comprehensive guide to TypeScript fundamentals and advanced concepts.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Types](#basic-types)
3. [Interfaces](#interfaces)
4. [Classes](#classes)
5. [Types vs Interfaces](#types-vs-interfaces)
6. [Union and Intersection Types](#union-and-intersection-types)
7. [Arrays](#arrays)
8. [Enums](#enums)
9. [Generics](#generics)
10. [Utility Types](#utility-types)
11. [Records and Maps](#records-and-maps)
12. [Type Guards](#type-guards)
13. [Type Inference with Zod](#type-inference-with-zod)

---

## Getting Started

### Project Setup

```bash
npm init -y
npm install typescript
npx tsc --init
```

After initialization, configure `tsconfig.json`:
- Set `rootDir` to your source directory (e.g., `"./src"`)
- Set `outDir` to your output directory (e.g., `"./dist"`)

### Compiling TypeScript

```bash
tsc -b          # Build the project
tsc --watch     # Watch mode for development
```

---

## Basic Types

TypeScript supports several primitive types:

```typescript
// Primitive types
const num: number = 5;
const str: string = "hello";
const bool: boolean = true;
const n: null = null;
const u: undefined = undefined;

// Special types
const anything: any = "can be anything";    // Avoid when possible
const unknown: unknown = "safer than any";  // Requires type checking before use
const nothing: void = undefined;            // Used for functions that return nothing
const neverReturns: never = (() => { throw new Error(); })(); // Never returns

console.log(num);
```

### Type Annotations vs Type Inference

TypeScript can infer types automatically:

```typescript
// Explicit annotation
const explicit: number = 5;

// Inferred type (TypeScript knows this is a number)
const inferred = 5;
```

Use explicit annotations when:
- Declaring variables without initial values
- Function parameters
- Complex types where inference might not work as expected

---

## Interfaces

Interfaces define the shape of objects. They are one of the most powerful features in TypeScript.

### Basic Interface

```typescript
interface User {
    username: string;
    id: number;
    email?: string;  // Optional property (marked with ?)
}

const user1: User = {
    username: "shubh",
    id: 3232
};

const user2: User = {
    username: "Shubham",
    id: 2323,
    email: "shubham@example.com"
};

console.log(user1.username);
console.log(user2.email);
```

### Readonly Properties

Prevent modification of properties after initialization:

```typescript
interface Config {
    readonly apiKey: string;
    readonly baseUrl: string;
}

const config: Config = {
    apiKey: "abc123",
    baseUrl: "https://api.example.com"
};

// config.apiKey = "new-key";  // Error: Cannot assign to 'apiKey' because it is a read-only property
```

### Function Types in Interfaces

There are two syntaxes for defining function types:

```typescript
interface Handler {
    // Method syntax
    greet(phrase: string): void;

    // Property syntax (function as a property)
    onClick: (event: string) => void;
}
```

The difference:
- `greet(phrase: string): void` - Method syntax, defines a method on the interface
- `onClick: (event: string) => void` - Property syntax, defines a property whose value is a function

### Extending Interfaces

Interfaces can extend one or more interfaces:

```typescript
interface User {
    userName: string;
    phone: number;
}

interface Student {
    id: number;
    name: string;
}

interface Person extends User, Student {
    title: string;
}

// Person now has all properties from User, Student, and its own
const student1: Person = {
    userName: "Sh7bham",
    phone: 8776867,
    id: 7,
    name: "Shubham",
    title: "Developer"
};
```

### Index Signatures

When you don't know all property names ahead of time:

```typescript
interface StringDictionary {
    [key: string]: string;
}

const headers: StringDictionary = {
    "Content-Type": "application/json",
    "Authorization": "Bearer token"
};
```

---

## Classes

### Implementing Interfaces

Classes can implement interfaces to ensure they follow a specific contract:

```typescript
interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}

class Employee implements Person {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    greet(phrase: string): void {
        console.log(`${phrase} ${this.name}`);
    }
}

const e = new Employee("Shubham", 24);
e.greet("Hello");  // Output: Hello Shubham
```

### Access Modifiers

TypeScript provides three access modifiers:

```typescript
class Person {
    public name: string;        // Accessible everywhere (default)
    private ssn: string;        // Only accessible within the class
    protected age: number;      // Accessible within the class and subclasses

    constructor(name: string, ssn: string, age: number) {
        this.name = name;
        this.ssn = ssn;
        this.age = age;
    }
}
```

### Parameter Properties (Shorthand)

A cleaner way to define and initialize class properties:

```typescript
class Person {
    constructor(
        public name: string,
        private ssn: string,
        protected age: number
    ) {}
}

// Equivalent to the longer version above
```

### Abstract Classes

Abstract classes cannot be instantiated directly and may contain abstract methods:

```typescript
abstract class Shape {
    abstract getArea(): number;

    describe(): string {
        return `This shape has an area of ${this.getArea()}`;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

const circle = new Circle(5);
console.log(circle.describe());
```

---

## Types vs Interfaces

Both `type` and `interface` can be used to define object shapes, but they have key differences:

| Feature | Interface | Type |
|---------|-----------|------|
| Extend other types | Yes (using `extends`) | Yes (using `&`) |
| Implement in classes | Yes | No |
| Declaration merging | Yes | No |
| Union types | No | Yes |
| Intersection types | No (use `extends`) | Yes |
| Primitive aliases | No | Yes |
| Tuple types | No | Yes |

### When to Use Each

**Use `interface` when:**
- Defining object shapes
- Creating contracts for classes to implement
- You need declaration merging

**Use `type` when:**
- Creating union or intersection types
- Creating type aliases for primitives
- Working with tuples
- You need more complex type operations

---

## Union and Intersection Types

### Union Types

A value can be one of several types:

```typescript
// Inline union
function greet(id: number | string): string {
    return `ID: ${id}`;
}

greet(1);       // Valid
greet("abc");   // Valid

// Named union type
type GreetArg = number | string | boolean;

function greetV2(id: GreetArg): GreetArg {
    return id;
}
```

### Narrowing Union Types

When working with unions, TypeScript requires you to narrow the type before using type-specific methods:

```typescript
function printId(id: number | string): void {
    if (typeof id === "string") {
        console.log(id.toUpperCase());  // TypeScript knows id is string here
    } else {
        console.log(id.toFixed(2));     // TypeScript knows id is number here
    }
}
```

### Intersection Types

Combine multiple types into one:

```typescript
type Employee = {
    name: string;
    startDate: Date;
};

interface Manager {
    name: string;
    department: string;
}

type TeamLead = Employee & Manager;
// TeamLead has: name, startDate, and department

const teamLead: TeamLead = {
    name: "Shubham",
    department: "IT",
    startDate: new Date()
};
```

### Discriminated Unions

A pattern for working with unions that share a common property:

```typescript
type Success = { status: "success"; data: string };
type Error = { status: "error"; message: string };
type Response = Success | Error;

function handleResponse(response: Response): void {
    switch (response.status) {
        case "success":
            console.log(response.data);     // TypeScript knows this is Success
            break;
        case "error":
            console.log(response.message);  // TypeScript knows this is Error
            break;
    }
}
```

---

## Arrays

### Basic Array Types

```typescript
// Two equivalent syntaxes
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ["a", "b", "c"];

// Array of objects
interface User {
    username: string;
    id: number;
    email: string;
}

type UserArray = User[];

const users: UserArray = [
    { username: "john", id: 1, email: "john@example.com" },
    { username: "jane", id: 2, email: "jane@example.com" }
];
```

### Example: Finding Maximum Value

```typescript
function maxValue(arr: number[]): number {
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }

    let max = arr[0];  // Initialize with first element, not 0 (handles negative numbers)
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

console.log(maxValue([2, 5, 6, 2, 8, 10]));  // Output: 10
console.log(maxValue([-5, -2, -10]));        // Output: -2
```

### Tuple Types

Fixed-length arrays with specific types at each position:

```typescript
// Tuple type
type Point = [number, number];
const origin: Point = [0, 0];

// Tuple with labels (for documentation)
type NamedPoint = [x: number, y: number];

// Tuple with optional elements
type OptionalTuple = [string, number?];
const withOptional: OptionalTuple = ["hello"];

// Tuple with rest elements
type StringNumberBooleans = [string, number, ...boolean[]];
```

---

## Enums

Enums define a set of named constants. They provide better type safety and self-documentation.

### Numeric Enums

By default, enum members are assigned incrementing numbers starting from 0:

```typescript
enum Direction {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right   // 3
}

function pressedKey(dir: Direction): void {
    console.log(dir);
}

pressedKey(Direction.Down);  // Output: 1
pressedKey(Direction.Up);    // Output: 0
```

### String Enums

For more readable output and debugging:

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}

function pressedKey(dir: Direction): void {
    console.log(dir);
}

pressedKey(Direction.Down);  // Output: DOWN
pressedKey(Direction.Up);    // Output: UP
```

### Custom Numeric Values

```typescript
enum Direction {
    Up = 1,
    Down,   // 2 (auto-incremented)
    Left,   // 3
    Right   // 4
}
```

### Practical Example: HTTP Status Codes

```typescript
enum ResponseStatus {
    Success = 200,
    Created = 201,
    BadRequest = 400,
    NotFound = 404,
    InternalError = 500
}

app.get("/", (req, res) => {
    if (!req.query.userId) {
        return res.status(ResponseStatus.NotFound).json({ error: "User not found" });
    }
    res.status(ResponseStatus.Success).json({ data: "Success" });
});
```

### const Enums

For better performance (inlined at compile time):

```typescript
const enum Direction {
    Up = "UP",
    Down = "DOWN"
}

// const enums are completely removed during compilation
// and their values are inlined
const dir = Direction.Up;  // Compiles to: const dir = "UP";
```

### Alternative: Union of Literal Types

Sometimes unions are preferable to enums:

```typescript
type KeyInput = "up" | "down" | "left" | "right";

function pressedKey(key: KeyInput): void {
    console.log(key);
}

pressedKey("down");     // Valid
// pressedKey("invalid");  // Error: Argument of type '"invalid"' is not assignable
```

---

## Generics

Generics enable you to create reusable components that work with multiple types while maintaining type safety.

### Basic Generic Function

```typescript
function identity<T>(arg: T): T {
    return arg;
}

const output1 = identity<string>("Hello");  // Type: string
const output2 = identity<number>(42);        // Type: number

// Type inference - TypeScript can often infer the type
const output3 = identity("World");  // Type: string (inferred)
```

### Generic Array Functions

```typescript
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const first = firstElement(["hello", "world"]);  // Type: string | undefined
const num = firstElement([1, 2, 3]);              // Type: number | undefined

// With interface
interface User {
    name: string;
}

const user = firstElement<User>([{ name: "Shubham" }, { name: "Singh" }]);
```

### Generic Constraints

Restrict generics to types that have certain properties:

```typescript
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(arg: T): T {
    console.log(arg.length);
    return arg;
}

logLength("hello");        // Valid - strings have length
logLength([1, 2, 3]);      // Valid - arrays have length
logLength({ length: 10 }); // Valid - object has length property
// logLength(123);         // Error - numbers don't have length
```

### Multiple Type Parameters

```typescript
function pair<K, V>(key: K, value: V): [K, V] {
    return [key, value];
}

const p = pair("age", 25);  // Type: [string, number]
```

### Generic Interfaces and Classes

```typescript
interface Box<T> {
    value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

class Container<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    get(index: number): T | undefined {
        return this.items[index];
    }
}

const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);
```

### Default Type Parameters

```typescript
interface Response<T = any> {
    data: T;
    status: number;
}

const response1: Response = { data: "anything", status: 200 };
const response2: Response<User> = { data: { name: "John" }, status: 200 };
```

---

## Utility Types

TypeScript provides several built-in utility types to help with common type transformations.

### Pick

Create a new type by selecting specific properties:

```typescript
interface User {
    id: string;
    name: string;
    age: number;
    email: string;
    password: string;
}

// Select only the properties you need
type UserPreview = Pick<User, "name" | "id" | "email">;

function displayUser(user: UserPreview): void {
    console.log(`${user.name} (${user.email})`);
}
```

### Omit

Create a type by excluding specific properties:

```typescript
// Remove sensitive fields
type PublicUser = Omit<User, "password">;

// PublicUser has: id, name, age, email (no password)
```

### Partial

Make all properties optional:

```typescript
interface User {
    name: string;
    email: string;
    age: number;
}

type PartialUser = Partial<User>;

// All properties are now optional
function updateUser(id: string, updates: PartialUser): void {
    // Can update any combination of fields
}

updateUser("123", { name: "New Name" });
updateUser("123", { email: "new@email.com", age: 30 });
```

### Required

Make all properties required (opposite of Partial):

```typescript
interface Config {
    host?: string;
    port?: number;
}

type RequiredConfig = Required<Config>;
// Both host and port are now required
```

### Readonly

Make all properties readonly:

```typescript
type User = {
    username: string;
    id: number;
};

const user: Readonly<User> = {
    username: "xyz",
    id: 21
};

// user.id = 22;  // Error: Cannot assign to 'id' because it is a read-only property
```

### Exclude

Remove types from a union:

```typescript
type EventType = "click" | "scroll" | "mousemove";
type ExcludeEvent = Exclude<EventType, "scroll">;  // "click" | "mousemove"

const handleEvent = (event: ExcludeEvent): void => {
    console.log(`Handling event: ${event}`);
};

handleEvent("click");    // Valid
// handleEvent("scroll");  // Error
```

### Extract

Extract types from a union that are assignable to another type:

```typescript
type EventType = "click" | "scroll" | "mousemove" | "keydown" | "keyup";
type MouseEvents = Extract<EventType, "click" | "scroll" | "mousemove">;
// Result: "click" | "scroll" | "mousemove"
```

### NonNullable

Remove null and undefined from a type:

```typescript
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;  // string
```

### ReturnType

Get the return type of a function:

```typescript
function createUser() {
    return { id: 1, name: "John" };
}

type UserType = ReturnType<typeof createUser>;
// { id: number; name: string }
```

### Parameters

Get the parameter types of a function as a tuple:

```typescript
function greet(name: string, age: number): string {
    return `Hello ${name}, you are ${age}`;
}

type GreetParams = Parameters<typeof greet>;
// [string, number]
```

---

## Records and Maps

### Record Type

A cleaner way to define object types with string keys:

```typescript
type UserInfo = {
    username: string;
    id: number;
};

// Instead of using index signatures
type UsersOld = {
    [key: string]: UserInfo;
};

// Use Record for cleaner syntax
type Users = Record<string, UserInfo>;

const users: Users = {
    user1: { username: "john", id: 21 },
    user2: { username: "jane", id: 22 }
};
```

### Record with Specific Keys

```typescript
type Role = "admin" | "user" | "guest";

type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
};
```

### Map Object

JavaScript's Map with TypeScript typing:

```typescript
type User = {
    userName: string;
    id: number;
};

const allUsers = new Map<string, User>();

allUsers.set("user1", { userName: "abc", id: 22 });
allUsers.set("user2", { userName: "xyz", id: 23 });

const user = allUsers.get("user1");  // User | undefined
allUsers.delete("user1");
console.log(allUsers.has("user1"));  // false
```

### When to Use Record vs Map

| Feature | Record | Map |
|---------|--------|-----|
| Compile-time type | Yes | Yes |
| Iteration order | Not guaranteed | Insertion order |
| Key types | string, number, symbol | Any type |
| Serialization | JSON.stringify works | Requires conversion |
| Performance | Better for small objects | Better for frequent add/delete |

---

## Type Guards

Type guards help you narrow down types within conditional blocks.

### typeof Guard

```typescript
function padLeft(value: string, padding: string | number): string {
    if (typeof padding === "number") {
        return " ".repeat(padding) + value;
    }
    return padding + value;
}
```

### instanceof Guard

```typescript
class Dog {
    bark() { console.log("Woof!"); }
}

class Cat {
    meow() { console.log("Meow!"); }
}

function speak(animal: Dog | Cat): void {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}
```

### in Operator

```typescript
interface Fish {
    swim(): void;
}

interface Bird {
    fly(): void;
}

function move(animal: Fish | Bird): void {
    if ("swim" in animal) {
        animal.swim();
    } else {
        animal.fly();
    }
}
```

### Custom Type Guards

```typescript
interface Cat {
    meow(): void;
}

interface Dog {
    bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
    return (animal as Cat).meow !== undefined;
}

function speak(animal: Cat | Dog): void {
    if (isCat(animal)) {
        animal.meow();  // TypeScript knows this is a Cat
    } else {
        animal.bark();  // TypeScript knows this is a Dog
    }
}
```

### Assertion Functions

```typescript
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error("Value must be a string");
    }
}

function processValue(value: unknown): void {
    assertIsString(value);
    console.log(value.toUpperCase());  // TypeScript knows value is string
}
```

---

## Type Inference with Zod

Zod is a TypeScript-first schema validation library that provides automatic type inference.

### Basic Usage

```typescript
import { z } from "zod";

// Define a schema
const UserSchema = z.object({
    name: z.string(),
    age: z.number().min(0).max(120),
    email: z.string().email()
});

// Infer the TypeScript type from the schema
type User = z.infer<typeof UserSchema>;
// Equivalent to: { name: string; age: number; email: string }

// Validate data at runtime
const result = UserSchema.safeParse({
    name: "John",
    age: 25,
    email: "john@example.com"
});

if (result.success) {
    console.log(result.data);  // Type-safe User object
} else {
    console.log(result.error.issues);
}
```

### Common Zod Patterns

```typescript
import { z } from "zod";

// Optional fields
const UserSchema = z.object({
    name: z.string(),
    nickname: z.string().optional()
});

// Default values
const ConfigSchema = z.object({
    timeout: z.number().default(5000)
});

// Union types
const IdSchema = z.union([z.string(), z.number()]);

// Arrays
const TagsSchema = z.array(z.string());

// Enums
const RoleSchema = z.enum(["admin", "user", "guest"]);

// Transform data
const DateSchema = z.string().transform((str) => new Date(str));

// Refine with custom validation
const PasswordSchema = z.string().refine(
    (val) => val.length >= 8,
    { message: "Password must be at least 8 characters" }
);
```

### API Validation Example

```typescript
import { z } from "zod";
import express from "express";

const CreateUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    age: z.number().int().positive()
});

app.post("/users", (req, res) => {
    const result = CreateUserSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }

    // result.data is fully typed as { name: string; email: string; age: number }
    const user = createUser(result.data);
    res.json(user);
});
```

---

## Callback Functions

### Typing Callback Parameters

```typescript
function callingAnother(fn: (c: number) => void, c: number): void {
    setTimeout(() => {
        fn(c);
    }, 2000);
}

function callThis(c: number): void {
    console.log(c + 1);
}

callingAnother(callThis, 2);
```

### Complex Callback Types

```typescript
// Function that takes a callback with multiple parameters
function doSomething(cb: (str: string, num: number) => string): string {
    const result = cb("hello", 42);
    return result;
}

// Callback as return type
type AsyncCallback<T> = (error: Error | null, result: T | null) => void;

function fetchData(callback: AsyncCallback<string>): void {
    // Simulated async operation
    setTimeout(() => {
        callback(null, "data");
    }, 1000);
}
```

---

## Modules and Exports

### Named Exports

```typescript
// utils.ts
export function add(a: number, b: number): number {
    return a + b;
}

export const PI = 3.14159;

export interface User {
    name: string;
}
```

### Default Exports

```typescript
// logger.ts
export default class Logger {
    log(message: string): void {
        console.log(message);
    }
}
```

### Importing

```typescript
// Named imports
import { add, PI, User } from "./utils";

// Default import
import Logger from "./logger";

// Mixed
import Logger, { add } from "./module";

// Rename imports
import { add as sum } from "./utils";

// Import entire module
import * as Utils from "./utils";
Utils.add(1, 2);
```

### Re-exporting

```typescript
// index.ts - barrel file
export { add, PI } from "./utils";
export { default as Logger } from "./logger";
export * from "./types";
```

---

## Additional Resources

- [Official TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
