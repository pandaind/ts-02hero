// 09-classes.ts - TypeScript Classes

// ===== BASIC CLASS DEFINITION =====

class Person {
    // Properties
    name: string;
    age: number;
    private id: number;
    
    // Constructor
    constructor(name: string, age: number, id: number) {
        this.name = name;
        this.age = age;
        this.id = id;
    }
    
    // Methods
    greet(): string {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
    }
    
    // Private method
    private generateUsername(): string {
        return `${this.name.toLowerCase().replace(' ', '_')}_${this.id}`;
    }
    
    // Public method that uses private method
    getUsername(): string {
        return this.generateUsername();
    }
}

// ===== PROPERTY SHORTHAND IN CONSTRUCTOR =====

class Employee {
    constructor(
        public name: string,
        public employeeId: number,
        private salary: number,
        protected department: string
    ) {
        // No need to manually assign - TypeScript does it automatically
    }
    
    getSalary(): number {
        return this.salary;
    }
    
    getDepartment(): string {
        return this.department;
    }
    
    getEmployeeInfo(): string {
        return `${this.name} (ID: ${this.employeeId}) works in ${this.department}`;
    }
}

// ===== STATIC PROPERTIES AND METHODS =====

class MathUtils {
    static readonly PI: number = 3.14159;
    private static instanceCount: number = 0;
    
    constructor() {
        MathUtils.instanceCount++;
    }
    
    static calculateCircleArea(radius: number): number {
        return MathUtils.PI * radius * radius;
    }
    
    static getInstanceCount(): number {
        return MathUtils.instanceCount;
    }
    
    // Instance method
    randomBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// ===== GETTERS AND SETTERS =====

class Temperature {
    private _celsius: number = 0;
    
    get celsius(): number {
        return this._celsius;
    }
    
    set celsius(value: number) {
        if (value < -273.15) {
            throw new Error("Temperature below absolute zero is not possible");
        }
        this._celsius = value;
    }
    
    get fahrenheit(): number {
        return (this._celsius * 9/5) + 32;
    }
    
    set fahrenheit(value: number) {
        this.celsius = (value - 32) * 5/9;
    }
    
    get kelvin(): number {
        return this._celsius + 273.15;
    }
}

// ===== READONLY PROPERTIES =====

class Book {
    readonly isbn: string;
    readonly publishedDate: Date;
    public title: string;
    private _rating: number = 0;
    
    constructor(isbn: string, title: string, publishedDate: Date) {
        this.isbn = isbn;
        this.title = title;
        this.publishedDate = publishedDate;
    }
    
    get rating(): number {
        return this._rating;
    }
    
    set rating(value: number) {
        if (value >= 0 && value <= 5) {
            this._rating = value;
        } else {
            throw new Error("Rating must be between 0 and 5");
        }
    }
}

// ===== ABSTRACT CLASSES =====

abstract class Vehicle {
    protected brand: string;
    protected model: string;
    
    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }
    
    // Concrete method
    getInfo(): string {
        return `${this.brand} ${this.model}`;
    }
    
    // Abstract method - must be implemented by subclasses
    abstract start(): void;
    abstract stop(): void;
    abstract getMaxSpeed(): number;
}

class Car extends Vehicle {
    private engineSize: number;
    
    constructor(brand: string, model: string, engineSize: number) {
        super(brand, model);
        this.engineSize = engineSize;
    }
    
    start(): void {
        console.log(`${this.getInfo()} engine started`);
    }
    
    stop(): void {
        console.log(`${this.getInfo()} engine stopped`);
    }
    
    getMaxSpeed(): number {
        return this.engineSize * 30; // Simplified calculation
    }
}

// ===== IMPLEMENTING INTERFACES =====

interface Flyable {
    altitude: number;
    fly(): void;
    land(): void;
}

interface Swimmable {
    depth: number;
    swim(): void;
    surface(): void;
}

class Duck implements Flyable, Swimmable {
    altitude: number = 0;
    depth: number = 0;
    
    constructor(private name: string) {}
    
    fly(): void {
        this.altitude = 100;
        console.log(`${this.name} is flying at ${this.altitude} feet`);
    }
    
    land(): void {
        this.altitude = 0;
        console.log(`${this.name} has landed`);
    }
    
    swim(): void {
        this.depth = 5;
        console.log(`${this.name} is swimming at ${this.depth} feet deep`);
    }
    
