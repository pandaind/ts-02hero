// 12-basic-generics.ts - Generic Functions and Classes

// ===== BASIC GENERIC FUNCTIONS =====

// Simple generic function
function identity<T>(arg: T): T {
    return arg;
}

// Generic function with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// Generic function with type constraints
function getLength<T extends { length: number }>(arg: T): number {
    return arg.length;
}

// Generic function with array
function getFirstElement<T>(array: T[]): T | undefined {
    return array.length > 0 ? array[0] : undefined;
}

// Generic function with multiple constraints
function processItems<T extends { id: number; name: string }>(items: T[]): string[] {
    return items.map(item => `${item.id}: ${item.name}`);
}

// ===== GENERIC INTERFACES =====

interface Container<T> {
    value: T;
    getValue(): T;
    setValue(value: T): void;
}

interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

interface Repository<T> {
    findById(id: string): T | null;
    save(entity: T): void;
    delete(id: string): boolean;
    findAll(): T[];
}

// ===== GENERIC CLASSES =====

class Box<T> {
    private contents: T;
    
    constructor(value: T) {
        this.contents = value;
    }
    
    get(): T {
        return this.contents;
    }
    
    set(value: T): void {
        this.contents = value;
    }
    
    isEmpty(): boolean {
        return this.contents === null || this.contents === undefined;
    }
}

class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items.length > 0 ? this.items[this.items.length - 1] : undefined;
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
    
    toArray(): T[] {
        return [...this.items];
    }
}

class Pair<T, U> {
    constructor(public first: T, public second: U) {}
    
    swap(): Pair<U, T> {
        return new Pair(this.second, this.first);
    }
    
    toString(): string {
        return `(${this.first}, ${this.second})`;
    }
}

// ===== GENERIC CLASS INHERITANCE =====

class Animal<T> {
    constructor(protected name: string, protected data: T) {}
    
    getName(): string {
        return this.name;
    }
    
    getData(): T {
        return this.data;
    }
}

interface DogData {
    breed: string;
    age: number;
}

class Dog extends Animal<DogData> {
    constructor(name: string, breed: string, age: number) {
        super(name, { breed, age });
    }
    
    bark(): string {
        return `${this.name} (${this.data.breed}) barks!`;
    }
    
    getAge(): number {
        return this.data.age;
    }
}

// ===== GENERIC CONSTRAINTS =====

// Constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Constraint with interface
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(`Length: ${arg.length}`);
    return arg;
}

// Multiple constraints
interface Named {
    name: string;
}

interface Aged {
    age: number;
}

function processEntity<T extends Named & Aged>(entity: T): string {
    return `${entity.name} is ${entity.age} years old`;
}

// ===== GENERIC UTILITY FUNCTIONS =====

function map<T, U>(array: T[], transform: (item: T) => U): U[] {
    return array.map(transform);
}

function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
    return array.filter(predicate);
}

function reduce<T, U>(array: T[], callback: (acc: U, current: T) => U, initialValue: U): U {
    return array.reduce(callback, initialValue);
}

// ===== GENERIC TYPE ALIASES =====

type Result<T, E = Error> = {
    success: true;
    data: T;
} | {
    success: false;
    error: E;
};

type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
};

type EventHandler<T> = (event: T) => void;

// ===== IMPLEMENTING GENERIC INTERFACES =====

class StringContainer implements Container<string> {
    constructor(public value: string) {}
    
    getValue(): string {
        return this.value;
    }
    
    setValue(value: string): void {
        this.value = value;
    }
}

class InMemoryRepository<T extends { id: string }> implements Repository<T> {
    private items: T[] = [];
    
    findById(id: string): T | null {
        return this.items.find(item => item.id === id) || null;
    }
    
    save(entity: T): void {
        const index = this.items.findIndex(item => item.id === entity.id);
        if (index >= 0) {
            this.items[index] = entity;
        } else {
            this.items.push(entity);
        }
    }
    
    delete(id: string): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index >= 0) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    
    findAll(): T[] {
        return [...this.items];
    }
}

// ===== EXAMPLES =====
console.log("=== Basic Generics ===");

// Generic functions
console.log(`Identity string: ${identity("Hello")}`);
console.log(`Identity number: ${identity(42)}`);
console.log(`Identity boolean: ${identity(true)}`);

let stringNumberPair = pair("Hello", 42);
let booleanArrayPair = pair(true, [1, 2, 3]);
console.log(`String-Number pair: ${stringNumberPair}`);
console.log(`Boolean-Array pair: ${booleanArrayPair}`);

console.log(`Array length: ${getLength([1, 2, 3, 4])}`);
console.log(`String length: ${getLength("Hello World")}`);

