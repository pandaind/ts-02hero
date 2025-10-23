// 15-conditional-types.ts - Conditional Types

// ===== BASIC CONDITIONAL TYPES =====

// Basic syntax: T extends U ? X : Y
type IsString<T> = T extends string ? true : false;
type IsArray<T> = T extends any[] ? true : false;
type IsFunction<T> = T extends Function ? true : false;

// Examples
type StringTest = IsString<string>;        // true
type NumberTest = IsString<number>;        // false
type ArrayTest = IsArray<number[]>;        // true
type FunctionTest = IsFunction<() => void>; // true

// ===== CONDITIONAL TYPES WITH INFER =====

// Extract return type of function
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Extract parameter types of function
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Extract array element type
type ArrayElementType<T> = T extends (infer U)[] ? U : never;

// Extract promise value type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// Examples
function exampleFunction(a: string, b: number): boolean {
    return a.length > b;
}

type ExampleReturnType = ReturnType<typeof exampleFunction>;    // boolean
type ExampleParameters = Parameters<typeof exampleFunction>;    // [string, number]
type StringArrayElement = ArrayElementType<string[]>;           // string
type PromiseValue = UnwrapPromise<Promise<number>>;            // number

// ===== NESTED CONDITIONAL TYPES =====

// Deeply unwrap nested arrays
type DeepArrayElementType<T> = T extends (infer U)[] 
    ? U extends any[] 
        ? DeepArrayElementType<U>
        : U
    : T;

// Handle multiple levels of promises
type DeepUnwrapPromise<T> = T extends Promise<infer U>
    ? U extends Promise<any>
        ? DeepUnwrapPromise<U>
        : U
    : T;

// Examples
type NestedArrayElement = DeepArrayElementType<string[][][]>;           // string
type NestedPromiseValue = DeepUnwrapPromise<Promise<Promise<number>>>; // number

// ===== DISTRIBUTIVE CONDITIONAL TYPES =====

// Conditional types distribute over union types
type ToArray<T> = T extends any ? T[] : never;

// With union type
type UnionToArrays = ToArray<string | number>; // string[] | number[]

// Non-distributive version (using tuple to prevent distribution)
type NonDistributive<T> = [T] extends [any] ? T[] : never;
type NonDistributiveResult = NonDistributive<string | number>; // (string | number)[]

// Filter union types
type Filter<T, U> = T extends U ? T : never;
type FilterStrings = Filter<string | number | boolean, string>; // string

// Exclude types from union
type Exclude<T, U> = T extends U ? never : T;
type ExcludeStrings = Exclude<string | number | boolean, string>; // number | boolean

// ===== CONDITIONAL TYPES WITH MAPPED TYPES =====

// Make properties optional based on condition
type OptionalIf<T, Condition> = {
    [P in keyof T as T[P] extends Condition ? P : never]?: T[P];
} & {
    [P in keyof T as T[P] extends Condition ? never : P]: T[P];
};

// Pick properties by type
type PickByType<T, U> = {
    [P in keyof T as T[P] extends U ? P : never]: T[P];
};

// Omit properties by type
type OmitByType<T, U> = {
    [P in keyof T as T[P] extends U ? never : P]: T[P];
};

// ===== RECURSIVE CONDITIONAL TYPES =====

// JSON serializable types
type Primitive = string | number | boolean | null;

type JSONValue = 
    | Primitive
    | JSONObject
    | JSONArray;

type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

// Convert type to JSON-serializable version
type ToJSON<T> = T extends Primitive
    ? T
    : T extends Function
    ? never
    : T extends object
    ? { [K in keyof T]: ToJSON<T[K]> }
    : never;

// ===== CONDITIONAL TYPES FOR TYPE GUARDS =====

// Check if type has specific property
type HasProperty<T, K extends PropertyKey> = T extends Record<K, any> ? true : false;

// Extract types with specific property
type WithProperty<T, K extends PropertyKey> = T extends Record<K, any> ? T : never;

