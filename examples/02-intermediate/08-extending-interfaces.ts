// 08-extending-interfaces.ts - Interface Inheritance and Extension

// ===== BASIC INTERFACE EXTENSION =====

interface Shape {
    color: string;
    area(): number;
}

interface Rectangle extends Shape {
    width: number;
    height: number;
}

class MyRectangle implements Rectangle {
    color: string;
    width: number;
    height: number;

    constructor(color: string, width: number, height: number) {
        this.color = color;
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }
}

// ===== MULTIPLE INTERFACE EXTENSION =====

interface Nameable {
    name: string;
}

interface Ageable {
    age: number;
    getAge(): number;
}

interface Contactable {
    email: string;
    phone?: string;
}

// Extending multiple interfaces
interface Person extends Nameable, Ageable, Contactable {
    id: number;
    isActive: boolean;
}

let person: Person = {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    phone: "+1234567890",
    isActive: true,
    getAge(): number {
        return this.age;
    }
};

// ===== INTERFACE EXTENSION WITH GENERIC TYPES =====

interface Repository<T> {
    findById(id: string): T | null;
    save(entity: T): void;
    delete(id: string): boolean;
}

interface UserRepository extends Repository<Person> {
    findByEmail(email: string): Person | null;
    findActiveUsers(): Person[];
}

class InMemoryUserRepository implements UserRepository {
    private users: Person[] = [];

    findById(id: string): Person | null {
        return this.users.find(user => user.id.toString() === id) || null;
    }

    save(entity: Person): void {
        const index = this.users.findIndex(user => user.id === entity.id);
        if (index >= 0) {
            this.users[index] = entity;
        } else {
            this.users.push(entity);
        }
    }

    delete(id: string): boolean {
        const index = this.users.findIndex(user => user.id.toString() === id);
        if (index >= 0) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }

    findByEmail(email: string): Person | null {
        return this.users.find(user => user.email === email) || null;
    }

    findActiveUsers(): Person[] {
        return this.users.filter(user => user.isActive);
    }
}

// ===== OVERRIDING PROPERTIES IN EXTENDED INTERFACES =====

interface Animal {
    name: string;
    species: string;
    makeSound(): string;
}

// Can override method signatures
interface Dog extends Animal {
    species: "Canine"; // More specific type
    breed: string;
    makeSound(): "Woof" | "Bark"; // More specific return type
}

let myDog: Dog = {
    name: "Buddy",
    species: "Canine",
    breed: "Golden Retriever",
    makeSound(): "Woof" {
        return "Woof";
    }
};

// ===== INTERFACE DECLARATION MERGING =====

interface MergeExample {
    property1: string;
    method1(): void;
}

// Same interface name - TypeScript merges them
interface MergeExample {
    property2: number;
    method2(): string;
}

// The merged interface has both properties and methods
let merged: MergeExample = {
    property1: "hello",
    property2: 42,
    method1(): void {
        console.log("Method 1 called");
    },
    method2(): string {
        return "Method 2 result";
    }
};

// ===== EXTENDING INTERFACES WITH INDEX SIGNATURES =====

interface BaseConfig {
    version: string;
    debug: boolean;
}

interface ExtendedConfig extends BaseConfig {
    [key: string]: any; // Index signature
    features: string[];
}

let config: ExtendedConfig = {
    version: "1.0.0",
    debug: true,
    features: ["auth", "logging"],
    customProperty: "custom value",
    anotherProperty: 123
};

// ===== CONDITIONAL INTERFACE EXTENSION =====

interface BaseEntity {
    id: string;
    createdAt: Date;
}

interface TimestampedEntity extends BaseEntity {
    updatedAt: Date;
    version: number;
}

interface AuditableEntity extends TimestampedEntity {
    createdBy: string;
    updatedBy: string;
    auditLog: string[];
}

let auditableEntity: AuditableEntity = {
    id: "entity1",
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    createdBy: "user1",
    updatedBy: "user2",
    auditLog: ["Created", "Updated name", "Updated status"]
};

