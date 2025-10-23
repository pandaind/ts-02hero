// 02-functions.ts - TypeScript Functions

// ===== BASIC FUNCTION TYPES =====

// Function with typed parameters and return type
function add(a: number, b: number): number {
    return a + b;
}

// Function with no return value
function greet(name: string): void {
    console.log(`Hello, ${name}!`);
}

// ===== OPTIONAL PARAMETERS =====
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return `${firstName} ${lastName}`;
    }
    return firstName;
}

// ===== DEFAULT PARAMETERS =====
function createGreeting(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

// ===== REST PARAMETERS =====
function sumNumbers(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// ===== FUNCTION EXPRESSIONS =====
const multiply = function(x: number, y: number): number {
    return x * y;
};

// Arrow functions
const divideNumbers = (x: number, y: number): number => x / y;

// ===== FUNCTION TYPE ANNOTATIONS =====
let mathOperation: (x: number, y: number) => number;

mathOperation = add;
mathOperation = multiply;

// ===== CALLBACK FUNCTIONS =====
function processArray(arr: number[], callback: (item: number) => number): number[] {
    return arr.map(callback);
}

const double = (x: number): number => x * 2;

// ===== FUNCTION OVERLOADS =====
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
    return a + b;
}

// ===== GENERIC FUNCTIONS =====
function identityFunction<T>(arg: T): T {
    return arg;
}

// ===== EXAMPLES =====
console.log("=== Functions ===");

console.log(`Add: ${add(5, 3)}`);
greet("TypeScript");

console.log(`Build name: ${buildName("John")}`);
console.log(`Build full name: ${buildName("John", "Doe")}`);

console.log(`Default greeting: ${createGreeting("Alice")}`);
console.log(`Custom greeting: ${createGreeting("Bob", "Hi")}`);

console.log(`Sum of numbers: ${sumNumbers(1, 2, 3, 4, 5)}`);

console.log(`Multiply: ${multiply(4, 5)}`);
console.log(`Divide: ${divideNumbers(10, 2)}`);

const numbersArray = [1, 2, 3, 4, 5];
const doubledArray = processArray(numbersArray, double);
console.log(`Doubled numbers: ${doubledArray}`);

console.log(`Combine strings: ${combine("Hello", " World")}`);
console.log(`Combine numbers: ${combine(10, 20)}`);

console.log(`Identity string: ${identityFunction("Hello")}`);
console.log(`Identity number: ${identityFunction(42)}`);