// Type-safe property access
type SafePropertyAccess<T, K extends PropertyKey> = 
    T extends Record<K, infer V> ? V : undefined;

// ===== ADVANCED CONDITIONAL TYPE PATTERNS =====

// Function overload resolution
type OverloadedFunction = {
    (x: string): string;
    (x: number): number;
    (x: boolean): boolean;
};

type ResolveOverload<T, Args extends any[]> = T extends {
    (...args: Args): infer R;
} ? R : never;

// Template literal type conditions
type StartsWithPrefix<T extends string, Prefix extends string> = 
    T extends `${Prefix}${string}` ? true : false;

type RemovePrefix<T extends string, Prefix extends string> = 
    T extends `${Prefix}${infer Rest}` ? Rest : T;

// ===== UTILITY CONDITIONAL TYPES =====

// NonNullable
type NonNullable<T> = T extends null | undefined ? never : T;

// Extract constructor parameters
type ConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;

// Extract instance type from constructor
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;

// Check if type is any
type IsAny<T> = 0 extends (1 & T) ? true : false;

// Check if type is never
type IsNever<T> = [T] extends [never] ? true : false;

// Check if type is unknown
type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;

// ===== REAL-WORLD EXAMPLES =====

// API Response type based on success/failure
type ApiResult<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };

// Smart component props based on variant
type ButtonProps<T extends 'primary' | 'secondary'> = {
    variant: T;
    onClick: () => void;
} & (T extends 'primary' ? { color: string } : { outline: boolean });

// Database query builder types
type WhereCondition<T> = {
    [K in keyof T]?: T[K] extends string 
        ? string | { contains: string; startsWith: string }
        : T[K] extends number
        ? number | { gt: number; lt: number; gte: number; lte: number }
        : T[K];
};

// Event handler types
type EventMap = {
    click: { x: number; y: number };
    keypress: { key: string; ctrl: boolean };
    resize: { width: number; height: number };
};

type EventHandler<T extends keyof EventMap> = (event: EventMap[T]) => void;

// ===== EXAMPLES =====
console.log("=== Conditional Types ===");

// Basic conditional types
function demonstrateConditionalTypes() {
    // Type tests (these are compile-time, but we can show the results)
    console.log("String test (should be true):", "true" as any as StringTest);
    console.log("Number test (should be false):", "false" as any as NumberTest);
    console.log("Array test (should be true):", "true" as any as ArrayTest);
    console.log("Function test (should be true):", "true" as any as FunctionTest);
}

demonstrateConditionalTypes();

// Function type extraction
function testFunction(name: string, age: number, active: boolean): string {
    return `${name} is ${age} years old and ${active ? 'active' : 'inactive'}`;
}

type TestReturnType = ReturnType<typeof testFunction>;     // string
type TestParams = Parameters<typeof testFunction>;         // [string, number, boolean]

console.log("Function result:", testFunction("Alice", 30, true));

// Promise unwrapping
async function createPromise(): Promise<string> {
    return "Hello from Promise";
}

type PromiseType = ReturnType<typeof createPromise>;      // Promise<string>
type UnwrappedType = UnwrapPromise<PromiseType>;          // string

console.log("Promise value:", await createPromise());

// Array element extraction
const stringArray: string[] = ["a", "b", "c"];
const numberArray: number[] = [1, 2, 3];
const nestedArray: string[][][] = [[["nested"]]];

type StringElement = ArrayElementType<typeof stringArray>;    // string
type NumberElement = ArrayElementType<typeof numberArray>;    // number
type NestedElement = DeepArrayElementType<typeof nestedArray>; // string

console.log("String array:", stringArray);
console.log("Nested array element:", nestedArray[0][0][0]);

// Union type filtering
type StringsOnly = Filter<string | number | boolean | null, string>; // string
type WithoutStrings = Exclude<string | number | boolean, string>;    // number | boolean

console.log("Demonstrating union filtering (compile-time feature)");