let numbers = [1, 2, 3, 4, 5];
let names = ["Alice", "Bob", "Charlie"];
console.log(`First number: ${getFirstElement(numbers)}`);
console.log(`First name: ${getFirstElement(names)}`);

let items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" }
];
console.log(`Processed items: ${processItems(items).join(", ")}`);

// Generic classes
let stringBox = new Box<string>("Hello World");
let numberBox = new Box<number>(42);

console.log(`String box contains: ${stringBox.get()}`);
console.log(`Number box contains: ${numberBox.get()}`);

stringBox.set("Updated String");
console.log(`Updated string box: ${stringBox.get()}`);

// Stack example
let stringStack = new Stack<string>();
stringStack.push("First");
stringStack.push("Second");
stringStack.push("Third");

console.log(`Stack size: ${stringStack.size()}`);
console.log(`Stack peek: ${stringStack.peek()}`);
console.log(`Stack pop: ${stringStack.pop()}`);
console.log(`Stack array: ${stringStack.toArray().join(", ")}`);

// Pair example
let stringNumberPairClass = new Pair<string, number>("Hello", 42);
console.log(`Original pair: ${stringNumberPairClass.toString()}`);
console.log(`Swapped pair: ${stringNumberPairClass.swap().toString()}`);

// Generic inheritance
let dog = new Dog("Buddy", "Golden Retriever", 3);
console.log(dog.bark());
console.log(`Dog age: ${dog.getAge()}`);

// Generic constraints
let person = { name: "Alice", age: 30, city: "New York" };
console.log(`Person name: ${getProperty(person, "name")}`);
console.log(`Person age: ${getProperty(person, "age")}`);

logLength("Hello World");
logLength([1, 2, 3, 4, 5]);

console.log(processEntity({ name: "John", age: 25, occupation: "Developer" }));

// Generic utility functions
let doubled = map([1, 2, 3, 4, 5], x => x * 2);
let uppercased = map(["hello", "world"], s => s.toUpperCase());
console.log(`Doubled: ${doubled}`);
console.log(`Uppercased: ${uppercased}`);

let evenNumbers = filter([1, 2, 3, 4, 5, 6], x => x % 2 === 0);
let longStrings = filter(["a", "hello", "hi", "world"], s => s.length > 2);
console.log(`Even numbers: ${evenNumbers}`);
console.log(`Long strings: ${longStrings}`);

let sum = reduce([1, 2, 3, 4, 5], (acc, curr) => acc + curr, 0);
let concatenated = reduce(["Hello", " ", "World"], (acc, curr) => acc + curr, "");
console.log(`Sum: ${sum}`);
console.log(`Concatenated: ${concatenated}`);

// Generic interfaces implementation
let container = new StringContainer("Initial Value");
console.log(`Container value: ${container.getValue()}`);
container.setValue("New Value");
console.log(`Updated container: ${container.getValue()}`);

// Repository pattern
interface User {
    id: string;
    name: string;
    email: string;
}

let userRepository = new InMemoryRepository<User>();

let user1: User = { id: "1", name: "Alice", email: "alice@example.com" };
let user2: User = { id: "2", name: "Bob", email: "bob@example.com" };

userRepository.save(user1);
userRepository.save(user2);

console.log(`All users: ${userRepository.findAll().map(u => u.name).join(", ")}`);

let foundUser = userRepository.findById("1");
console.log(`Found user: ${foundUser?.name || "Not found"}`);

userRepository.delete("2");
console.log(`Remaining users: ${userRepository.findAll().map(u => u.name).join(", ")}`);

// Result type example
function divide(a: number, b: number): Result<number> {
    if (b === 0) {
        return { success: false, error: new Error("Division by zero") };
    }
    return { success: true, data: a / b };
}

let result1 = divide(10, 2);
let result2 = divide(10, 0);

if (result1.success) {
    console.log(`Division result: ${result1.data}`);
} else {
    console.log(`Division error: ${result1.error.message}`);
}

if (result2.success) {
    console.log(`Division result: ${result2.data}`);
} else {
    console.log(`Division error: ${result2.error.message}`);
}

// Real-world example: Generic HTTP client
class HttpClient<T = any> {
    private baseUrl: string;
    
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    
    async get<R = T>(endpoint: string): Promise<ApiResponse<R>> {
        // Simulate HTTP GET request
        return {
            data: {} as R,
            status: 200,
            message: "Success"
        };
    }
    
    async post<R = T>(endpoint: string, data: Partial<T>): Promise<ApiResponse<R>> {
        // Simulate HTTP POST request
        return {
            data: data as R,
            status: 201,
            message: "Created"
        };
    }
}

let apiClient = new HttpClient<User>("https://api.example.com");
console.log("Generic HTTP client created for User type");