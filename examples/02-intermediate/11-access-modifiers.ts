// 11-access-modifiers.ts - Access Modifiers (public, private, protected)

// ===== PUBLIC ACCESS MODIFIER =====

class PublicExample {
    public name: string; // Explicitly public (default)
    age: number; // Implicitly public
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    // Public method (default)
    public greet(): string {
        return `Hello, I'm ${this.name}`;
    }
    
    // Implicitly public method
    getAge(): number {
        return this.age;
    }
}

// ===== PRIVATE ACCESS MODIFIER =====

class PrivateExample {
    private secretId: number;
    private internalState: string = "initialized";
    
    constructor(private password: string, id: number) { // Private parameter property
        this.secretId = id;
    }
    
    // Private method
    private validatePassword(password: string): boolean {
        return password === this.password;
    }
    
    // Public method that uses private members
    public authenticate(inputPassword: string): boolean {
        if (this.validatePassword(inputPassword)) {
            this.internalState = "authenticated";
            return true;
        }
        this.internalState = "authentication_failed";
        return false;
    }
    
    // Public getter for private property
    public getStatus(): string {
        return this.internalState;
    }
    
    // Cannot access private members from outside
    // getSecretId(): number {
    //     return this.secretId; // This would be accessible
    // }
}

// ===== PROTECTED ACCESS MODIFIER =====

class ProtectedExample {
    protected familySecret: string = "Secret recipe";
    protected familyName: string;
    private socialSecurityNumber: string; // Private - not inherited
    
    constructor(familyName: string, ssn: string) {
        this.familyName = familyName;
        this.socialSecurityNumber = ssn;
    }
    
    protected getFamilySecret(): string {
        return this.familySecret;
    }
    
    public getPublicInfo(): string {
        return `Family: ${this.familyName}`;
    }
}

class Child extends ProtectedExample {
    private personalSecret: string = "My diary";
    
    constructor(familyName: string, ssn: string, private firstName: string) {
        super(familyName, ssn);
    }
    
    // Can access protected members from parent
    public shareSecretWithTrustedFriend(): string {
        return `Don't tell anyone, but our ${this.getFamilySecret()}`;
    }
    
    public getFullName(): string {
        return `${this.firstName} ${this.familyName}`; // Can access protected familyName
    }
    
    // Cannot access private members from parent
    // public getSSN(): string {
    //     return this.socialSecurityNumber; // Error: Property is private
    // }
}

// ===== READONLY MODIFIER =====

class ReadonlyExample {
    readonly id: number;
    readonly createdAt: Date;
    public name: string;
    
    constructor(id: number, name: string) {
        this.id = id; // Can only be assigned in constructor
        this.createdAt = new Date(); // Can only be assigned in constructor
        this.name = name;
    }
    
    public updateName(newName: string): void {
        this.name = newName; // OK - not readonly
        // this.id = 123; // Error: Cannot assign to readonly property
    }
}

// ===== PARAMETER PROPERTIES =====

class ParameterProperties {
    // Parameter properties automatically create and initialize properties
    constructor(
        public name: string,           // Creates public name property
        private age: number,           // Creates private age property
        protected department: string,   // Creates protected department property
        readonly id: number            // Creates readonly id property
    ) {
        // No need for manual property assignment
    }
    
    public getInfo(): string {
        return `${this.name} (${this.age}) works in ${this.department}`;
    }
    
    public getId(): number {
        return this.id;
    }
}

// ===== STATIC MEMBERS WITH ACCESS MODIFIERS =====

class StaticAccessExample {
    public static publicStaticProperty: string = "Available to all";
    private static privateStaticProperty: string = "Only within class";
    protected static protectedStaticProperty: string = "Available to subclasses";
    
    private static instanceCount: number = 0;
    
    constructor(public name: string) {
        StaticAccessExample.instanceCount++;
    }
    
    public static getPublicStatic(): string {
        return StaticAccessExample.publicStaticProperty;
    }
    
    private static getPrivateStatic(): string {
        return StaticAccessExample.privateStaticProperty;
    }
    
