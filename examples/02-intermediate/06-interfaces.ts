// 06-interfaces.ts - Interface Definitions

// ===== BASIC INTERFACES =====

interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

// Using the interface
let user1: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    isActive: true
};

// ===== OPTIONAL PROPERTIES =====

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string; // Optional property
    category?: string;
}

let product1: Product = {
    id: 1,
    name: "Laptop",
    price: 999.99
};

let product2: Product = {
    id: 2,
    name: "Mouse",
    price: 25.99,
    description: "Wireless optical mouse",
    category: "Accessories"
};

// ===== READONLY PROPERTIES =====

interface Config {
    readonly apiUrl: string;
    readonly version: number;
    debug: boolean;
}

let appConfig: Config = {
    apiUrl: "https://api.example.com",
    version: 1,
    debug: false
};

// appConfig.apiUrl = "new url"; // Error: Cannot assign to readonly property

// ===== FUNCTION PROPERTIES =====

interface Calculator {
    add(a: number, b: number): number;
    subtract: (a: number, b: number) => number;
    multiply(a: number, b: number): number;
}

let calc: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: function(a, b) {
        return a * b;
    }
};

// ===== INDEX SIGNATURES =====

// String index signature
interface StringDictionary {
    [key: string]: string;
}

let translations: StringDictionary = {
    hello: "hola",
    goodbye: "adiós",
    thanks: "gracias"
};

// Number index signature
interface NumberArray {
    [index: number]: string;
}

let fruits: NumberArray = ["apple", "banana", "orange"];

// Mixed index signatures
interface MixedDictionary {
    [key: string]: string | number;
    length: number; // Specific property
}

// ===== EXTENDING INTERFACES =====

interface Animal {
    name: string;
    age: number;
}

interface Dog extends Animal {
    breed: string;
    bark(): void;
}

let myDog: Dog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever",
    bark() {
        console.log("Woof!");
    }
};

// Multiple inheritance
interface Flyable {
    fly(): void;
    maxAltitude: number;
}

interface Swimmable {
    swim(): void;
    maxDepth: number;
}

interface Duck extends Animal, Flyable, Swimmable {
    quack(): void;
}

// ===== INTERFACES FOR FUNCTIONS =====

interface SearchFunction {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunction = function(src, sub) {
    return src.indexOf(sub) !== -1;
};

// Generic function interface
interface GenericFunction<T> {
    (arg: T): T;
}

let identity: GenericFunction<string> = (arg) => arg;

// ===== INTERFACES FOR CLASSES =====

interface Drivable {
    speed: number;
    drive(): void;
    stop(): void;
}

class Car implements Drivable {
    speed: number = 0;
    
    drive(): void {
        this.speed = 60;
        console.log(`Driving at ${this.speed} mph`);
    }
    
    stop(): void {
        this.speed = 0;
        console.log("Car stopped");
    }
}

// ===== HYBRID INTERFACES =====

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = function(start: number): string {
        return `Count: ${start}`;
    } as Counter;
    
    counter.interval = 123;
    counter.reset = function() {
        console.log("Counter reset");
    };
    
    return counter;
}

// ===== EXAMPLES =====
console.log("=== Interfaces ===");

console.log(`User: ${user1.name} (${user1.email})`);
console.log(`Product 1: ${product1.name} - $${product1.price}`);
console.log(`Product 2: ${product2.name} - $${product2.price} - ${product2.description}`);

console.log(`Config: ${appConfig.apiUrl} v${appConfig.version}`);

console.log(`Addition: ${calc.add(5, 3)}`);
console.log(`Subtraction: ${calc.subtract(10, 4)}`);
console.log(`Multiplication: ${calc.multiply(7, 8)}`);

console.log(`Translation - hello: ${translations.hello}`);
console.log(`Fruit at index 1: ${fruits[1]}`);

console.log(`Dog: ${myDog.name}, ${myDog.age} years old, ${myDog.breed}`);
myDog.bark();

console.log(`Search result: ${mySearch("TypeScript", "Script")}`);
console.log(`Identity function: ${identity("Hello")}`);

let myCar = new Car();
myCar.drive();
myCar.stop();

let counter = getCounter();
console.log(counter(10));
console.log(`Counter interval: ${counter.interval}`);
counter.reset();

// Real-world example: API response interface
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
}

interface UserData {
    users: User[];
    totalCount: number;
}

let apiResponse: ApiResponse<UserData> = {
    data: {
        users: [user1],
        totalCount: 1
    },
    status: 200,
    message: "Success",
    timestamp: new Date()
};

console.log(`API Response: ${apiResponse.message}, Users: ${apiResponse.data.totalCount}`);