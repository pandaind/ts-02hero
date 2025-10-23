// 03-arrays-objects.ts - Arrays and Objects in TypeScript

// ===== ARRAYS =====

// Array type annotations
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// Alternative array syntax
let scores: Array<number> = [95, 87, 92];

// Mixed type arrays (union types)
let mixedArray: (string | number)[] = ["hello", 42, "world", 7];

// Array of specific length (tuple)
let coordinate: [number, number] = [10, 20];
let rgbColor: [number, number, number] = [255, 0, 128];

// ===== OBJECTS =====

// Object type annotation
let person: { name: string; age: number; isActive: boolean } = {
    name: "John Doe",
    age: 30,
    isActive: true
};

// Object with optional properties
let user: { 
    id: number; 
    username: string; 
    email?: string; 
    isAdmin?: boolean 
} = {
    id: 1,
    username: "johndoe"
};

// Object with readonly properties
let config: { 
    readonly apiUrl: string; 
    readonly version: number;
    debug: boolean;
} = {
    apiUrl: "https://api.example.com",
    version: 1,
    debug: false
};

// ===== NESTED OBJECTS =====
let employee: {
    personal: {
        firstName: string;
        lastName: string;
    };
    work: {
        position: string;
        salary: number;
    };
} = {
    personal: {
        firstName: "Jane",
        lastName: "Smith"
    },
    work: {
        position: "Developer",
        salary: 75000
    }
};

// ===== ARRAY OF OBJECTS =====
let products: { 
    id: number; 
    name: string; 
    price: number; 
    inStock: boolean 
}[] = [
    { id: 1, name: "Laptop", price: 999, inStock: true },
    { id: 2, name: "Mouse", price: 25, inStock: false },
    { id: 3, name: "Keyboard", price: 75, inStock: true }
];

// ===== OBJECT METHODS =====
let calculator = {
    add: (a: number, b: number): number => a + b,
    multiply: function(a: number, b: number): number {
        return a * b;
    }
};

// ===== DESTRUCTURING WITH TYPES =====
function processUser({ name, age }: { name: string; age: number }): string {
    return `User ${name} is ${age} years old`;
}

// Array destructuring
let [first, second, ...rest]: number[] = [1, 2, 3, 4, 5];

// ===== INDEX SIGNATURES =====
let dictionary: { [key: string]: string } = {
    "hello": "hola",
    "goodbye": "adiós",
    "thank you": "gracias"
};

// ===== EXAMPLES =====
console.log("=== Arrays and Objects ===");

console.log(`Numbers: ${numbers}`);
console.log(`First name: ${names[0]}`);
console.log(`Mixed array: ${mixedArray}`);

console.log(`Coordinate: (${coordinate[0]}, ${coordinate[1]})`);
console.log(`RGB Color: rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`);

console.log(`Person: ${person.name}, Age: ${person.age}`);
console.log(`User: ${user.username}, ID: ${user.id}`);

console.log(`Employee: ${employee.personal.firstName} ${employee.personal.lastName}`);
console.log(`Position: ${employee.work.position}`);

console.log("Products:");
products.forEach(product => {
    console.log(`- ${product.name}: $${product.price} (${product.inStock ? 'In Stock' : 'Out of Stock'})`);
});

console.log(`Calculator - Add: ${calculator.add(5, 3)}`);
console.log(`Calculator - Multiply: ${calculator.multiply(4, 6)}`);

console.log(processUser({ name: "Alice", age: 28 }));

console.log(`Destructured - First: ${first}, Second: ${second}, Rest: ${rest}`);

console.log(`Dictionary - Hello: ${dictionary["hello"]}`);

// Array methods with proper typing
const evenNumbers = numbers.filter((num: number) => num % 2 === 0);
const doubled = numbers.map((num: number) => num * 2);

console.log(`Even numbers: ${evenNumbers}`);
console.log(`Doubled numbers: ${doubled}`);