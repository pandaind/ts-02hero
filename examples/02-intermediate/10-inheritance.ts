// 10-inheritance.ts - Class Inheritance in TypeScript

// ===== BASIC INHERITANCE =====

class Animal {
    protected name: string;
    protected species: string;
    
    constructor(name: string, species: string) {
        this.name = name;
        this.species = species;
    }
    
    makeSound(): string {
        return `${this.name} makes a generic animal sound`;
    }
    
    move(): string {
        return `${this.name} moves`;
    }
    
    getInfo(): string {
        return `${this.name} is a ${this.species}`;
    }
}

// Extending the base class
class Dog extends Animal {
    private breed: string;
    
    constructor(name: string, breed: string) {
        super(name, "Canine"); // Call parent constructor
        this.breed = breed;
    }
    
    // Override parent method
    makeSound(): string {
        return `${this.name} barks: Woof!`;
    }
    
    // Override parent method
    move(): string {
        return `${this.name} runs on four legs`;
    }
    
    // New method specific to Dog
    fetch(): string {
        return `${this.name} fetches the ball`;
    }
    
    getBreed(): string {
        return this.breed;
    }
    
    // Override getInfo to include breed
    getInfo(): string {
        return `${super.getInfo()} - Breed: ${this.breed}`;
    }
}

class Cat extends Animal {
    private isIndoor: boolean;
    
    constructor(name: string, isIndoor: boolean = true) {
        super(name, "Feline");
        this.isIndoor = isIndoor;
    }
    
    makeSound(): string {
        return `${this.name} meows: Meow!`;
    }
    
    move(): string {
        return `${this.name} prowls silently`;
    }
    
    climb(): string {
        return `${this.name} climbs up high`;
    }
    
    getInfo(): string {
        return `${super.getInfo()} - ${this.isIndoor ? 'Indoor' : 'Outdoor'} cat`;
    }
}

// ===== MULTI-LEVEL INHERITANCE =====

class Mammal extends Animal {
    protected bodyTemperature: number = 98.6;
    
    constructor(name: string, species: string) {
        super(name, species);
    }
    
    regulateTemperature(): string {
        return `${this.name} maintains body temperature at ${this.bodyTemperature}°F`;
    }
    
    giveBirth(): string {
        return `${this.name} gives birth to live young`;
    }
}

class Primate extends Mammal {
    protected intelligence: number;
    
    constructor(name: string, species: string, intelligence: number) {
        super(name, species);
        this.intelligence = intelligence;
    }
    
    useTools(): string {
        return `${this.name} uses tools with intelligence level ${this.intelligence}`;
    }
    
    socialize(): string {
        return `${this.name} lives in social groups`;
    }
}

class Human extends Primate {
    private occupation: string;
    
    constructor(name: string, occupation: string) {
        super(name, "Homo sapiens", 10); // Max intelligence
        this.occupation = occupation;
    }
    
    makeSound(): string {
        return `${this.name} speaks`;
    }
    
    move(): string {
        return `${this.name} walks upright on two legs`;
    }
    
    work(): string {
        return `${this.name} works as a ${this.occupation}`;
    }
    
    getInfo(): string {
        return `${super.getInfo()} - Occupation: ${this.occupation}`;
    }
}

// ===== PROTECTED MEMBERS =====

class Vehicle {
    protected brand: string;
    protected model: string;
    protected year: number;
    private vin: string; // Private - only accessible within this class
    
    constructor(brand: string, model: string, year: number, vin: string) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.vin = vin;
    }
    
    getBasicInfo(): string {
        return `${this.year} ${this.brand} ${this.model}`;
    }
    
    protected getVin(): string {
        return this.vin;
    }
    
    start(): string {
        return `${this.getBasicInfo()} is starting`;
    }
}

class Car extends Vehicle {
    private numDoors: number;
    private fuelType: string;
    
    constructor(brand: string, model: string, year: number, vin: string, 
                numDoors: number, fuelType: string) {
        super(brand, model, year, vin);
        this.numDoors = numDoors;
        this.fuelType = fuelType;
    }
    
    getDetailedInfo(): string {
        // Can access protected members from parent
        return `${this.brand} ${this.model} (${this.year}) - ${this.numDoors} doors, ${this.fuelType} engine`;
    }
    
    // Can access protected method from parent
    getVehicleVin(): string {
        return `VIN: ${this.getVin()}`;
    }
    
    start(): string {
        return `${super.start()} - Car engine running`;
    }
}

class Motorcycle extends Vehicle {
    private engineSize: number;
    
    constructor(brand: string, model: string, year: number, vin: string, engineSize: number) {
        super(brand, model, year, vin);
        this.engineSize = engineSize;
    }
    
    getDetailedInfo(): string {
        return `${this.brand} ${this.model} (${this.year}) - ${this.engineSize}cc engine`;
    }
    
    start(): string {
        return `${super.start()} - Motorcycle engine roaring`;
    }
    
    wheelie(): string {
        return `${this.getBasicInfo()} does a wheelie!`;
    }
}

// ===== ABSTRACT CLASSES WITH INHERITANCE =====

abstract class Shape {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    // Concrete method
    getName(): string {
        return this.name;
    }
    
    // Abstract methods - must be implemented by subclasses
    abstract getArea(): number;
    abstract getPerimeter(): number;
    