// Conditional types with objects
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    preferences: {
        theme: string;
        notifications: boolean;
    };
}

type StringProperties = PickByType<User, string>;    // { name: string; email: string }
type NonStringProperties = OmitByType<User, string>; // { id: number; isActive: boolean; preferences: ... }

const userStringProps: StringProperties = {
    name: "Alice",
    email: "alice@example.com"
};

console.log("User string properties:", userStringProps);

// JSON serialization
interface ComplexObject {
    name: string;
    calculate: (x: number) => number;
    data: {
        values: number[];
        callback: () => void;
        metadata: {
            version: string;
            timestamp: Date;
        };
    };
}

type SerializableObject = ToJSON<ComplexObject>;
// Result: { name: string; data: { values: number[]; metadata: { version: string; timestamp: Date } } }

const serializable = {
    name: "Test",
    data: {
        values: [1, 2, 3],
        metadata: {
            version: "1.0",
            timestamp: new Date()
        }
    }
} satisfies SerializableObject;

console.log("Serializable object:", serializable);

// Property existence checking
type UserHasName = HasProperty<User, 'name'>;        // true
type UserHasAge = HasProperty<User, 'age'>;          // false

console.log("Type checking results (compile-time)");

// Template literal conditions
type StartsWithGet = StartsWithPrefix<"getValue", "get">;        // true
type StartsWithSet = StartsWithPrefix<"getValue", "set">;        // false
type WithoutGetPrefix = RemovePrefix<"getValue", "get">;         // "Value"

console.log("Template literal type results (compile-time)");

// API Result example
function fetchUser(id: string): ApiResult<User> {
    if (id === "1") {
        return {
            success: true,
            data: {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                isActive: true,
                preferences: {
                    theme: "dark",
                    notifications: true
                }
            }
        };
    } else {
        return {
            success: false,
            error: new Error("User not found")
        };
    }
}

const result = fetchUser("1");
if (result.success) {
    console.log("Fetched user:", result.data.name);
} else {
    console.log("Error:", result.error.message);
}

// Smart component props
function renderButton<T extends 'primary' | 'secondary'>(props: ButtonProps<T>) {
    console.log(`Rendering ${props.variant} button`);
    if (props.variant === 'primary') {
        // TypeScript knows props has 'color' property here
        console.log(`Primary button color: ${(props as any).color}`);
    } else {
        // TypeScript knows props has 'outline' property here
        console.log(`Secondary button outline: ${(props as any).outline}`);
    }
}

renderButton({
    variant: 'primary',
    color: 'blue',
    onClick: () => console.log('Primary clicked')
});

renderButton({
    variant: 'secondary',
    outline: true,
    onClick: () => console.log('Secondary clicked')
});

// Database query conditions
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}

type ProductWhere = WhereCondition<Product>;

const productQuery: ProductWhere = {
    name: { contains: "laptop" },
    price: { gte: 100, lte: 1000 },
    category: "electronics",
    inStock: true
};

console.log("Product query:", productQuery);

// Event handlers
const clickHandler: EventHandler<'click'> = (event) => {
    console.log(`Clicked at: ${event.x}, ${event.y}`);
};

const keypressHandler: EventHandler<'keypress'> = (event) => {
    console.log(`Key pressed: ${event.key}, Ctrl: ${event.ctrl}`);
};

clickHandler({ x: 100, y: 200 });
keypressHandler({ key: 'Enter', ctrl: false });

// Utility type examples
type NonNullString = NonNullable<string | null | undefined>; // string

class ExampleClass {
    constructor(public name: string, public value: number) {}
    
    method(): void {
        console.log(`${this.name}: ${this.value}`);
    }
}

type ExampleConstructorParams = ConstructorParameters<typeof ExampleClass>; // [string, number]
type ExampleInstance = InstanceType<typeof ExampleClass>;                   // ExampleClass

const instance = new ExampleClass("test", 42);
instance.method();

console.log("Conditional types demonstration complete!");