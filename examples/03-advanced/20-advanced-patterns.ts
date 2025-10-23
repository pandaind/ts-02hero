// 20-advanced-patterns.ts - Advanced Design Patterns

// ===== SINGLETON PATTERN =====

class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connectionString: string;
    private isConnected: boolean = false;
    
    private constructor(connectionString: string) {
        this.connectionString = connectionString;
    }
    
    public static getInstance(connectionString?: string): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            if (!connectionString) {
                throw new Error("Connection string required for first instance");
            }
            DatabaseConnection.instance = new DatabaseConnection(connectionString);
        }
        return DatabaseConnection.instance;
    }
    
    public connect(): void {
        if (!this.isConnected) {
            console.log(`Connecting to database: ${this.connectionString}`);
            this.isConnected = true;
        }
    }
    
    public disconnect(): void {
        if (this.isConnected) {
            console.log("Disconnecting from database");
            this.isConnected = false;
        }
    }
    
    public query(sql: string): any[] {
        if (!this.isConnected) {
            throw new Error("Database not connected");
        }
        console.log(`Executing query: ${sql}`);
        return []; // Mock result
    }
}

// ===== FACTORY PATTERN =====

interface INotification {
    send(message: string): void;
}

class EmailNotification implements INotification {
    constructor(private email: string) {}
    
    send(message: string): void {
        console.log(`Email sent to ${this.email}: ${message}`);
    }
}

class SMSNotification implements INotification {
    constructor(private phoneNumber: string) {}
    
    send(message: string): void {
        console.log(`SMS sent to ${this.phoneNumber}: ${message}`);
    }
}

class PushNotification implements INotification {
    constructor(private deviceId: string) {}
    
    send(message: string): void {
        console.log(`Push notification sent to ${this.deviceId}: ${message}`);
    }
}

class NotificationFactory {
    static createNotification(type: 'email' | 'sms' | 'push', target: string): INotification {
        switch (type) {
            case 'email':
                return new EmailNotification(target);
            case 'sms':
                return new SMSNotification(target);
            case 'push':
                return new PushNotification(target);
            default:
                throw new Error(`Unknown notification type: ${type}`);
        }
    }
}

// ===== OBSERVER PATTERN =====

interface Observer<T> {
    update(data: T): void;
}

interface Subject<T> {
    attach(observer: Observer<T>): void;
    detach(observer: Observer<T>): void;
    notify(data: T): void;
}

class EventEmitter<T> implements Subject<T> {
    private observers: Observer<T>[] = [];
    
    attach(observer: Observer<T>): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    
    detach(observer: Observer<T>): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    
    notify(data: T): void {
        this.observers.forEach(observer => observer.update(data));
    }
}

class UserActivityTracker extends EventEmitter<{ userId: string; action: string; timestamp: Date }> {
    logActivity(userId: string, action: string): void {
        const activityData = {
            userId,
            action,
            timestamp: new Date()
        };
        console.log(`Activity logged: ${userId} - ${action}`);
        this.notify(activityData);
    }
}

class AnalyticsService implements Observer<{ userId: string; action: string; timestamp: Date }> {
    update(data: { userId: string; action: string; timestamp: Date }): void {
        console.log(`Analytics: Recording ${data.action} by ${data.userId} at ${data.timestamp}`);
    }
}

class NotificationService implements Observer<{ userId: string; action: string; timestamp: Date }> {
    update(data: { userId: string; action: string; timestamp: Date }): void {
        if (data.action === 'login') {
            console.log(`Notification: Welcome back ${data.userId}!`);
        }
    }
}

// ===== STRATEGY PATTERN =====

interface PaymentStrategy {
    pay(amount: number): void;
    validate(): boolean;
}

class CreditCardPayment implements PaymentStrategy {
    constructor(private cardNumber: string, private cvv: string) {}
    
    validate(): boolean {
        return this.cardNumber.length === 16 && this.cvv.length === 3;
    }
    
    pay(amount: number): void {
        if (this.validate()) {
            console.log(`Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`);
        } else {
            throw new Error("Invalid credit card information");
        }
    }
}

class PayPalPayment implements PaymentStrategy {
    constructor(private email: string) {}
    
    validate(): boolean {
        return this.email.includes('@');
    }
    