    surface(): void {
        this.depth = 0;
        console.log(`${this.name} has surfaced`);
    }
    
    quack(): void {
        console.log(`${this.name} says quack!`);
    }
}

// ===== METHOD OVERRIDING =====

class Animal {
    constructor(protected name: string) {}
    
    makeSound(): string {
        return `${this.name} makes a sound`;
    }
    
    move(): string {
        return `${this.name} moves`;
    }
}

class Dog extends Animal {
    constructor(name: string, private breed: string) {
        super(name);
    }
    
    // Override parent method
    makeSound(): string {
        return `${this.name} barks`;
    }
    
    // Override parent method
    move(): string {
        return `${this.name} runs on four legs`;
    }
    
    // Additional method specific to Dog
    wagTail(): string {
        return `${this.name} wags its tail`;
    }
    
    getBreed(): string {
        return this.breed;
    }
}

// ===== EXAMPLES =====
console.log("=== Classes ===");

let person = new Person("Alice Johnson", 25, 12345);
console.log(person.greet());
console.log(`Username: ${person.getUsername()}`);

let employee = new Employee("Bob Smith", 67890, 75000, "Engineering");
console.log(employee.getEmployeeInfo());
console.log(`Salary: $${employee.getSalary()}`);

// Static methods and properties
console.log(`PI value: ${MathUtils.PI}`);
console.log(`Circle area: ${MathUtils.calculateCircleArea(5)}`);

let math1 = new MathUtils();
let math2 = new MathUtils();
console.log(`Instance count: ${MathUtils.getInstanceCount()}`);
console.log(`Random number: ${math1.randomBetween(1, 10)}`);

// Getters and setters
let temp = new Temperature();
temp.celsius = 25;
console.log(`Temperature: ${temp.celsius}°C, ${temp.fahrenheit}°F, ${temp.kelvin}K`);

temp.fahrenheit = 86;
console.log(`Temperature: ${temp.celsius}°C, ${temp.fahrenheit}°F, ${temp.kelvin}K`);

// Readonly properties
let book = new Book("978-0123456789", "TypeScript Guide", new Date("2023-01-01"));
console.log(`Book: ${book.title}, ISBN: ${book.isbn}`);
book.rating = 4.5;
console.log(`Rating: ${book.rating}`);
// book.isbn = "new-isbn"; // Error: Cannot assign to readonly property

// Abstract classes and inheritance
let car = new Car("Toyota", "Camry", 2.5);
console.log(car.getInfo());
car.start();
console.log(`Max speed: ${car.getMaxSpeed()} mph`);
car.stop();

// Implementing interfaces
let duck = new Duck("Donald");
duck.quack();
duck.fly();
duck.swim();
duck.land();
duck.surface();

// Method overriding
let animal = new Animal("Generic Animal");
let dog = new Dog("Buddy", "Golden Retriever");

console.log(animal.makeSound());
console.log(animal.move());

console.log(dog.makeSound());
console.log(dog.move());
console.log(dog.wagTail());
console.log(`Breed: ${dog.getBreed()}`);

// Polymorphism example
function makeAnimalSound(animal: Animal): void {
    console.log(animal.makeSound());
}

makeAnimalSound(animal);
makeAnimalSound(dog); // Calls overridden method

// Real-world example: User management system
class User {
    private static nextId: number = 1;
    
    constructor(
        public readonly id: number = User.nextId++,
        private _username: string,
        private _email: string,
        public isActive: boolean = true
    ) {}
    
    get username(): string {
        return this._username;
    }
    
    set username(value: string) {
        if (value.length < 3) {
            throw new Error("Username must be at least 3 characters");
        }
        this._username = value;
    }
    
    get email(): string {
        return this._email;
    }
    
    set email(value: string) {
        if (!value.includes('@')) {
            throw new Error("Invalid email format");
        }
        this._email = value;
    }
    
    deactivate(): void {
        this.isActive = false;
        console.log(`User ${this.username} has been deactivated`);
    }
    
    activate(): void {
        this.isActive = true;
        console.log(`User ${this.username} has been activated`);
    }
}

let user1 = new User(undefined, "alice123", "alice@example.com");
let user2 = new User(undefined, "bob456", "bob@example.com");

console.log(`Created users: ${user1.username} (ID: ${user1.id}), ${user2.username} (ID: ${user2.id})`);
user1.deactivate();
user1.activate();