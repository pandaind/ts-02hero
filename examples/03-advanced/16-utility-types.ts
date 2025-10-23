// 16-utility-types.ts - Built-in Utility Types

// ===== BUILT-IN UTILITY TYPES =====

interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    isActive: boolean;
    preferences: {
        theme: 'light' | 'dark';
        notifications: boolean;
    };
}

// ===== PARTIAL<T> =====
// Makes all properties optional

type PartialUser = Partial<User>;

const updateUser = (id: number, updates: PartialUser): void => {
    console.log(`Updating user ${id}:`, updates);
};

updateUser(1, { name: "Alice Smith" });
updateUser(2, { age: 31, isActive: false });

// ===== REQUIRED<T> =====
// Makes all properties required

interface OptionalConfig {
    host?: string;
    port?: number;
    ssl?: boolean;
    debug?: boolean;
}

type RequiredConfig = Required<OptionalConfig>;

const createServer = (config: RequiredConfig): void => {
    console.log("Creating server with config:", config);
};

// Must provide all properties
createServer({
    host: "localhost",
    port: 8080,
    ssl: true,
    debug: false
});

// ===== READONLY<T> =====
// Makes all properties readonly

type ReadonlyUser = Readonly<User>;

const immutableUser: ReadonlyUser = {
    id: 1,
    name: "John",
    email: "john@example.com",
    isActive: true,
    preferences: {
        theme: 'dark',
        notifications: true
    }
};

// immutableUser.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property

// ===== PICK<T, K> =====
// Creates a type by picking specific properties from T

type UserSummary = Pick<User, 'id' | 'name' | 'email'>;

const displayUserSummary = (user: UserSummary): void => {
    console.log(`User: ${user.name} (${user.email})`);
};

displayUserSummary({
    id: 1,
    name: "Alice",
    email: "alice@example.com"
});

// ===== OMIT<T, K> =====
// Creates a type by omitting specific properties from T

type UserWithoutId = Omit<User, 'id'>;

const createUser = (userData: UserWithoutId): User => {
    return {
        id: Math.random(),
        ...userData
    };
};

const newUser = createUser({
    name: "Bob",
    email: "bob@example.com",
    isActive: true,
    preferences: {
        theme: 'light',
        notifications: false
    }
});

console.log("Created user:", newUser);

// ===== EXCLUDE<T, U> =====
// Excludes from T those types that are assignable to U

type StringOrNumber = string | number | boolean;
type StringOnly = Exclude<StringOrNumber, number | boolean>; // string

type EventType = 'click' | 'hover' | 'focus' | 'blur' | 'keydown';
type MouseEvents = Exclude<EventType, 'focus' | 'blur' | 'keydown'>; // 'click' | 'hover'

const handleMouseEvent = (event: MouseEvents): void => {
    console.log(`Handling mouse event: ${event}`);
};

handleMouseEvent('click');
handleMouseEvent('hover');

// ===== EXTRACT<T, U> =====
// Extracts from T those types that are assignable to U

type ExtractedMouseEvents = Extract<EventType, 'click' | 'hover' | 'scroll'>; // 'click' | 'hover'

// ===== NONNULLABLE<T> =====
// Excludes null and undefined from T

type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // string

const processString = (value: DefinitelyString): void => {
    console.log(`Processing string: ${value.toUpperCase()}`);
};

// ===== RETURNTYPE<T> =====
// Extracts the return type of a function type

function calculateArea(width: number, height: number): number {
    return width * height;
}

type AreaResult = ReturnType<typeof calculateArea>; // number

const area: AreaResult = calculateArea(10, 5);
console.log(`Area: ${area}`);

// ===== PARAMETERS<T> =====
// Extracts the parameter types of a function type as a tuple

type CalculateAreaParams = Parameters<typeof calculateArea>; // [number, number]

const applyCalculation = (...args: CalculateAreaParams): number => {
    return calculateArea(...args);
};

console.log(`Applied calculation: ${applyCalculation(8, 6)}`);

// ===== CONSTRUCTORPARAMETERS<T> =====
// Extracts the parameter types of a constructor function type

class Product {
    constructor(public name: string, public price: number, public category: string) {}
    
    getInfo(): string {
        return `${this.name} - $${this.price} (${this.category})`;
    }
}

type ProductParams = ConstructorParameters<typeof Product>; // [string, number, string]

const createProduct = (...args: ProductParams): Product => {
    return new Product(...args);
};

const laptop = createProduct("Laptop", 999, "Electronics");
console.log(laptop.getInfo());

// ===== INSTANCETYPE<T> =====
// Extracts the instance type of a constructor function type

type ProductInstance = InstanceType<typeof Product>; // Product

const handleProduct = (product: ProductInstance): void => {
    console.log(`Handling product: ${product.getInfo()}`);
};

handleProduct(laptop);

// ===== THISPARAMETERTYPE<T> =====
// Extracts the type of 'this' parameter of a function type

interface Calculator {
    value: number;
}

function addToThis(this: Calculator, amount: number): number {
    return this.value + amount;
}

type CalculatorThis = ThisParameterType<typeof addToThis>; // Calculator

// ===== OMITTHISPARAMETER<T> =====
// Removes the 'this' parameter from a function type

type AddFunction = OmitThisParameter<typeof addToThis>; // (amount: number) => number

const calculator: Calculator = { value: 10 };
const boundAdd = addToThis.bind(calculator);
console.log(`Bound calculation: ${boundAdd(5)}`);

// ===== RECORD<K, T> =====
// Creates an object type with keys K and values T

type Status = 'idle' | 'loading' | 'success' | 'error';
type StatusMessages = Record<Status, string>;

const messages: StatusMessages = {
    idle: 'Ready to start',
    loading: 'Please wait...',
    success: 'Operation completed successfully',
    error: 'Something went wrong'
};

