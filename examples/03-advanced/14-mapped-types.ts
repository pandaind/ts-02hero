// 14-mapped-types.ts - Mapped Types

// ===== BASIC MAPPED TYPES =====

// Make all properties optional
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// Make all properties required
type Required<T> = {
    [P in keyof T]-?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// Custom mapped type example
type Stringify<T> = {
    [P in keyof T]: string;
};

// ===== BASIC EXAMPLES =====

interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

// Using built-in mapped types
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type ReadonlyUser = Readonly<User>;
type StringifiedUser = Stringify<User>;

// ===== CONDITIONAL MAPPED TYPES =====

// Make only certain types optional
type OptionalStrings<T> = {
    [P in keyof T]: T[P] extends string ? T[P] | undefined : T[P];
};

// Convert functions to their return types
type ReturnTypes<T> = {
    [P in keyof T]: T[P] extends (...args: any[]) => infer R ? R : T[P];
};

// Filter properties by type
type StringKeysOnly<T> = {
    [P in keyof T]: T[P] extends string ? P : never;
}[keyof T];

type StringProperties<T> = Pick<T, StringKeysOnly<T>>;

// ===== TEMPLATE LITERAL TYPES WITH MAPPED TYPES =====

type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type Setters<T> = {
    [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
};

type GettersAndSetters<T> = Getters<T> & Setters<T>;

// ===== KEY REMAPPING =====

// Remove properties with specific prefix
type RemovePrefix<T, Prefix extends string> = {
    [P in keyof T as P extends `${Prefix}${infer Rest}` ? Rest : P]: T[P];
};

// Add prefix to all keys
type AddPrefix<T, Prefix extends string> = {
    [P in keyof T as `${Prefix}${string & P}`]: T[P];
};

// Convert keys to uppercase
type UppercaseKeys<T> = {
    [P in keyof T as Uppercase<string & P>]: T[P];
};

// ===== FILTERING PROPERTIES =====

// Pick properties that extend a certain type
type PickByType<T, U> = {
    [P in keyof T as T[P] extends U ? P : never]: T[P];
};

// Omit properties that extend a certain type
type OmitByType<T, U> = {
    [P in keyof T as T[P] extends U ? never : P]: T[P];
};

// Get function properties only
type FunctionProperties<T> = PickByType<T, Function>;

// Get non-function properties only
type NonFunctionProperties<T> = OmitByType<T, Function>;

// ===== RECURSIVE MAPPED TYPES =====

// Deep partial - makes all nested properties optional
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep readonly - makes all nested properties readonly
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// ===== ADVANCED MAPPED TYPE PATTERNS =====

// Nullable version of all properties
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

// Optional properties become required, required become optional
type Flip<T> = {
    [P in keyof T as T[P] extends undefined ? P : never]-?: T[P];
} & {
    [P in keyof T as T[P] extends undefined ? never : P]?: T[P];
};

// Extract promise value types
type UnwrapPromise<T> = {
    [P in keyof T]: T[P] extends Promise<infer U> ? U : T[P];
};

// ===== UTILITY MAPPED TYPES =====

// Create a type with specific properties changed
type ModifyProperty<T, K extends keyof T, U> = Omit<T, K> & {
    [P in K]: U;
};

// Make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific properties required
type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ===== PRACTICAL EXAMPLES =====

// API Response wrapper
type ApiResponse<T> = {
    [P in keyof T]: {
        data: T[P];
        loading: boolean;
        error: string | null;
    };
};

// Form state management
type FormState<T> = {
    [P in keyof T]: {
        value: T[P];
        error: string | null;
        touched: boolean;
        dirty: boolean;
    };
};

// Database entity with timestamps
type WithTimestamps<T> = T & {
    createdAt: Date;
    updatedAt: Date;
};

// Audit trail for entities
type WithAudit<T> = WithTimestamps<T> & {
    createdBy: string;
    updatedBy: string;
    version: number;
};

// ===== EXAMPLES =====
console.log("=== Mapped Types ===");

// Basic mapped types
let partialUser: PartialUser = { name: "Alice" };
let requiredUser: RequiredUser = { id: 1, name: "Bob", email: "bob@example.com", age: 30 };
let readonlyUser: ReadonlyUser = { id: 1, name: "Charlie", email: "charlie@example.com" };
let stringifiedUser: StringifiedUser = { id: "1", name: "David", email: "david@example.com" };

console.log("Partial user:", partialUser);
console.log("Required user:", requiredUser);
console.log("Readonly user:", readonlyUser);
console.log("Stringified user:", stringifiedUser);

// Conditional mapped types
interface MixedData {
    name: string;
    count: number;
    isActive: boolean;
    description: string;
    getValue: () => number;
    process: () => void;
}

type OptionalStringsMixed = OptionalStrings<MixedData>;
type ReturnTypesMixed = ReturnTypes<MixedData>;
type StringPropsOnly = StringProperties<MixedData>;

let optionalStrings: OptionalStringsMixed = {
    name: undefined, // string properties can be undefined
    count: 42,       // non-string properties remain as is
    isActive: true,
    description: "Test",
    getValue: () => 5,
    process: () => {}
};

console.log("Optional strings example:", optionalStrings);

// Template literal types with mapped types
interface Person {
    name: string;
    age: number;
    email: string;
}

type PersonGettersSetters = GettersAndSetters<Person>;

let personApi: PersonGettersSetters = {
    getName: () => "John",
    getAge: () => 30,
    getEmail: () => "john@example.com",
    setName: (value: string) => { console.log(`Setting name to: ${value}`); },
    setAge: (value: number) => { console.log(`Setting age to: ${value}`); },
    setEmail: (value: string) => { console.log(`Setting email to: ${value}`); }
};

console.log("Person name:", personApi.getName());
personApi.setAge(31);

// Key remapping
interface PrefixedData {
    prefixName: string;
    prefixAge: number;
    regularProperty: boolean;
}

type WithoutPrefix = RemovePrefix<PrefixedData, "prefix">;
type WithApiPrefix = AddPrefix<Person, "api_">;
type UpperKeys = UppercaseKeys<Person>;

let withoutPrefix: WithoutPrefix = {
    Name: "Alice",
    Age: 25,
    regularProperty: true
};

let withApiPrefix: WithApiPrefix = {
    api_name: "Bob",
    api_age: 30,
    api_email: "bob@example.com"
};

console.log("Without prefix:", withoutPrefix);
console.log("With API prefix:", withApiPrefix);

// Filtering properties
interface Service {
    name: string;
    port: number;
    start: () => void;
    stop: () => void;
    restart: () => void;
    isRunning: () => boolean;
}

type ServiceFunctions = FunctionProperties<Service>;
type ServiceData = NonFunctionProperties<Service>;

let serviceFunctions: ServiceFunctions = {
    start: () => console.log("Starting service"),
    stop: () => console.log("Stopping service"),
    restart: () => console.log("Restarting service"),
    isRunning: () => true
};

let serviceData: ServiceData = {
    name: "WebServer",
    port: 8080
};

console.log("Service data:", serviceData);
serviceFunctions.start();

// Recursive mapped types
interface NestedData {
    user: {
        profile: {
            name: string;
            preferences: {
                theme: string;
                notifications: boolean;
            };
        };
        settings: {
            language: string;
        };
    };
    metadata: {
        version: number;
    };
}

type PartialNested = DeepPartial<NestedData>;
type ReadonlyNested = DeepReadonly<NestedData>;

let partialNested: PartialNested = {
    user: {
        profile: {
            name: "Alice"
            // preferences is optional
        }
    }
    // metadata is optional
};

console.log("Partial nested:", partialNested);

// Advanced patterns
type NullableUser = Nullable<User>;
let nullableUser: NullableUser = {
    id: null,
    name: "Test",
    email: null,
    age: 25
};

console.log("Nullable user:", nullableUser);

// Utility mapped types
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

type ProductWithRequiredDescription = RequiredBy<Product, "description">;
type ProductWithOptionalPrice = PartialBy<Product, "price">;

let productWithDescription: ProductWithRequiredDescription = {
    id: 1,
    name: "Laptop",
    price: 999,
    description: "High-performance laptop" // Now required
};

let productWithOptionalPrice: ProductWithOptionalPrice = {
    id: 2,
    name: "Mouse"
    // price is now optional
};

console.log("Product with required description:", productWithDescription);
console.log("Product with optional price:", productWithOptionalPrice);

// Practical examples
type UserApiResponse = ApiResponse<Pick<User, "name" | "email">>;
let userApiResponse: UserApiResponse = {
    name: { data: "John", loading: false, error: null },
    email: { data: "john@example.com", loading: false, error: null }
};

console.log("API response:", userApiResponse);

type UserFormState = FormState<Pick<User, "name" | "email">>;
let userForm: UserFormState = {
    name: { value: "Alice", error: null, touched: true, dirty: false },
    email: { value: "alice@example.com", error: null, touched: false, dirty: true }
};

console.log("Form state:", userForm);

// Database entities with timestamps and audit
type UserEntity = WithAudit<User>;
let userEntity: UserEntity = {
    id: 1,
    name: "Bob",
    email: "bob@example.com",
    age: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "system",
    updatedBy: "admin",
    version: 1
};

console.log("User entity with audit:", userEntity);

// Real-world example: Event system with mapped types
interface Events {
    userLogin: { userId: string; timestamp: Date };
    userLogout: { userId: string; duration: number };
    pageView: { userId: string; page: string; referrer?: string };
    purchase: { userId: string; productId: string; amount: number };
}

type EventHandlers = {
    [E in keyof Events]: (event: Events[E]) => void;
};

type EventEmitters = {
    [E in keyof Events as `emit${Capitalize<string & E>}`]: (event: Events[E]) => void;
};

let eventHandlers: EventHandlers = {
    userLogin: (event) => console.log(`User ${event.userId} logged in at ${event.timestamp}`),
    userLogout: (event) => console.log(`User ${event.userId} logged out after ${event.duration}ms`),
    pageView: (event) => console.log(`User ${event.userId} viewed ${event.page}`),
    purchase: (event) => console.log(`User ${event.userId} purchased ${event.productId} for $${event.amount}`)
};

let eventEmitters: EventEmitters = {
    emitUserLogin: (event) => console.log("Emitting user login:", event),
    emitUserLogout: (event) => console.log("Emitting user logout:", event),
    emitPageView: (event) => console.log("Emitting page view:", event),
    emitPurchase: (event) => console.log("Emitting purchase:", event)
};

// Demonstrate the event system
eventHandlers.userLogin({ userId: "user123", timestamp: new Date() });
eventEmitters.emitPurchase({ userId: "user456", productId: "prod789", amount: 99.99 });