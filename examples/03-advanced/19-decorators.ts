// 19-decorators.ts - Class and Method Decorators

// Note: To use decorators, you need to enable experimentalDecorators in tsconfig.json
// "experimentalDecorators": true

import "reflect-metadata";

// ===== CLASS DECORATORS =====

// Simple class decorator
function Entity(target: any) {
    target.prototype.entityId = Math.random().toString(36);
    target.prototype.createdAt = new Date();
    
    console.log(`Entity decorator applied to ${target.name}`);
}

// Class decorator with parameters
function Table(tableName: string) {
    return function(target: any) {
        target.prototype.tableName = tableName;
        target.prototype.getTableName = function() {
            return tableName;
        };
        console.log(`Table decorator applied: ${tableName}`);
    };
}

// Decorator factory for logging
function Loggable(prefix: string = '') {
    return function(target: any) {
        const originalMethods = Object.getOwnPropertyNames(target.prototype)
            .filter(name => name !== 'constructor' && typeof target.prototype[name] === 'function');
        
        originalMethods.forEach(methodName => {
            const originalMethod = target.prototype[methodName];
            
            target.prototype[methodName] = function(...args: any[]) {
                console.log(`${prefix}[LOG] Calling ${target.name}.${methodName} with args:`, args);
                const result = originalMethod.apply(this, args);
                console.log(`${prefix}[LOG] ${target.name}.${methodName} returned:`, result);
                return result;
            };
        });
        
        return target;
    };
}

// ===== METHOD DECORATORS =====

// Timing decorator
function Timed(target: any, propertyKey: string, descriptor: PropertyDescriptor | undefined) {
    if (!descriptor || typeof descriptor.value !== 'function') {
        console.warn(`Timed decorator can only be applied to methods, not to ${propertyKey}`);
        return;
    }
    
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`Method ${propertyKey} took ${end - start} milliseconds`);
        return result;
    };
}

// Validation decorator
function Validate(rules: any) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor | undefined) {
        if (!descriptor) {
            console.warn(`Validate decorator applied to ${propertyKey} but no descriptor found`);
            return;
        }
        
        const originalMethod = descriptor.value;
        
        if (typeof originalMethod !== 'function') {
            console.warn(`Validate decorator can only be applied to methods, not to ${propertyKey}`);
            return;
        }
        
        descriptor.value = function(...args: any[]) {
            // Simple validation example
            if (rules.required && args.some(arg => arg === undefined || arg === null)) {
                throw new Error(`${propertyKey}: Required arguments are missing`);
            }
            
            if (rules.type) {
                args.forEach((arg, index) => {
                    if (rules.type[index] && typeof arg !== rules.type[index]) {
                        throw new Error(`${propertyKey}: Argument ${index} should be of type ${rules.type[index]}`);
                    }
                });
            }
            
            return originalMethod.apply(this, args);
        };
    };
}

// Retry decorator
function Retry(times: number, delay: number = 0) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor | undefined) {
        if (!descriptor || typeof descriptor.value !== 'function') {
            console.warn(`Retry decorator can only be applied to methods, not to ${propertyKey}`);
            return;
        }
        
        const originalMethod = descriptor.value;
        
        descriptor.value = async function(...args: any[]) {
            let lastError: any;
            
            for (let attempt = 1; attempt <= times; attempt++) {
                try {
                    console.log(`Attempt ${attempt} for ${propertyKey}`);
                    return await originalMethod.apply(this, args);
                } catch (error) {
                    lastError = error;
                    if (attempt < times && delay > 0) {
                        await new Promise(resolve => setTimeout(resolve, delay));
                    }
                }
            }
            
            throw lastError;
        };
    };
}

// ===== PROPERTY DECORATORS =====

function ReadOnly(target: any, propertyKey: string) {
    if (!target || typeof target !== 'object') {
        console.warn(`ReadOnly decorator: Invalid target for ${propertyKey}`);
        return;
    }
    
    let value: any;
    
    Object.defineProperty(target, propertyKey, {
        get: function() {
            return value;
        },
        set: function(newValue: any) {
            if (value === undefined) {
                value = newValue;
            } else {
                console.warn(`Property ${propertyKey} is read-only and cannot be changed`);
            }
        },
        enumerable: true,
        configurable: true
    });
}

