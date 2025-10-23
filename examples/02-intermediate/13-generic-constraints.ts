// 13-generic-constraints.ts - Generic Constraints

// ===== BASIC GENERIC CONSTRAINTS =====

// Constraint with interface
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(`Argument has length: ${arg.length}`);
    return arg;
}

// Constraint with built-in types
function processNumber<T extends number>(value: T): T {
    console.log(`Processing number: ${value}`);
    return value;
}

// ===== KEYOF CONSTRAINTS =====

// Using keyof to constrain generic types
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
    obj[key] = value;
}

// Multiple property access
function getProperties<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key]);
}

// ===== CONDITIONAL CONSTRAINTS =====

type HasId<T> = T extends { id: any } ? T : never;

function processWithId<T>(item: HasId<T>): HasId<T> {
    console.log(`Processing item with ID: ${item.id}`);
    return item;
}

// ===== MULTIPLE CONSTRAINTS =====

interface Named {
    name: string;
}

interface Aged {
    age: number;
}

interface Identifiable {
    id: string | number;
}

// Multiple interface constraints
function processEntity<T extends Named & Aged & Identifiable>(entity: T): string {
    return `Entity ${entity.id}: ${entity.name} (${entity.age} years old)`;
}

// Constraint with union types
function processStringOrNumber<T extends string | number>(value: T): T {
    console.log(`Processing: ${value} (type: ${typeof value})`);
    return value;
}

// ===== CONSTRAINT WITH CLASS TYPES =====

class Animal {
    constructor(public name: string) {}
    
    makeSound(): string {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name);
    }
    
    makeSound(): string {
        return `${this.name} barks`;
    }
}

class Cat extends Animal {
    constructor(name: string, public color: string) {
        super(name);
    }
    
    makeSound(): string {
        return `${this.name} meows`;
    }
}

// Constraint to Animal class or its subclasses
function makeAnimalSound<T extends Animal>(animal: T): string {
    return animal.makeSound();
}

// Generic class with constructor constraint
function createAnimal<T extends new (name: string, ...args: any[]) => Animal>(
    AnimalClass: T,
    name: string,
    ...args: any[]
): InstanceType<T> {
    return new AnimalClass(name, ...args);
}

// ===== CONSTRAINT WITH FUNCTION TYPES =====

type Processor<T> = (value: T) => T;

function applyProcessor<T>(value: T, processor: Processor<T>): T {
    return processor(value);
}

// Constraint with specific function signature
function processWithCallback<T, R>(
    items: T[], 
    callback: (item: T, index: number) => R
): R[] {
    return items.map(callback);
}

// ===== CONDITIONAL TYPE CONSTRAINTS =====

type NonNullable<T> = T extends null | undefined ? never : T;

function processNonNull<T>(value: NonNullable<T>): NonNullable<T> {
    console.log(`Processing non-null value: ${value}`);
    return value;
}

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

function getFirstElement<T extends any[]>(array: T): ArrayElement<T> | undefined {
    return array.length > 0 ? array[0] : undefined;
}

// ===== MAPPED TYPE CONSTRAINTS =====

type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

function updateObject<T, K extends keyof T>(
    obj: T, 
    updates: Pick<T, K>
): T {
    return { ...obj, ...updates };
}

// ===== GENERIC CONSTRAINT WITH DEFAULT TYPES =====

interface Repository<T extends { id: string } = { id: string }> {
    findById(id: string): T | null;
    save(entity: T): void;
    delete(id: string): boolean;
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
}

// ===== RECURSIVE CONSTRAINTS =====

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach((prop) => {
        const value = (obj as any)[prop];
        if (value && typeof value === 'object') {
            deepFreeze(value);
        }
    });
    return obj as DeepReadonly<T>;
}

// ===== CONSTRAINT WITH GENERIC FUNCTIONS =====

interface Comparable<T> {
    compareTo(other: T): number;
}

function sort<T extends Comparable<T>>(items: T[]): T[] {
    return items.sort((a, b) => a.compareTo(b));
}

class Version implements Comparable<Version> {
    constructor(private major: number, private minor: number, private patch: number) {}
    
    compareTo(other: Version): number {
        if (this.major !== other.major) return this.major - other.major;
        if (this.minor !== other.minor) return this.minor - other.minor;
        return this.patch - other.patch;
    }
    