console.log("Status messages:", messages);

// More complex Record example
type UserRole = 'admin' | 'user' | 'guest';
type RolePermissions = Record<UserRole, string[]>;

const permissions: RolePermissions = {
    admin: ['read', 'write', 'delete', 'manage'],
    user: ['read', 'write'],
    guest: ['read']
};

console.log("Admin permissions:", permissions.admin);

// ===== ADVANCED UTILITY TYPE COMBINATIONS =====

// Combining multiple utility types
type PartialUserSummary = Partial<Pick<User, 'name' | 'email' | 'age'>>;

const updateUserSummary = (updates: PartialUserSummary): void => {
    console.log("Updating user summary:", updates);
};

updateUserSummary({ name: "Updated Name" });

// Creating custom utility types using built-in ones
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    publishedAt?: Date;
    tags?: string[];
}

type PublishedArticle = RequiredFields<Article, 'publishedAt'>;
type DraftArticle = OptionalFields<Article, 'author' | 'publishedAt' | 'tags'>;

const publishArticle = (article: PublishedArticle): void => {
    console.log(`Publishing: ${article.title} by ${article.author}`);
};

const createDraft = (draft: DraftArticle): void => {
    console.log(`Creating draft: ${draft.title}`);
};

// ===== TEMPLATE LITERAL UTILITY TYPES =====

// Uppercase, Lowercase, Capitalize, Uncapitalize
type OriginalString = "hello world";
type UppercaseString = Uppercase<OriginalString>; // "HELLO WORLD"
type LowercaseString = Lowercase<"HELLO WORLD">; // "hello world"
type CapitalizedString = Capitalize<"hello world">; // "Hello world"
type UncapitalizedString = Uncapitalize<"Hello World">; // "hello World"

// Practical example with template literals
type EventName = 'click' | 'hover' | 'focus';
type EventHandlerName = `on${Capitalize<EventName>}`; // 'onClick' | 'onHover' | 'onFocus'

type EventHandlers = Record<EventHandlerName, () => void>;

const handlers: EventHandlers = {
    onClick: () => console.log('Clicked'),
    onHover: () => console.log('Hovered'),
    onFocus: () => console.log('Focused')
};

// ===== REAL-WORLD EXAMPLES =====

// API Response wrapper
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;
type UserSummaryResponse = ApiResponse<Pick<User, 'id' | 'name' | 'email'>>;

// Form state management
type FormState<T> = {
    [K in keyof T]: {
        value: T[K];
        error: string | null;
        touched: boolean;
    };
};

type UserFormState = FormState<Required<Omit<User, 'id'>>>;

const userForm: UserFormState = {
    name: { value: '', error: null, touched: false },
    email: { value: '', error: null, touched: false },
    age: { value: 0, error: null, touched: false },
    isActive: { value: true, error: null, touched: false },
    preferences: {
        value: { theme: 'light', notifications: true },
        error: null,
        touched: false
    }
};

// Database entity types
type EntityWithTimestamps<T> = T & {
    createdAt: Date;
    updatedAt: Date;
};

type EntityWithSoftDelete<T> = T & {
    deletedAt: Date | null;
};

type FullEntity<T> = EntityWithTimestamps<EntityWithSoftDelete<T>>;

type UserEntity = FullEntity<User>;

const userEntity: UserEntity = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    isActive: true,
    preferences: { theme: 'dark', notifications: true },
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
};

// Configuration with defaults
interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    ssl?: boolean;
    maxConnections?: number;
    timeout?: number;
}

type DatabaseConfigDefaults = Required<Pick<DatabaseConfig, 'ssl' | 'maxConnections' | 'timeout'>>;
type DatabaseConfigRequired = Omit<DatabaseConfig, 'ssl' | 'maxConnections' | 'timeout'>;

const defaultConfig: DatabaseConfigDefaults = {
    ssl: false,
    maxConnections: 10,
    timeout: 5000
};

const createDatabaseConfig = (config: DatabaseConfigRequired): Required<DatabaseConfig> => {
    return { ...defaultConfig, ...config };
};

const dbConfig = createDatabaseConfig({
    host: 'localhost',
    port: 5432,
    database: 'myapp',
    username: 'user',
    password: 'password'
});

console.log("Database config:", dbConfig);

// ===== EXAMPLES EXECUTION =====
console.log("=== Utility Types ===");

console.log("Handlers:", Object.keys(handlers));
console.log("User form state keys:", Object.keys(userForm));
console.log("User entity:", userEntity.name, userEntity.createdAt);
console.log("Messages for loading:", messages.loading);

// Demonstrate type safety
const safeStringProcess = (value: unknown): void => {
    if (typeof value === 'string') {
        // Now TypeScript knows value is string
        const processed: DefinitelyString = value;
        processString(processed);
    }
};

safeStringProcess("Hello TypeScript!");

// Event system example
type CustomEventMap = {
    'user-login': { userId: string; timestamp: Date };
    'user-logout': { userId: string; sessionDuration: number };
    'page-view': { path: string; referrer?: string };
};

type EventListeners = {
    [K in keyof CustomEventMap as `on${Capitalize<string & K>}`]: (event: CustomEventMap[K]) => void;
};

const eventListeners: Partial<EventListeners> = {
    'onUser-login': (event) => {
        console.log(`User ${event.userId} logged in at ${event.timestamp}`);
    },
    'onPage-view': (event) => {
        console.log(`Page viewed: ${event.path}`);
    }
};

// Trigger events
eventListeners['onUser-login']?.({ userId: 'user123', timestamp: new Date() });
eventListeners['onPage-view']?.({ path: '/dashboard', referrer: '/login' });

console.log("Utility types demonstration complete!");