    public static getInstanceCount(): number {
        return StaticAccessExample.instanceCount;
    }
    
    public getPrivateStaticFromInstance(): string {
        // Can access private static from instance method
        return StaticAccessExample.getPrivateStatic();
    }
}

class StaticChild extends StaticAccessExample {
    constructor(name: string) {
        super(name);
    }
    
    public getProtectedStatic(): string {
        // Can access protected static from subclass
        return StaticAccessExample.protectedStaticProperty;
    }
    
    // Cannot access private static from subclass
    // public getPrivateStatic(): string {
    //     return StaticAccessExample.privateStaticProperty; // Error
    // }
}

// ===== GETTERS AND SETTERS WITH ACCESS MODIFIERS =====

class GetterSetterAccess {
    private _value: number = 0;
    private _isLocked: boolean = false;
    
    // Public getter
    public get value(): number {
        return this._value;
    }
    
    // Public setter with validation
    public set value(newValue: number) {
        if (this._isLocked) {
            throw new Error("Value is locked and cannot be changed");
        }
        if (newValue < 0) {
            throw new Error("Value cannot be negative");
        }
        this._value = newValue;
    }
    
    // Protected getter
    protected get isLocked(): boolean {
        return this._isLocked;
    }
    
    // Private setter
    private set isLocked(locked: boolean) {
        this._isLocked = locked;
    }
    
    public lock(): void {
        this.isLocked = true;
    }
    
    public unlock(): void {
        this.isLocked = false;
    }
}

// ===== REAL-WORLD EXAMPLE: BANK ACCOUNT =====

class BankAccount {
    private balance: number = 0;
    private accountNumber: string;
    private pin: string;
    protected accountType: string;
    public readonly accountHolder: string;
    
    private static nextAccountNumber: number = 1000;
    
    constructor(accountHolder: string, initialDeposit: number, pin: string, accountType: string = "Savings") {
        this.accountHolder = accountHolder;
        this.accountNumber = `ACC${BankAccount.nextAccountNumber++}`;
        this.pin = pin;
        this.accountType = accountType;
        
        if (initialDeposit > 0) {
            this.balance = initialDeposit;
        }
    }
    
    private validatePin(inputPin: string): boolean {
        return this.pin === inputPin;
    }
    
    protected logTransaction(type: string, amount: number): void {
        console.log(`[${new Date().toISOString()}] ${this.accountNumber}: ${type} $${amount}`);
    }
    
    public deposit(amount: number): boolean {
        if (amount <= 0) {
            console.log("Invalid deposit amount");
            return false;
        }
        this.balance += amount;
        this.logTransaction("DEPOSIT", amount);
        return true;
    }
    
    public withdraw(amount: number, pin: string): boolean {
        if (!this.validatePin(pin)) {
            console.log("Invalid PIN");
            return false;
        }
        
        if (amount <= 0) {
            console.log("Invalid withdrawal amount");
            return false;
        }
        
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return false;
        }
        
        this.balance -= amount;
        this.logTransaction("WITHDRAWAL", amount);
        return true;
    }
    
    public getBalance(pin: string): number | null {
        if (!this.validatePin(pin)) {
            console.log("Invalid PIN");
            return null;
        }
        return this.balance;
    }
    
    public getAccountInfo(): string {
        return `Account: ${this.accountNumber}, Holder: ${this.accountHolder}, Type: ${this.accountType}`;
    }
}

class CheckingAccount extends BankAccount {
    private overdraftLimit: number = 500;
    
    constructor(accountHolder: string, initialDeposit: number, pin: string, overdraftLimit: number = 500) {
        super(accountHolder, initialDeposit, pin, "Checking");
        this.overdraftLimit = overdraftLimit;
    }
    
