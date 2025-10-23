// 05-union-literal.ts - Union Types and Literal Types

// ===== UNION TYPES =====

// Basic union types
let value: string | number;
value = "Hello";
value = 42;

// Function with union parameter
function formatValue(input: string | number): string {
    if (typeof input === "string") {
        return input.toUpperCase();
    } else {
        return input.toFixed(2);
    }
}

// Union with multiple types
let status: "loading" | "success" | "error" | null = null;

// Array with union types
let mixedData: (string | number | boolean)[] = ["hello", 42, true, "world", 7];

// ===== LITERAL TYPES =====

// String literal types
type Theme = "light" | "dark" | "auto";
let currentTheme: Theme = "dark";

// Number literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 4;

// Boolean literal type (less common)
let isTrue: true = true;

// ===== COMBINING UNIONS AND LITERALS =====

type Size = "small" | "medium" | "large";
type Color = "red" | "green" | "blue";

interface Product {
    name: string;
    size: Size;
    color: Color;
    price: number;
}

let shirt: Product = {
    name: "T-Shirt",
    size: "medium",
    color: "blue",
    price: 25.99
};

// ===== DISCRIMINATED UNIONS =====

type LoadingState = {
    status: "loading";
    progress: number;
};

type SuccessState = {
    status: "success";
    data: string[];
};

type ErrorState = {
    status: "error";
    message: string;
};

type ApiState = LoadingState | SuccessState | ErrorState;

function handleApiState(state: ApiState): void {
    switch (state.status) {
        case "loading":
            console.log(`Loading... ${state.progress}%`);
            break;
        case "success":
            console.log(`Success! Data: ${state.data.join(", ")}`);
            break;
        case "error":
            console.log(`Error: ${state.message}`);
            break;
        default:
            // TypeScript ensures all cases are handled
            const exhaustiveCheck: never = state;
            break;
    }
}

// ===== TYPE GUARDS =====

// Type guard function
function isString(value: string | number): value is string {
    return typeof value === "string";
}

// Using type guards
function processValue(input: string | number): string {
    if (isString(input)) {
        // TypeScript knows input is string here
        return `String: ${input.toUpperCase()}`;
    } else {
        // TypeScript knows input is number here
        return `Number: ${input.toFixed(2)}`;
    }
}

// ===== NULLABLE TYPES =====

// Optional vs nullable
let optionalString: string | undefined = undefined;
let nullableString: string | null = null;
let maybeString: string | null | undefined;

// Function with nullable return
function findUser(id: number): { name: string; email: string } | null {
    if (id === 1) {
        return { name: "John Doe", email: "john@example.com" };
    }
    return null;
}

// ===== INTERSECTION TYPES =====

type Person = {
    name: string;
    age: number;
};

type Employee = {
    employeeId: number;
    department: string;
};

// Intersection type combines both types
type EmployeePerson = Person & Employee;

let worker: EmployeePerson = {
    name: "Alice Smith",
    age: 30,
    employeeId: 12345,
    department: "Engineering"
};

// ===== EXAMPLES =====
console.log("=== Union and Literal Types ===");

console.log(`Format string: ${formatValue("hello world")}`);
console.log(`Format number: ${formatValue(123.456)}`);

status = "loading";
console.log(`Current status: ${status}`);

console.log(`Current theme: ${currentTheme}`);
console.log(`Dice roll: ${roll}`);

console.log(`Product: ${shirt.name} - ${shirt.size} ${shirt.color} shirt ($${shirt.price})`);

// Demonstrating discriminated unions
const loadingState: LoadingState = { status: "loading", progress: 75 };
const successState: SuccessState = { status: "success", data: ["item1", "item2", "item3"] };
const errorState: ErrorState = { status: "error", message: "Network connection failed" };

handleApiState(loadingState);
handleApiState(successState);
handleApiState(errorState);

console.log(processValue("TypeScript"));
console.log(processValue(99.99));

// Nullable type handling
const user = findUser(1);
if (user) {
    console.log(`Found user: ${user.name} (${user.email})`);
} else {
    console.log("User not found");
}

console.log(`Employee: ${worker.name}, ID: ${worker.employeeId}, Dept: ${worker.department}`);

// Advanced union example
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type APIResponse<T> = {
    method: HTTPMethod;
    status: 200 | 404 | 500;
    data?: T;
    error?: string;
};

const response: APIResponse<{ users: string[] }> = {
    method: "GET",
    status: 200,
    data: { users: ["Alice", "Bob", "Charlie"] }
};

console.log(`API ${response.method} response: ${response.status}`);
if (response.data) {
    console.log(`Users: ${response.data.users.join(", ")}`);
}