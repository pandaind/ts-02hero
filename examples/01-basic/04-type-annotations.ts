// 04-type-annotations.ts - Type Annotations and Inference

// ===== TYPE INFERENCE vs EXPLICIT ANNOTATIONS =====

// Type inference (TypeScript automatically determines the type)
let inferredString = "Hello TypeScript"; // string
let inferredNumber = 42; // number
let inferredBoolean = true; // boolean

// Explicit type annotations
let explicitString: string = "Hello World";
let explicitNumber: number = 100;
let explicitBoolean: boolean = false;

// ===== WHEN TO USE EXPLICIT ANNOTATIONS =====

// 1. When declaring variables without initialization
let futureString: string;
let futureNumber: number;

// Later assignment
futureString = "Assigned later";
futureNumber = 200;

// 2. When function parameters need types
function processData(data: string, count: number): void {
    console.log(`Processing ${data} ${count} times`);
}

// 3. When return type isn't obvious
function getRandomValue(): number | string {
    return Math.random() > 0.5 ? "random" : 42;
}

// ===== COMPLEX TYPE ANNOTATIONS =====

// Object type annotation
let userProfile: {
    id: number;
    name: string;
    preferences: {
        theme: string;
        notifications: boolean;
    };
} = {
    id: 1,
    name: "John",
    preferences: {
        theme: "dark",
        notifications: true
    }
};

// Function type annotation
let processCallback: (message: string) => void;
processCallback = (msg) => console.log(`Callback: ${msg}`);

// Array type annotations
let stringArray: string[] = ["a", "b", "c"];
let numberArray: number[] = [1, 2, 3];
let mixedArray: (string | number)[] = ["hello", 1, "world", 2];

// ===== TYPE ASSERTIONS =====

// Sometimes you know more about a type than TypeScript
let someValue: unknown = "This is a string";

// Type assertion (angle bracket syntax)
let strLength1: number = (<string>someValue).length;

// Type assertion (as syntax - preferred)
let strLength2: number = (someValue as string).length;

// ===== CONST ASSERTIONS =====

// Regular array inference
let mutableArray = ["a", "b", "c"]; // string[]

// Const assertion for readonly array
let immutableArray = ["a", "b", "c"] as const; // readonly ["a", "b", "c"]

// Const assertion for objects
let config = {
    apiUrl: "https://api.example.com",
    version: 1
} as const; // readonly properties

// ===== TYPE WIDENING AND NARROWING =====

// Type widening
let x = null; // any (in older TS) or null
let y = undefined; // any (in older TS) or undefined

// Type narrowing with conditions
function example(value: string | number) {
    if (typeof value === "string") {
        // TypeScript knows value is string here
        console.log(value.toUpperCase());
    } else {
        // TypeScript knows value is number here
        console.log(value.toFixed(2));
    }
}

// ===== EXAMPLES =====
console.log("=== Type Annotations and Inference ===");

console.log(`Inferred string: ${inferredString} (type: ${typeof inferredString})`);
console.log(`Inferred number: ${inferredNumber} (type: ${typeof inferredNumber})`);
console.log(`Inferred boolean: ${inferredBoolean} (type: ${typeof inferredBoolean})`);

console.log(`Explicit string: ${explicitString}`);
console.log(`Future values: ${futureString}, ${futureNumber}`);

processData("sample data", 3);

const randomValue = getRandomValue();
console.log(`Random value: ${randomValue} (type: ${typeof randomValue})`);

console.log(`User: ${userProfile.name}, Theme: ${userProfile.preferences.theme}`);

processCallback("Hello from callback");

console.log(`String array: ${stringArray}`);
console.log(`Mixed array: ${mixedArray}`);

console.log(`String length (assertion): ${strLength1}, ${strLength2}`);

console.log(`Mutable array: ${mutableArray}`);
console.log(`Immutable array: ${immutableArray}`);

example("hello world");
example(123.456);

// Demonstrating type checking benefits
function safeAccess(obj: { name?: string }): string {
    // TypeScript ensures we handle undefined case
    return obj.name || "Unknown";
}

console.log(`Safe access: ${safeAccess({ name: "Alice" })}`);
console.log(`Safe access: ${safeAccess({})}`);