function Min(minValue: number) {
    return function(target: any, propertyKey: string) {
        if (!target || typeof target !== 'object') {
            console.warn(`Min decorator: Invalid target for ${propertyKey}`);
            return;
        }
        
        let value: any;
        
        Object.defineProperty(target, propertyKey, {
            get: function() {
                return value;
            },
            set: function(newValue: any) {
                if (typeof newValue === 'number' && newValue < minValue) {
                    throw new Error(`${propertyKey} must be at least ${minValue}`);
                }
                value = newValue;
            },
            enumerable: true,
            configurable: true
        });
    };
}

// ===== PARAMETER DECORATORS =====

function Log(target: any, propertyKey: string, parameterIndex: number) {
    const existingMetadata = Reflect.getMetadata("log_parameters", target, propertyKey) || [];
    existingMetadata.push(parameterIndex);
    Reflect.defineMetadata("log_parameters", existingMetadata, target, propertyKey);
}

// Note: Parameter decorators are mainly used for metadata, often with libraries like reflect-metadata

// ===== ACCESSOR DECORATORS =====

function Configurable(value: boolean) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor | undefined) {
        if (!descriptor) {
            console.warn(`Configurable decorator applied to ${propertyKey} but no descriptor found`);
            return;
        }
        descriptor.configurable = value;
        console.log(`Set ${propertyKey} configurable to ${value}`);
    };
}

function Enumerable(value: boolean) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor | undefined) {
        if (!descriptor) {
            console.warn(`Enumerable decorator applied to ${propertyKey} but no descriptor found`);
            return;
        }
        descriptor.enumerable = value;
        console.log(`Set ${propertyKey} enumerable to ${value}`);
    };
}

// ===== PRACTICAL EXAMPLES =====

// Database model example
@Entity
@Table("users")
@Loggable("[USER] ")
class User {
    @ReadOnly
    id: number = Math.floor(Math.random() * 1000);
    
    @Min(0)
    age: number = 0;
    
    name: string;
    email: string;
    
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
    
    @Timed
    @Validate({ required: true, type: ['string'] })
    updateName(newName: string): void {
        this.name = newName;
    }
    
    @Timed
    celebrate(): string {
        return `Happy birthday, ${this.name}!`;
    }
    
    @Configurable(false)
    get fullInfo(): string {
        return `${this.name} (${this.email}) - Age: ${this.age}`;
    }
    
    // Simulate async operation
    @Retry(3, 1000)
    async saveToDatabase(): Promise<string> {
        // Simulate random failure
        if (Math.random() < 0.7) {
            throw new Error("Database connection failed");
        }
        return `User ${this.name} saved successfully`;
    }
}

// Service class example
@Loggable("[SERVICE] ")
class UserService {
    private users: User[] = [];
    
    @Timed
    addUser(user: User): void {
        this.users.push(user);
    }
    
    @Timed
    @Validate({ required: true, type: ['number'] })
    findById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }
    
    @Timed
    getAllUsers(): User[] {
        return [...this.users];
    }
    
    @Retry(2, 500)
    async exportUsers(): Promise<string> {
        // Simulate export process with potential failure
        if (Math.random() < 0.5) {
            throw new Error("Export failed");
        }
        return JSON.stringify(this.users);
    }
}

// ===== DECORATOR COMPOSITION =====

// Multiple decorators can be applied to the same element
@Entity
@Table("products")
class Product {
    @ReadOnly
    id: number = Math.random();
    
    @Min(0)
    price: number = 0;
    
    name: string;
    
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
    
    @Timed
    @Validate({ required: true, type: ['number'] })
    updatePrice(newPrice: number): void {
        this.price = newPrice;
    }
}

// ===== METADATA DECORATORS =====

// Custom metadata decorator
function Metadata(key: string, value: any) {
    return function(target: any, propertyKey?: string) {
        if (propertyKey) {
            // Method or property decorator
            Reflect.defineMetadata(key, value, target, propertyKey);
        } else {
            // Class decorator
            Reflect.defineMetadata(key, value, target);
        }
    };
}

// API endpoint decorator
function ApiEndpoint(method: string, path: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor | undefined) {
        Reflect.defineMetadata("api:method", method, target, propertyKey);
        Reflect.defineMetadata("api:path", path, target, propertyKey);
        
        console.log(`Registered API endpoint: ${method} ${path} -> ${propertyKey}`);
    };
}

@Metadata("controller", "api/users")
class ApiController {
    @ApiEndpoint("GET", "/users")
    @Timed
    getUsers(): string {
        return "Getting all users";
    }
    
    @ApiEndpoint("POST", "/users")
    @Validate({ required: true, type: ['object'] })
    createUser(userData: any): string {
        return `Creating user: ${userData.name}`;
    }
    