    // Method that uses abstract methods
    getDescription(): string {
        return `${this.name}: Area = ${this.getArea()}, Perimeter = ${this.getPerimeter()}`;
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super("Rectangle");
    }
    
    getArea(): number {
        return this.width * this.height;
    }
    
    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
    
    getDimensions(): string {
        return `${this.width} x ${this.height}`;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super("Circle");
    }
    
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
    
    getRadius(): number {
        return this.radius;
    }
}

// ===== METHOD CHAINING WITH INHERITANCE =====

class FluentCalculator {
    protected value: number = 0;
    
    setValue(value: number): this {
        this.value = value;
        return this;
    }
    
    add(value: number): this {
        this.value += value;
        return this;
    }
    
    subtract(value: number): this {
        this.value -= value;
        return this;
    }
    
    getValue(): number {
        return this.value;
    }
}

class AdvancedCalculator extends FluentCalculator {
    multiply(value: number): this {
        this.value *= value;
        return this;
    }
    
    divide(value: number): this {
        if (value !== 0) {
            this.value /= value;
        }
        return this;
    }
    
    power(exponent: number): this {
        this.value = Math.pow(this.value, exponent);
        return this;
    }
    
    sqrt(): this {
        this.value = Math.sqrt(this.value);
        return this;
    }
}

// ===== EXAMPLES =====
console.log("=== Class Inheritance ===");

// Basic inheritance
let dog = new Dog("Buddy", "Golden Retriever");
let cat = new Cat("Whiskers", true);

console.log(dog.getInfo());
console.log(dog.makeSound());
console.log(dog.move());
console.log(dog.fetch());

console.log(cat.getInfo());
console.log(cat.makeSound());
console.log(cat.move());
console.log(cat.climb());

// Multi-level inheritance
let human = new Human("Alice", "Software Engineer");
console.log(human.getInfo());
console.log(human.makeSound());
console.log(human.move());
console.log(human.useTools());
console.log(human.work());
console.log(human.regulateTemperature());

// Protected members
let car = new Car("Toyota", "Camry", 2023, "1234567890", 4, "Gasoline");
let motorcycle = new Motorcycle("Honda", "CBR600", 2023, "0987654321", 600);

console.log(car.getDetailedInfo());
console.log(car.getVehicleVin());
console.log(car.start());

console.log(motorcycle.getDetailedInfo());
console.log(motorcycle.start());
console.log(motorcycle.wheelie());

// Abstract classes
let rectangle = new Rectangle(5, 3);
let circle = new Circle(4);

console.log(rectangle.getDescription());
console.log(`Rectangle dimensions: ${rectangle.getDimensions()}`);

console.log(circle.getDescription());
console.log(`Circle radius: ${circle.getRadius()}`);

// Method chaining
let calc = new AdvancedCalculator();
let result = calc
    .setValue(10)
    .add(5)
    .multiply(2)
    .subtract(5)
    .divide(5)
    .power(2)
    .sqrt()
    .getValue();

console.log(`Calculation result: ${result}`);

// Polymorphism demonstration
function processAnimals(animals: Animal[]): void {
    animals.forEach(animal => {
        console.log(animal.getInfo());
        console.log(animal.makeSound());
        console.log(animal.move());
        console.log("---");
    });
}

let animals: Animal[] = [dog, cat, human];
processAnimals(animals);

// Shape processing
function processShapes(shapes: Shape[]): void {
    shapes.forEach(shape => {
        console.log(shape.getDescription());
    });
}

let shapes: Shape[] = [rectangle, circle];
processShapes(shapes);

// Real-world example: Employee hierarchy
abstract class Employee {
    constructor(
        protected name: string,
        protected employeeId: number,
        protected baseSalary: number
    ) {}
    
    abstract calculatePay(): number;
    abstract getRole(): string;
    
    getInfo(): string {
        return `${this.name} (ID: ${this.employeeId}) - ${this.getRole()}`;
    }
    
    getBaseSalary(): number {
        return this.baseSalary;
    }
}

class Developer extends Employee {
    constructor(name: string, employeeId: number, baseSalary: number, 
                private programmingLanguages: string[]) {
        super(name, employeeId, baseSalary);
    }
    
    calculatePay(): number {
        // Developers get bonus for each programming language
        return this.baseSalary + (this.programmingLanguages.length * 5000);
    }
    
    getRole(): string {
        return "Software Developer";
    }
    
    getSkills(): string {
        return `Skills: ${this.programmingLanguages.join(", ")}`;
    }
}

class Manager extends Employee {
    constructor(name: string, employeeId: number, baseSalary: number, 
                private teamSize: number) {
        super(name, employeeId, baseSalary);
    }
    
    calculatePay(): number {
        // Managers get bonus based on team size
        return this.baseSalary + (this.teamSize * 2000);
    }
    
    getRole(): string {
        return "Manager";
    }
    
    getTeamSize(): number {
        return this.teamSize;
    }
}

let developer = new Developer("John", 101, 80000, ["TypeScript", "React", "Node.js"]);
let manager = new Manager("Sarah", 201, 90000, 8);

console.log("=== Employee System ===");
console.log(developer.getInfo());
console.log(developer.getSkills());
console.log(`Annual pay: $${developer.calculatePay()}`);

console.log(manager.getInfo());
console.log(`Team size: ${manager.getTeamSize()}`);
console.log(`Annual pay: $${manager.calculatePay()}`);