    toString(): string {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
}

// ===== EXAMPLES =====
console.log("=== Generic Constraints ===");

// Basic constraints
logLength("Hello World");           // string has length
logLength([1, 2, 3, 4, 5]);        // array has length
logLength({ length: 10, data: [] }); // object with length property

processNumber(42);
processNumber(3.14);

// Keyof constraints
const person = { name: "Alice", age: 30, city: "New York" };
console.log(`Name: ${getProperty(person, "name")}`);
console.log(`Age: ${getProperty(person, "age")}`);

setProperty(person, "age", 31);
console.log(`Updated age: ${person.age}`);

const properties = getProperties(person, ["name", "city"]);
console.log(`Properties: ${properties.join(", ")}`);

// Multiple constraints
const entity = { id: "1", name: "John Doe", age: 25 };
console.log(processEntity(entity));

processStringOrNumber("Hello");
processStringOrNumber(42);

// Class constraints
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Orange");

console.log(makeAnimalSound(dog));
console.log(makeAnimalSound(cat));

const newDog = createAnimal(Dog, "Max", "Labrador");
console.log(`Created: ${newDog.name} (${newDog.breed})`);

// Function constraints
const doubleNumber = (x: number): number => x * 2;
const result1 = applyProcessor(5, doubleNumber);
console.log(`Processed result: ${result1}`);

const numbers = [1, 2, 3, 4, 5];
const squared = processWithCallback(numbers, (x, i) => ({ value: x * x, index: i }));
console.log(`Squared with index: ${squared.map(s => `${s.value}@${s.index}`).join(", ")}`);

// Non-nullable constraint
processNonNull("Hello");
processNonNull(42);
// processNonNull(null); // Would cause TypeScript error

// Array element extraction
const stringArray = ["a", "b", "c"];
const firstString = getFirstElement(stringArray);
console.log(`First element: ${firstString}`);

const numberArray = [1, 2, 3];
const firstNumber = getFirstElement(numberArray);
console.log(`First number: ${firstNumber}`);

// Object updates
const user = { id: "1", name: "Alice", email: "alice@example.com", age: 30 };
const updatedUser = updateObject(user, { name: "Alice Smith", age: 31 });
console.log(`Updated user: ${updatedUser.name}, ${updatedUser.age}`);

// Repository with constraints
interface User {
    id: string;
    name: string;
    email: string;
}

const userRepo = new InMemoryRepository<User>();
const user1: User = { id: "1", name: "Bob", email: "bob@example.com" };
const user2: User = { id: "2", name: "Charlie", email: "charlie@example.com" };

userRepo.save(user1);
userRepo.save(user2);

console.log(`Found user: ${userRepo.findById("1")?.name || "Not found"}`);

// Deep freeze example
const config = {
    database: {
        host: "localhost",
        port: 5432,
        credentials: {
            username: "admin",
            password: "secret"
        }
    },
    features: {
        authentication: true,
        logging: true
    }
};

const frozenConfig = deepFreeze(config);
console.log(`Database host: ${frozenConfig.database.host}`);
// frozenConfig.database.host = "remote"; // Would cause runtime error

// Comparable constraint
const versions = [
    new Version(1, 0, 0),
    new Version(2, 1, 0),
    new Version(1, 2, 0),
    new Version(2, 0, 1)
];

const sortedVersions = sort(versions);
console.log(`Sorted versions: ${sortedVersions.map(v => v.toString()).join(", ")}`);

// Real-world example: Generic validator with constraints
interface Validator<T> {
    validate(value: T): boolean;
    getErrorMessage(): string;
}

class RangeValidator implements Validator<number> {
    constructor(private min: number, private max: number) {}
    
    validate(value: number): boolean {
        return value >= this.min && value <= this.max;
    }
    
    getErrorMessage(): string {
        return `Value must be between ${this.min} and ${this.max}`;
    }
}

class LengthValidator implements Validator<string> {
    constructor(private minLength: number, private maxLength: number) {}
    
    validate(value: string): boolean {
        return value.length >= this.minLength && value.length <= this.maxLength;
    }
    
    getErrorMessage(): string {
        return `String length must be between ${this.minLength} and ${this.maxLength}`;
    }
}

function validateValue<T, V extends Validator<T>>(value: T, validator: V): boolean {
    const isValid = validator.validate(value);
    if (!isValid) {
        console.log(`Validation failed: ${validator.getErrorMessage()}`);
    } else {
        console.log(`Validation passed for value: ${value}`);
    }
    return isValid;
}

const ageValidator = new RangeValidator(0, 120);
const nameValidator = new LengthValidator(2, 50);

validateValue(25, ageValidator);      // Valid
validateValue(150, ageValidator);     // Invalid
validateValue("Alice", nameValidator); // Valid
validateValue("A", nameValidator);     // Invalid