    @ApiEndpoint("PUT", "/users/:id")
    @Timed
    updateUser(id: number, userData: any): string {
        return `Updating user ${id}`;
    }
}

// ===== EXAMPLES AND DEMONSTRATIONS =====

async function demonstrateDecorators() {
    console.log("=== Decorators Demo ===");
    
    // Create user instance
    const user = new User("Alice Johnson", "alice@example.com");
    console.log(`User created with ID: ${user.id}`);
    
    // Test read-only property
    console.log("Trying to change read-only ID...");
    user.id = 999; // Should show warning
    console.log(`User ID is still: ${user.id}`);
    
    // Test validation
    try {
        user.age = -5; // Should throw error
    } catch (error) {
        console.log("Validation error:", (error as Error).message);
    }
    
    user.age = 25; // Should work
    console.log(`User age set to: ${user.age}`);
    
    // Test method decorators
    user.updateName("Alice Smith"); // Will be timed and logged
    console.log(user.celebrate()); // Will be timed
    
    // Test retry decorator
    try {
        const saveResult = await user.saveToDatabase();
        console.log("Save result:", saveResult);
    } catch (error) {
        console.log("Save failed after retries:", (error as Error).message);
    }
    
    // Test service
    console.log("\n--- UserService ---");
    const service = new UserService();
    service.addUser(user);
    
    const foundUser = service.findById(user.id);
    console.log("Found user:", foundUser?.name);
    
    console.log("All users:", service.getAllUsers().length);
    
    // Test retry on service
    try {
        const exportResult = await service.exportUsers();
        console.log("Export successful");
    } catch (error) {
        console.log("Export failed:", (error as Error).message);
    }
    
    // Test product
    console.log("\n--- Product ---");
    const product = new Product("Laptop", 999);
    console.log(`Product created: ${product.name} - $${product.price}`);
    
    product.updatePrice(899); // Will be timed and validated
    console.log(`Updated price: $${product.price}`);
    
    // Test API controller
    console.log("\n--- API Controller ---");
    const controller = new ApiController();
    console.log(controller.getUsers());
    console.log(controller.createUser({ name: "John Doe", email: "john@example.com" }));
    
    // Access metadata (would require reflect-metadata library in real use)
    console.log("Decorator demonstration complete");
}

// ===== ADVANCED DECORATOR PATTERNS =====

// Memoization decorator
function Memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor | undefined) {
    if (!descriptor || typeof descriptor.value !== 'function') {
        console.warn(`Memoize decorator can only be applied to methods, not to ${propertyKey}`);
        return;
    }
    
    const originalMethod = descriptor.value;
    const cache = new Map();
    
    descriptor.value = function(...args: any[]) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log(`Cache hit for ${propertyKey}`);
            return cache.get(key);
        }
        
        console.log(`Cache miss for ${propertyKey}`);
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Throttle decorator
function Throttle(delay: number) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor | undefined) {
        if (!descriptor || typeof descriptor.value !== 'function') {
            console.warn(`Throttle decorator can only be applied to methods, not to ${propertyKey}`);
            return;
        }
        
        const originalMethod = descriptor.value;
        let lastExecution = 0;
        
        descriptor.value = function(...args: any[]) {
            const now = Date.now();
            
            if (now - lastExecution >= delay) {
                lastExecution = now;
                return originalMethod.apply(this, args);
            } else {
                console.log(`Method ${propertyKey} throttled`);
            }
        };
    };
}

class AdvancedExample {
    @Memoize
    expensiveCalculation(n: number): number {
        console.log(`Calculating factorial of ${n}`);
        if (n <= 1) return 1;
        return n * this.expensiveCalculation(n - 1);
    }
    
    @Throttle(1000)
    handleClick(): void {
        console.log("Click handled at", new Date().toISOString());
    }
}

// Test advanced decorators
console.log("\n=== Advanced Decorators ===");
const advanced = new AdvancedExample();

// Test memoization
console.log(advanced.expensiveCalculation(5)); // Will calculate
console.log(advanced.expensiveCalculation(5)); // Will use cache
console.log(advanced.expensiveCalculation(6)); // Will calculate new, reuse cached 5!

// Test throttling
advanced.handleClick(); // Will execute
advanced.handleClick(); // Will be throttled
setTimeout(() => {
    advanced.handleClick(); // Will execute after delay
}, 1100);

// Run demonstrations
demonstrateDecorators().catch(console.error);

console.log("Decorator examples loaded. Note: Decorators require experimentalDecorators: true in tsconfig.json");