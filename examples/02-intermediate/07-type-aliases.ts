// 07-type-aliases.ts - Type Aliases vs Interfaces

// ===== BASIC TYPE ALIASES =====

// Simple type alias
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

// Using type aliases
let userId: ID = "user123";
let orderId: ID = 45678;
let currentStatus: Status = "pending";

// ===== OBJECT TYPE ALIASES =====

type Point = {
    x: number;
    y: number;
};

type Circle = {
    center: Point;
    radius: number;
};

let myPoint: Point = { x: 10, y: 20 };
let myCircle: Circle = {
    center: { x: 0, y: 0 },
    radius: 5
};

// ===== FUNCTION TYPE ALIASES =====

type StringProcessor = (input: string) => string;
type NumberComparator = (a: number, b: number) => boolean;

let uppercase: StringProcessor = (str) => str.toUpperCase();
let isGreater: NumberComparator = (a, b) => a > b;

// ===== GENERIC TYPE ALIASES =====

type Container<T> = {
    value: T;
    isEmpty: boolean;
};

type Pair<T, U> = {
    first: T;
    second: U;
};

let stringContainer: Container<string> = {
    value: "Hello",
    isEmpty: false
};

let numberStringPair: Pair<number, string> = {
    first: 42,
    second: "answer"
};

// ===== UNION TYPE ALIASES =====

type Theme = "light" | "dark" | "auto";
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type EventType = "click" | "hover" | "focus" | "blur";

type UIConfig = {
    theme: Theme;
    size: Size;
    events: EventType[];
};

let config: UIConfig = {
    theme: "dark",
    size: "lg",
    events: ["click", "hover"]
};

// ===== TYPE ALIASES vs INTERFACES =====

// Interface approach
interface UserInterface {
    id: number;
    name: string;
    email: string;
}

// Type alias approach
type UserType = {
    id: number;
    name: string;
    email: string;
};

// Both can be used similarly
let userFromInterface: UserInterface = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};

let userFromType: UserType = {
    id: 2,
    name: "Bob",
    email: "bob@example.com"
};

// ===== EXTENDING TYPE ALIASES =====

type BaseEntity = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};

// Intersection with type aliases
type User = BaseEntity & {
    name: string;
    email: string;
    role: "admin" | "user";
};

type Product = BaseEntity & {
    name: string;
    price: number;
    category: string;
};

// ===== MAPPED TYPES (only possible with type aliases) =====

type ReadOnly<T> = {
    readonly [K in keyof T]: T[K];
};

type Optional<T> = {
    [K in keyof T]?: T[K];
};

type PersonBase = {
    name: string;
    age: number;
    email: string;
};

type ReadOnlyPerson = ReadOnly<PersonBase>;
type OptionalPerson = Optional<PersonBase>;

let readOnlyPerson: ReadOnlyPerson = {
    name: "John",
    age: 30,
    email: "john@example.com"
};

let optionalPerson: OptionalPerson = {
    name: "Jane"
    // age and email are optional
};

// ===== CONDITIONAL TYPES (only possible with type aliases) =====

type NonNullable<T> = T extends null | undefined ? never : T;
type StringOrNumber<T> = T extends string ? string : number;

type NotNull = NonNullable<string | null>; // string
type Result = StringOrNumber<"hello">; // string

// ===== UTILITY TYPE ALIASES =====

type ApiResponse<T> = {
    data: T;
    error?: string;
    loading: boolean;
};

type UserResponse = ApiResponse<User>;
type ProductResponse = ApiResponse<Product[]>;

// ===== WHEN TO USE TYPE ALIASES vs INTERFACES =====

// Use Type Aliases for:
// 1. Union types
type StringOrNumber = string | number;

// 2. Primitive aliases
type UserId = string;

// 3. Function types
type EventHandler = (event: Event) => void;

// 4. Complex computed types
type Keys<T> = keyof T;
type Values<T> = T[keyof T];

// Use Interfaces for:
// 1. Object shapes that might be extended
interface Extensible {
    base: string;
}

// 2. Class contracts
interface Implementable {
    method(): void;
}

class MyClass implements Implementable {
    method(): void {
        console.log("Implemented");
    }
}

// ===== EXAMPLES =====
console.log("=== Type Aliases ===");

console.log(`User ID: ${userId}, Order ID: ${orderId}`);
console.log(`Status: ${currentStatus}`);

console.log(`Point: (${myPoint.x}, ${myPoint.y})`);
console.log(`Circle center: (${myCircle.center.x}, ${myCircle.center.y}), radius: ${myCircle.radius}`);

console.log(`Uppercase: ${uppercase("hello world")}`);
console.log(`Is greater: ${isGreater(10, 5)}`);

console.log(`String container: ${stringContainer.value}, empty: ${stringContainer.isEmpty}`);
console.log(`Pair: ${numberStringPair.first} - ${numberStringPair.second}`);

console.log(`UI Config: theme=${config.theme}, size=${config.size}, events=${config.events.join(", ")}`);

console.log(`User from interface: ${userFromInterface.name}`);
console.log(`User from type: ${userFromType.name}`);

let user: User = {
    id: "user1",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Charlie",
    email: "charlie@example.com",
    role: "admin"
};

console.log(`Extended user: ${user.name} (${user.role})`);

console.log(`ReadOnly person: ${readOnlyPerson.name}`);
console.log(`Optional person: ${optionalPerson.name}`);

// Demonstrating the difference in extensibility
// Interfaces can be reopened (declaration merging)
interface Window {
    customProperty: string;
}

// This wouldn't work with type aliases
// type Window = {
//     anotherProperty: number;
// }

console.log("Type aliases provide powerful type manipulation capabilities!");