    // Override withdraw to allow overdraft
    public withdraw(amount: number, pin: string): boolean {
        if (!this.validatePin(pin)) {
            console.log("Invalid PIN");
            return false;
        }
        
        if (amount <= 0) {
            console.log("Invalid withdrawal amount");
            return false;
        }
        
        const availableAmount = this.getAvailableBalance(pin);
        if (availableAmount === null || amount > availableAmount) {
            console.log("Exceeds overdraft limit");
            return false;
        }
        
        this.balance -= amount;
        this.logTransaction("WITHDRAWAL", amount);
        return true;
    }
    
    private validatePin(inputPin: string): boolean {
        // Same validation logic - need to reimplement because parent's is private
        return inputPin.length >= 4; // Simplified for example
    }
    
    public getAvailableBalance(pin: string): number | null {
        const currentBalance = this.getBalance(pin);
        if (currentBalance === null) return null;
        return currentBalance + this.overdraftLimit;
    }
    
    protected logTransaction(type: string, amount: number): void {
        // Can access protected method from parent
        super.logTransaction(type, amount);
        if (type === "WITHDRAWAL" && this.getBalance("") !== null && this.getBalance("") < 0) {
            console.log("  * Overdraft used");
        }
    }
}

// ===== EXAMPLES =====
console.log("=== Access Modifiers ===");

// Public access
let publicObj = new PublicExample("Alice", 25);
console.log(`Name: ${publicObj.name}`); // Accessible
console.log(`Age: ${publicObj.age}`);   // Accessible
console.log(publicObj.greet());         // Accessible

// Private access
let privateObj = new PrivateExample("secret123", 12345);
// console.log(privateObj.secretId); // Error: Property 'secretId' is private
console.log(`Auth result: ${privateObj.authenticate("secret123")}`);
console.log(`Status: ${privateObj.getStatus()}`);

// Protected access
let parent = new ProtectedExample("Smith", "123-45-6789");
let child = new Child("Smith", "987-65-4321", "John");

console.log(parent.getPublicInfo());
console.log(child.getFullName());
console.log(child.shareSecretWithTrustedFriend());

// Readonly
let readonlyObj = new ReadonlyExample(1, "Test Item");
console.log(`ID: ${readonlyObj.id}, Name: ${readonlyObj.name}`);
readonlyObj.updateName("Updated Item");
console.log(`Updated name: ${readonlyObj.name}`);

// Parameter properties
let paramObj = new ParameterProperties("Jane Doe", 30, "Engineering", 100);
console.log(paramObj.getInfo());
console.log(`ID: ${paramObj.getId()}`);
// console.log(paramObj.age); // Error: Private property

// Static access
console.log(StaticAccessExample.publicStaticProperty); // Accessible
console.log(StaticAccessExample.getPublicStatic());    // Accessible

let static1 = new StaticAccessExample("Instance 1");
let static2 = new StaticAccessExample("Instance 2");
console.log(`Instance count: ${StaticAccessExample.getInstanceCount()}`);
console.log(static1.getPrivateStaticFromInstance());

let staticChild = new StaticChild("Child Instance");
console.log(staticChild.getProtectedStatic());

// Getters and setters
let getterObj = new GetterSetterAccess();
getterObj.value = 42;
console.log(`Value: ${getterObj.value}`);

getterObj.lock();
try {
    getterObj.value = 100; // Will throw error
} catch (e) {
    console.log(`Error: ${(e as Error).message}`);
}

// Bank account example
console.log("\n=== Bank Account Example ===");

let savings = new BankAccount("Alice Johnson", 1000, "1234");
console.log(savings.getAccountInfo());

savings.deposit(500);
console.log(`Balance: $${savings.getBalance("1234")}`);

savings.withdraw(200, "1234");
console.log(`Balance after withdrawal: $${savings.getBalance("1234")}`);

let checking = new CheckingAccount("Bob Smith", 200, "5678", 300);
console.log(checking.getAccountInfo());

checking.withdraw(400, "5678"); // Uses overdraft
console.log(`Available balance: $${checking.getAvailableBalance("5678")}`);

// Demonstrate access control
// console.log(savings.balance);      // Error: Private property
// console.log(savings.accountNumber); // Error: Private property
console.log(`Account holder: ${savings.accountHolder}`); // OK: Public readonly