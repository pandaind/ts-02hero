// 17-modules.ts - ES6 Modules in TypeScript

// ===== BASIC EXPORTS =====

// Named exports
export const PI = 3.14159;
export const E = 2.71828;

export function add(a: number, b: number): number {
    return a + b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

// Export with type annotations
export const config: { apiUrl: string; timeout: number } = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

// ===== CLASS EXPORTS =====

export class Calculator {
    private history: string[] = [];
    
    add(a: number, b: number): number {
        const result = a + b;
        this.history.push(`${a} + ${b} = ${result}`);
        return result;
    }
    
    subtract(a: number, b: number): number {
        const result = a - b;
        this.history.push(`${a} - ${b} = ${result}`);
        return result;
    }
    
    getHistory(): string[] {
        return [...this.history];
    }
    
    clearHistory(): void {
        this.history = [];
    }
}

// ===== INTERFACE EXPORTS =====

export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

export interface UserRepository {
    findById(id: number): User | null;
    findByEmail(email: string): User | null;
    save(user: User): void;
    delete(id: number): boolean;
    findAll(): User[];
}

// ===== TYPE EXPORTS =====

export type Status = 'idle' | 'loading' | 'success' | 'error';
export type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
};

export type EventHandler<T = any> = (event: T) => void;

// ===== ENUM EXPORTS =====

export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

export enum Color {
    RED = '#FF0000',
    GREEN = '#00FF00',
    BLUE = '#0000FF',
    WHITE = '#FFFFFF',
    BLACK = '#000000'
}

// ===== DEFAULT EXPORT =====

class Logger {
    private level: LogLevel;
    
    constructor(level: LogLevel = LogLevel.INFO) {
        this.level = level;
    }
    
    setLevel(level: LogLevel): void {
        this.level = level;
    }
    
    debug(message: string): void {
        if (this.level <= LogLevel.DEBUG) {
            console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
        }
    }
    
    info(message: string): void {
        if (this.level <= LogLevel.INFO) {
            console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
        }
    }
    
    warn(message: string): void {
        if (this.level <= LogLevel.WARN) {
            console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
        }
    }
    
    error(message: string): void {
        if (this.level <= LogLevel.ERROR) {
            console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
        }
    }
}

// Default export
export default Logger;

// ===== RE-EXPORTS =====

// You can also re-export from other modules
// export { SomeClass, SomeFunction } from './otherModule';
// export * from './anotherModule';
// export { default as AliasedDefault } from './thirdModule';

// ===== NAMESPACE EXPORTS =====

export namespace MathUtils {
    export const constants = {
        PI: Math.PI,
        E: Math.E,
        GOLDEN_RATIO: 1.618033988749895
    };
    
    export function factorial(n: number): number {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    export function fibonacci(n: number): number {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    export class Geometry {
        static circleArea(radius: number): number {
            return constants.PI * radius * radius;
        }
        
        static rectangleArea(width: number, height: number): number {
            return width * height;
        }
        
        static triangleArea(base: number, height: number): number {
            return 0.5 * base * height;
        }
    }
}

// ===== CONDITIONAL EXPORTS =====

// Export different implementations based on environment
const isDevelopment = process.env.NODE_ENV === 'development';

export const apiClient = isDevelopment 
    ? {
        get: (url: string) => Promise.resolve(`Mock GET ${url}`),
        post: (url: string, data: any) => Promise.resolve(`Mock POST ${url}`)
      }
    : {
        get: (url: string) => fetch(url).then(r => r.json()),
        post: (url: string, data: any) => fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(r => r.json())
      };

// ===== GENERIC EXPORTS =====

export class Repository<T extends { id: number }> {
    private items: T[] = [];
    
    save(item: T): void {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index >= 0) {
            this.items[index] = item;
        } else {
            this.items.push(item);
        }
    }
    
    findById(id: number): T | null {
        return this.items.find(item => item.id === id) || null;
    }
    
    findAll(): T[] {
        return [...this.items];
    }
    
    delete(id: number): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index >= 0) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
}

// ===== UTILITY FUNCTIONS =====