// ===== INTERFACE EXTENSION WITH FUNCTION OVERLOADING =====

interface Calculator {
    calculate(operation: "add", a: number, b: number): number;
    calculate(operation: "multiply", a: number, b: number): number;
}

interface AdvancedCalculator extends Calculator {
    calculate(operation: "add", a: number, b: number): number;
    calculate(operation: "multiply", a: number, b: number): number;
    calculate(operation: "power", base: number, exponent: number): number;
    calculate(operation: "sqrt", value: number): number;
}

class ScientificCalculator implements AdvancedCalculator {
    calculate(operation: "add", a: number, b: number): number;
    calculate(operation: "multiply", a: number, b: number): number;
    calculate(operation: "power", base: number, exponent: number): number;
    calculate(operation: "sqrt", value: number): number;
    calculate(operation: string, ...args: number[]): number {
        switch (operation) {
            case "add":
                return args[0] + args[1];
            case "multiply":
                return args[0] * args[1];
            case "power":
                return Math.pow(args[0], args[1]);
            case "sqrt":
                return Math.sqrt(args[0]);
            default:
                throw new Error(`Unknown operation: ${operation}`);
        }
    }
}

// ===== EXAMPLES =====
console.log("=== Extending Interfaces ===");

let rectangle = new MyRectangle("blue", 10, 5);
console.log(`Rectangle: ${rectangle.color}, area: ${rectangle.area()}`);

console.log(`Person: ${person.name}, age: ${person.getAge()}, email: ${person.email}`);

let userRepo = new InMemoryUserRepository();
userRepo.save(person);
let foundUser = userRepo.findById("1");
console.log(`Found user: ${foundUser?.name || "Not found"}`);

let foundByEmail = userRepo.findByEmail("john@example.com");
console.log(`Found by email: ${foundByEmail?.name || "Not found"}`);

console.log(`Dog: ${myDog.name} (${myDog.breed}) - ${myDog.makeSound()}`);

console.log(`Merged interface - prop1: ${merged.property1}, prop2: ${merged.property2}`);
merged.method1();
console.log(`Method 2 result: ${merged.method2()}`);

console.log(`Config version: ${config.version}, features: ${config.features.join(", ")}`);
console.log(`Custom property: ${config.customProperty}`);

console.log(`Auditable entity created by: ${auditableEntity.createdBy}`);
console.log(`Audit log: ${auditableEntity.auditLog.join(" -> ")}`);

let calc = new ScientificCalculator();
console.log(`Add: ${calc.calculate("add", 5, 3)}`);
console.log(`Multiply: ${calc.calculate("multiply", 4, 7)}`);
console.log(`Power: ${calc.calculate("power", 2, 8)}`);
console.log(`Square root: ${calc.calculate("sqrt", 16)}`);

// Real-world example: Event system with extending interfaces
interface BaseEvent {
    type: string;
    timestamp: Date;
    source: string;
}

interface UserEvent extends BaseEvent {
    userId: string;
    sessionId: string;
}

interface ClickEvent extends UserEvent {
    type: "click";
    elementId: string;
    coordinates: { x: number; y: number };
}

interface FormSubmitEvent extends UserEvent {
    type: "form_submit";
    formId: string;
    formData: Record<string, any>;
}

type AppEvent = ClickEvent | FormSubmitEvent;

function processEvent(event: AppEvent): void {
    console.log(`Processing ${event.type} event from user ${event.userId}`);
    
    switch (event.type) {
        case "click":
            console.log(`Clicked element ${event.elementId} at (${event.coordinates.x}, ${event.coordinates.y})`);
            break;
        case "form_submit":
            console.log(`Submitted form ${event.formId} with ${Object.keys(event.formData).length} fields`);
            break;
    }
}

let clickEvent: ClickEvent = {
    type: "click",
    timestamp: new Date(),
    source: "web_app",
    userId: "user123",
    sessionId: "session456",
    elementId: "submit_button",
    coordinates: { x: 100, y: 200 }
};

processEvent(clickEvent);