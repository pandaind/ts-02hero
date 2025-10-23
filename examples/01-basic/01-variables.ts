// 01-variables.ts - TypeScript Variables and Basic Types

// ===== BASIC TYPES =====

// String
let firstName: string = "John";
let lastName = "Doe"; // Type inference

// Number
let age: number = 25;
let price = 99.99; // Type inference

// Boolean
let isActive: boolean = true;
let isComplete = false; // Type inference

// ===== TYPE ANNOTATIONS =====

// Explicit type annotations
let username: string;
username = "alice123";

let count: number;
count = 42;

// ===== ANY TYPE (avoid when possible) =====
let dynamicContent: any = "Hello";
dynamicContent = 42;
dynamicContent = true;

// ===== UNKNOWN TYPE (safer alternative to any) =====
let userInput: unknown = "Hello World";
if (typeof userInput === "string") {
    console.log(userInput.toUpperCase()); // Safe to use after type check
}

// ===== VOID TYPE =====
function logMessage(message: string): void {
    console.log(message);
}

// ===== NULL and UNDEFINED =====
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// ===== NEVER TYPE =====
function throwError(message: string): never {
    throw new Error(message);
}

// ===== EXAMPLES =====
console.log("=== Variables and Basic Types ===");
console.log(`Name: ${firstName} ${lastName}`);
console.log(`Age: ${age}`);
console.log(`Active: ${isActive}`);

logMessage("TypeScript is awesome!");

// Type checking examples
console.log(`Type of firstName: ${typeof firstName}`);
console.log(`Type of age: ${typeof age}`);
console.log(`Type of isActive: ${typeof isActive}`);