    pay(amount: number): void {
        if (this.validate()) {
            console.log(`Paid $${amount} using PayPal account ${this.email}`);
        } else {
            throw new Error("Invalid PayPal email");
        }
    }
}

class BankTransferPayment implements PaymentStrategy {
    constructor(private accountNumber: string, private routingNumber: string) {}
    
    validate(): boolean {
        return this.accountNumber.length >= 8 && this.routingNumber.length === 9;
    }
    
    pay(amount: number): void {
        if (this.validate()) {
            console.log(`Paid $${amount} using Bank Transfer from account ${this.accountNumber}`);
        } else {
            throw new Error("Invalid bank account information");
        }
    }
}

class PaymentProcessor {
    private strategy: PaymentStrategy;
    
    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }
    
    processPayment(amount: number): void {
        try {
            this.strategy.pay(amount);
        } catch (error) {
            console.error("Payment failed:", (error as Error).message);
        }
    }
}

// ===== COMMAND PATTERN =====

interface Command {
    execute(): void;
    undo(): void;
}

class Document {
    private content: string = '';
    
    addText(text: string): void {
        this.content += text;
    }
    
    removeText(length: number): void {
        this.content = this.content.slice(0, -length);
    }
    
    getContent(): string {
        return this.content;
    }
    
    setContent(content: string): void {
        this.content = content;
    }
}

class AddTextCommand implements Command {
    private previousContent: string;
    
    constructor(private document: Document, private text: string) {
        this.previousContent = document.getContent();
    }
    
    execute(): void {
        this.document.addText(this.text);
    }
    
    undo(): void {
        this.document.setContent(this.previousContent);
    }
}

class RemoveTextCommand implements Command {
    private previousContent: string;
    
    constructor(private document: Document, private length: number) {
        this.previousContent = document.getContent();
    }
    
    execute(): void {
        this.document.removeText(this.length);
    }
    
    undo(): void {
        this.document.setContent(this.previousContent);
    }
}

class DocumentEditor {
    private history: Command[] = [];
    private currentPosition: number = -1;
    
    constructor(private document: Document) {}
    
    executeCommand(command: Command): void {
        // Remove any commands after current position (for new branch)
        this.history = this.history.slice(0, this.currentPosition + 1);
        
        command.execute();
        this.history.push(command);
        this.currentPosition++;
    }
    
    undo(): void {
        if (this.currentPosition >= 0) {
            const command = this.history[this.currentPosition];
            command.undo();
            this.currentPosition--;
        }
    }
    
    redo(): void {
        if (this.currentPosition < this.history.length - 1) {
            this.currentPosition++;
            const command = this.history[this.currentPosition];
            command.execute();
        }
    }
    
    getContent(): string {
        return this.document.getContent();
    }
}

// ===== DECORATOR PATTERN (NOT TO BE CONFUSED WITH TS DECORATORS) =====

interface Coffee {
    getDescription(): string;
    getCost(): number;
}

class SimpleCoffee implements Coffee {
    getDescription(): string {
        return "Simple coffee";
    }
    
    getCost(): number {
        return 2.00;
    }
}

abstract class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) {}
    
    getDescription(): string {
        return this.coffee.getDescription();
    }
    
    getCost(): number {
        return this.coffee.getCost();
    }
}

class MilkDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.coffee.getDescription() + ", milk";
    }
    
    getCost(): number {
        return this.coffee.getCost() + 0.5;
    }
}

class SugarDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.coffee.getDescription() + ", sugar";
    }
    
    getCost(): number {
        return this.coffee.getCost() + 0.25;
    }
}

class WhipDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.coffee.getDescription() + ", whipped cream";
    }
    
    getCost(): number {
        return this.coffee.getCost() + 0.75;
    }
}

// ===== BUILDER PATTERN =====

class QueryBuilder {
    private query: string = '';
    private conditions: string[] = [];
    private orderBy: string = '';
    private limitValue: number = 0;
    
    select(columns: string | string[]): QueryBuilder {
        const cols = Array.isArray(columns) ? columns.join(', ') : columns;
        this.query = `SELECT ${cols}`;
        return this;
    }
    
    from(table: string): QueryBuilder {
        this.query += ` FROM ${table}`;
        return this;
    }
    