export const utils = {
    // String utilities
    capitalize: (str: string): string => 
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
    
    camelCase: (str: string): string =>
        str.replace(/-([a-z])/g, (g) => g[1].toUpperCase()),
    
    kebabCase: (str: string): string =>
        str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase(),
    
    // Array utilities
    chunk: <T>(array: T[], size: number): T[][] => {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
    
    unique: <T>(array: T[]): T[] => [...new Set(array)],
    
    groupBy: <T, K extends keyof any>(
        array: T[], 
        key: (item: T) => K
    ): Record<K, T[]> => {
        return array.reduce((groups, item) => {
            const groupKey = key(item);
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(item);
            return groups;
        }, {} as Record<K, T[]>);
    },
    
    // Object utilities
    pick: <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
        const picked = {} as Pick<T, K>;
        keys.forEach(key => {
            if (key in obj) {
                picked[key] = obj[key];
            }
        });
        return picked;
    },
    
    omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
        const omitted = { ...obj };
        keys.forEach(key => {
            delete omitted[key];
        });
        return omitted;
    }
};

// ===== EXAMPLES AND DEMONSTRATIONS =====

// This would normally be in a separate file, but for demonstration:
function demonstrateModuleFeatures() {
    console.log("=== Module Features Demo ===");
    
    // Using exported constants
    console.log(`Mathematical constants: PI = ${PI}, E = ${E}`);
    
    // Using exported functions
    console.log(`Addition: ${add(5, 3)}`);
    console.log(`Multiplication: ${multiply(4, 7)}`);
    
    // Using exported classes
    const calc = new Calculator();
    calc.add(10, 5);
    calc.subtract(20, 8);
    console.log("Calculator history:", calc.getHistory());
    
    // Using exported enums
    console.log("Log levels:", LogLevel.DEBUG, LogLevel.INFO, LogLevel.ERROR);
    console.log("Colors:", Color.RED, Color.GREEN, Color.BLUE);
    
    // Using default export
    const logger = new Logger(LogLevel.DEBUG);
    logger.debug("This is a debug message");
    logger.info("This is an info message");
    logger.error("This is an error message");
    
    // Using namespace exports
    console.log("Factorial of 5:", MathUtils.factorial(5));
    console.log("Fibonacci of 7:", MathUtils.fibonacci(7));
    console.log("Circle area (radius 3):", MathUtils.Geometry.circleArea(3));
    
    // Using generic repository
    const userRepo = new Repository<User>();
    const user: User = {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        isActive: true
    };
    
    userRepo.save(user);
    console.log("Saved user:", userRepo.findById(1));
    console.log("All users:", userRepo.findAll());
    
    // Using utility functions
    console.log("Capitalize:", utils.capitalize("hello world"));
    console.log("Camel case:", utils.camelCase("hello-world-example"));
    console.log("Kebab case:", utils.kebabCase("HelloWorldExample"));
    
    const numbers = [1, 2, 2, 3, 3, 3, 4, 5];
    console.log("Unique numbers:", utils.unique(numbers));
    console.log("Chunked numbers:", utils.chunk(numbers, 3));
    
    const people = [
        { name: "Alice", department: "Engineering" },
        { name: "Bob", department: "Marketing" },
        { name: "Charlie", department: "Engineering" },
        { name: "David", department: "Sales" }
    ];
    
    const groupedPeople = utils.groupBy(people, person => person.department);
    console.log("Grouped people:", groupedPeople);
    
    const person = { name: "John", age: 30, city: "NYC", country: "USA" };
    console.log("Picked properties:", utils.pick(person, ['name', 'age']));
    console.log("Omitted properties:", utils.omit(person, ['city', 'country']));
}

// Run demonstration
demonstrateModuleFeatures();

// ===== MODULE DECLARATION EXAMPLES =====

// These would typically be in separate .d.ts files
declare module "external-library" {
    export function externalFunction(param: string): number;
    export const externalConstant: string;
}

// Augment existing modules
declare global {
    interface Array<T> {
        customMethod(callback: (item: T) => boolean): T[];
    }
}

// This would add the method to Array prototype in a real implementation
// Array.prototype.customMethod = function<T>(this: T[], callback: (item: T) => boolean): T[] {
//     return this.filter(callback);
// };

// ===== EXPORT ASSIGNMENT (CommonJS compatibility) =====

// For CommonJS compatibility, you can use export =
// export = Logger; // This makes Logger the default export for CommonJS

console.log("Module system demonstration complete!");