    where(condition: string): QueryBuilder {
        this.conditions.push(condition);
        return this;
    }
    
    orderByColumn(column: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
        this.orderBy = ` ORDER BY ${column} ${direction}`;
        return this;
    }
    
    limit(count: number): QueryBuilder {
        this.limitValue = count;
        return this;
    }
    
    build(): string {
        let finalQuery = this.query;
        
        if (this.conditions.length > 0) {
            finalQuery += ` WHERE ${this.conditions.join(' AND ')}`;
        }
        
        if (this.orderBy) {
            finalQuery += this.orderBy;
        }
        
        if (this.limitValue > 0) {
            finalQuery += ` LIMIT ${this.limitValue}`;
        }
        
        return finalQuery;
    }
}

// ===== CHAIN OF RESPONSIBILITY PATTERN =====

abstract class Handler {
    protected next: Handler | null = null;
    
    setNext(handler: Handler): Handler {
        this.next = handler;
        return handler;
    }
    
    handle(request: any): any {
        if (this.canHandle(request)) {
            return this.process(request);
        } else if (this.next) {
            return this.next.handle(request);
        } else {
            throw new Error("No handler can process this request");
        }
    }
    
    protected abstract canHandle(request: any): boolean;
    protected abstract process(request: any): any;
}

interface AuthRequest {
    token: string;
    permissions: string[];
}

class TokenValidationHandler extends Handler {
    protected canHandle(request: AuthRequest): boolean {
        return !!request.token;
    }
    
    protected process(request: AuthRequest): AuthRequest {
        console.log("Validating token...");
        if (request.token === "invalid") {
            throw new Error("Invalid token");
        }
        console.log("Token validated");
        return request;
    }
}

class PermissionHandler extends Handler {
    constructor(private requiredPermission: string) {
        super();
    }
    
    protected canHandle(request: AuthRequest): boolean {
        return request.permissions.length > 0;
    }
    
    protected process(request: AuthRequest): AuthRequest {
        console.log(`Checking permission: ${this.requiredPermission}`);
        if (!request.permissions.includes(this.requiredPermission)) {
            throw new Error(`Missing permission: ${this.requiredPermission}`);
        }
        console.log("Permission granted");
        return request;
    }
}

class LoggingHandler extends Handler {
    protected canHandle(request: AuthRequest): boolean {
        return true; // Always handles
    }
    
    protected process(request: AuthRequest): AuthRequest {
        console.log("Logging request...");
        console.log(`User authorized with permissions: ${request.permissions.join(', ')}`);
        return request;
    }
}

// ===== EXAMPLES AND DEMONSTRATIONS =====

function demonstratePatterns() {
    console.log("=== Advanced Design Patterns Demo ===");
    
    // Singleton Pattern
    console.log("\n--- Singleton Pattern ---");
    const db1 = DatabaseConnection.getInstance("postgresql://localhost:5432/mydb");
    const db2 = DatabaseConnection.getInstance();
    
    console.log("Same instance?", db1 === db2);
    db1.connect();
    db2.query("SELECT * FROM users");
    
    // Factory Pattern
    console.log("\n--- Factory Pattern ---");
    const emailNotif = NotificationFactory.createNotification('email', 'user@example.com');
    const smsNotif = NotificationFactory.createNotification('sms', '+1234567890');
    const pushNotif = NotificationFactory.createNotification('push', 'device123');
    
    emailNotif.send("Welcome to our service!");
    smsNotif.send("Your code is 123456");
    pushNotif.send("You have a new message");
    
    // Observer Pattern
    console.log("\n--- Observer Pattern ---");
    const activityTracker = new UserActivityTracker();
    const analyticsService = new AnalyticsService();
    const notificationService = new NotificationService();
    
    activityTracker.attach(analyticsService);
    activityTracker.attach(notificationService);
    
    activityTracker.logActivity("user123", "login");
    activityTracker.logActivity("user123", "view_profile");
    
    // Strategy Pattern
    console.log("\n--- Strategy Pattern ---");
    const creditCard = new CreditCardPayment("1234567890123456", "123");
    const paypal = new PayPalPayment("user@example.com");
    const bankTransfer = new BankTransferPayment("12345678", "123456789");
    
    const paymentProcessor = new PaymentProcessor(creditCard);
    paymentProcessor.processPayment(100);
    
    paymentProcessor.setStrategy(paypal);
    paymentProcessor.processPayment(50);
    
    paymentProcessor.setStrategy(bankTransfer);
    paymentProcessor.processPayment(75);
    
    // Command Pattern
    console.log("\n--- Command Pattern ---");
    const document = new Document();
    const editor = new DocumentEditor(document);
    
    const addHello = new AddTextCommand(document, "Hello ");
    const addWorld = new AddTextCommand(document, "World!");
    const removeChars = new RemoveTextCommand(document, 6);
    
    editor.executeCommand(addHello);
    console.log("Content:", editor.getContent());
    
    editor.executeCommand(addWorld);
    console.log("Content:", editor.getContent());
    
    editor.executeCommand(removeChars);
    console.log("Content after remove:", editor.getContent());
    
    editor.undo();
    console.log("Content after undo:", editor.getContent());
    
    editor.redo();
    console.log("Content after redo:", editor.getContent());
    
    // Decorator Pattern
    console.log("\n--- Decorator Pattern ---");
    let coffee: Coffee = new SimpleCoffee();
    console.log(`${coffee.getDescription()}: $${coffee.getCost()}`);
    
    coffee = new MilkDecorator(coffee);
    console.log(`${coffee.getDescription()}: $${coffee.getCost()}`);
    
    coffee = new SugarDecorator(coffee);
    console.log(`${coffee.getDescription()}: $${coffee.getCost()}`);
    
    coffee = new WhipDecorator(coffee);
    console.log(`${coffee.getDescription()}: $${coffee.getCost()}`);
    
    // Builder Pattern
    console.log("\n--- Builder Pattern ---");
    const query = new QueryBuilder()
        .select(['name', 'email', 'age'])
        .from('users')
        .where('age > 18')
        .where('status = "active"')
        .orderByColumn('name', 'ASC')
        .limit(10)
        .build();
    
    console.log("Generated query:", query);
    
    // Chain of Responsibility Pattern
    console.log("\n--- Chain of Responsibility Pattern ---");
    const tokenHandler = new TokenValidationHandler();
    const permissionHandler = new PermissionHandler('read');
    const loggingHandler = new LoggingHandler();
    
    // Set up the chain
    tokenHandler.setNext(permissionHandler).setNext(loggingHandler);
    
    try {
        const request: AuthRequest = {
            token: "valid_token_123",
            permissions: ['read', 'write']
        };
        
        tokenHandler.handle(request);
        console.log("Request processed successfully");
    } catch (error) {
        console.error("Request failed:", (error as Error).message);
    }
    
    // Test with invalid request
    try {
        const invalidRequest: AuthRequest = {
            token: "valid_token_123",
            permissions: ['write'] // Missing 'read' permission
        };
        
        tokenHandler.handle(invalidRequest);
    } catch (error) {
        console.error("Request failed:", (error as Error).message);
    }
}

// ===== ADVANCED TYPE PATTERNS =====

// Type-safe Event Emitter
type EventMap = Record<string, any[]>;

class TypedEventEmitter<T extends EventMap> {
    private listeners: {
        [K in keyof T]?: ((...args: T[K]) => void)[]
    } = {};
    
    on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(listener);
    }
    
    emit<K extends keyof T>(event: K, ...args: T[K]): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.forEach(listener => listener(...args));
        }
    }
    
    off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            const index = eventListeners.indexOf(listener);
            if (index > -1) {
                eventListeners.splice(index, 1);
            }
        }
    }
}

// Usage example
interface AppEvents {
    'user:login': [string, Date];
    'user:logout': [string];
    'data:update': [number, any];
    'error': [Error];
}

console.log("\n--- Typed Event Emitter ---");
const appEmitter = new TypedEventEmitter<AppEvents>();

appEmitter.on('user:login', (userId, timestamp) => {
    console.log(`User ${userId} logged in at ${timestamp}`);
});

appEmitter.on('error', (error) => {
    console.log(`Error occurred: ${error.message}`);
});

appEmitter.emit('user:login', 'user123', new Date());
appEmitter.emit('error', new Error('Something went wrong'));

// Run all demonstrations
demonstratePatterns();

console.log("\nAdvanced design patterns demonstration complete!");