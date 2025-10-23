// 18-namespaces.ts - TypeScript Namespaces

// ===== BASIC NAMESPACE =====

namespace BasicMath {
    export const PI = 3.14159;
    export const E = 2.71828;
    
    export function add(a: number, b: number): number {
        return a + b;
    }
    
    export function subtract(a: number, b: number): number {
        return a - b;
    }
    
    // Private function (not exported)
    function privateHelper(value: number): number {
        return value * 2;
    }
    
    export function double(value: number): number {
        return privateHelper(value);
    }
}

// ===== NESTED NAMESPACES =====

namespace Geometry {
    export namespace TwoD {
        export interface Point {
            x: number;
            y: number;
        }
        
        export interface Rectangle {
            topLeft: Point;
            width: number;
            height: number;
        }
        
        export class Circle {
            constructor(public center: Point, public radius: number) {}
            
            getArea(): number {
                return Math.PI * this.radius * this.radius;
            }
            
            getCircumference(): number {
                return 2 * Math.PI * this.radius;
            }
            
            contains(point: Point): boolean {
                const dx = point.x - this.center.x;
                const dy = point.y - this.center.y;
                return Math.sqrt(dx * dx + dy * dy) <= this.radius;
            }
        }
        
        export function distance(p1: Point, p2: Point): number {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        
        export function rectangleArea(rect: Rectangle): number {
            return rect.width * rect.height;
        }
    }
    
    export namespace ThreeD {
        export interface Point3D {
            x: number;
            y: number;
            z: number;
        }
        
        export interface Cube {
            origin: Point3D;
            sideLength: number;
        }
        
        export class Sphere {
            constructor(public center: Point3D, public radius: number) {}
            
            getVolume(): number {
                return (4/3) * Math.PI * Math.pow(this.radius, 3);
            }
            
            getSurfaceArea(): number {
                return 4 * Math.PI * this.radius * this.radius;
            }
        }
        
        export function distance(p1: Point3D, p2: Point3D): number {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dz = p2.z - p1.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        
        export function cubeVolume(cube: Cube): number {
            return Math.pow(cube.sideLength, 3);
        }
    }
    
    // Shared utilities across both 2D and 3D
    export namespace Utils {
        export function degreesToRadians(degrees: number): number {
            return degrees * (Math.PI / 180);
        }
        
        export function radiansToDegrees(radians: number): number {
            return radians * (180 / Math.PI);
        }
        
        export function clamp(value: number, min: number, max: number): number {
            return Math.min(Math.max(value, min), max);
        }
    }
}

// ===== NAMESPACE WITH CLASSES AND INTERFACES =====

namespace DataStructures {
    export interface IStack<T> {
        push(item: T): void;
        pop(): T | undefined;
        peek(): T | undefined;
        isEmpty(): boolean;
        size(): number;
    }
    
    export interface IQueue<T> {
        enqueue(item: T): void;
        dequeue(): T | undefined;
        front(): T | undefined;
        isEmpty(): boolean;
        size(): number;
    }
    
    export class Stack<T> implements IStack<T> {
        private items: T[] = [];
        
        push(item: T): void {
            this.items.push(item);
        }
        
        pop(): T | undefined {
            return this.items.pop();
        }
        
        peek(): T | undefined {
            return this.items[this.items.length - 1];
        }
        
        isEmpty(): boolean {
            return this.items.length === 0;
        }
        
        size(): number {
            return this.items.length;
        }
    }
    
    export class Queue<T> implements IQueue<T> {
        private items: T[] = [];
        
        enqueue(item: T): void {
            this.items.push(item);
        }
        
        dequeue(): T | undefined {
            return this.items.shift();
        }
        
        front(): T | undefined {
            return this.items[0];
        }
        
        isEmpty(): boolean {
            return this.items.length === 0;
        }
        
        size(): number {
            return this.items.length;
        }
    }
    
    class Node<T> {
        constructor(public data: T, public next: Node<T> | null = null) {}
    }
    
    export class LinkedList<T> {
        private head: Node<T> | null = null;
        private length: number = 0;
        
        append(data: T): void {
            const newNode = new Node(data);
            
            if (!this.head) {
                this.head = newNode;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
            }
            this.length++;
        }
        
        prepend(data: T): void {
            const newNode = new Node(data, this.head);
            this.head = newNode;
            this.length++;
        }
        
        get(index: number): T | null {
            if (index < 0 || index >= this.length) {
                return null;
            }
            
            let current = this.head;
            for (let i = 0; i < index; i++) {
                current = current!.next;
            }
            return current!.data;
        }
        
        size(): number {
            return this.length;
        }
        
        toArray(): T[] {
            const result: T[] = [];
            let current = this.head;
            while (current) {
                result.push(current.data);
                current = current.next;
            }
            return result;
        }
    }
}

// ===== NAMESPACE MERGING =====

namespace Logger {
    export enum LogLevel {
        DEBUG = 0,
        INFO = 1,
        WARN = 2,
        ERROR = 3
    }
    
    export interface LogEntry {
        level: LogLevel;
        message: string;
        timestamp: Date;
        context?: string;
    }
}

// Same namespace name - TypeScript will merge them
namespace Logger {
    let currentLevel: LogLevel = LogLevel.INFO;
    const logs: LogEntry[] = [];
    
    export function setLevel(level: LogLevel): void {
        currentLevel = level;
    }
    
    export function log(level: LogLevel, message: string, context?: string): void {
        if (level >= currentLevel) {
            const entry: LogEntry = {
                level,
                message,
                timestamp: new Date(),
                context
            };
            logs.push(entry);
            console.log(`[${LogLevel[level]}] ${message}${context ? ` (${context})` : ''}`);
        }
    }
    
    export function debug(message: string, context?: string): void {
        log(LogLevel.DEBUG, message, context);
    }
    
    export function info(message: string, context?: string): void {
        log(LogLevel.INFO, message, context);
    }
    
    export function warn(message: string, context?: string): void {
        log(LogLevel.WARN, message, context);
    }
    
    export function error(message: string, context?: string): void {
        log(LogLevel.ERROR, message, context);
    }
    
    export function getLogs(): LogEntry[] {
        return [...logs];
    }
    
    export function clearLogs(): void {
        logs.length = 0;
    }
}

// ===== NAMESPACE WITH MODULE PATTERN =====

namespace EventEmitter {
    interface EventMap {
        [eventName: string]: any[];
    }
    
    type EventListener<T extends any[]> = (...args: T) => void;
    
    export class EventEmitter<T extends EventMap = EventMap> {
        private listeners: { [K in keyof T]?: EventListener<T[K]>[] } = {};
        
        on<K extends keyof T>(event: K, listener: EventListener<T[K]>): void {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event]!.push(listener);
        }
        
        off<K extends keyof T>(event: K, listener: EventListener<T[K]>): void {
            const eventListeners = this.listeners[event];
            if (eventListeners) {
                const index = eventListeners.indexOf(listener);
                if (index > -1) {
                    eventListeners.splice(index, 1);
                }
            }
        }
        
        emit<K extends keyof T>(event: K, ...args: T[K]): void {
            const eventListeners = this.listeners[event];
            if (eventListeners) {
                eventListeners.forEach(listener => {
                    listener(...args);
                });
            }
        }
        
        once<K extends keyof T>(event: K, listener: EventListener<T[K]>): void {
            const onceListener = (...args: T[K]) => {
                listener(...args);
                this.off(event, onceListener);
            };
            this.on(event, onceListener);
        }
        
        removeAllListeners<K extends keyof T>(event?: K): void {
            if (event) {
                delete this.listeners[event];
            } else {
                this.listeners = {};
            }
        }
        
        getListenerCount<K extends keyof T>(event: K): number {
            return this.listeners[event]?.length || 0;
        }
    }
    
    export function createEventEmitter<T extends EventMap>(): EventEmitter<T> {
        return new EventEmitter<T>();
    }
}

// ===== NAMESPACE ALIASES =====

namespace AliasExample {
    export namespace VeryLongNamespaceName {
        export namespace AnotherLevel {
            export namespace DeepNesting {
                export function utilityFunction(): string {
                    return "Deep utility function";
                }
                
                export class UtilityClass {
                    getValue(): number {
                        return 42;
                    }
                }
            }
        }
    }
    
    // Create alias for easier access
    export import Deep = VeryLongNamespaceName.AnotherLevel.DeepNesting;
}

// ===== EXAMPLES AND USAGE =====

function demonstrateNamespaces() {
    console.log("=== Namespaces Demo ===");
    
    // Basic namespace usage
    console.log("Basic Math:");
    console.log(`PI: ${BasicMath.PI}`);
    console.log(`Add: ${BasicMath.add(5, 3)}`);
    console.log(`Double: ${BasicMath.double(7)}`);
    
    // Nested namespaces
    console.log("\n2D Geometry:");
    const point1: Geometry.TwoD.Point = { x: 0, y: 0 };
    const point2: Geometry.TwoD.Point = { x: 3, y: 4 };
    console.log(`Distance: ${Geometry.TwoD.distance(point1, point2)}`);
    
    const circle = new Geometry.TwoD.Circle(point1, 5);
    console.log(`Circle area: ${circle.getArea()}`);
    console.log(`Point (2, 2) in circle: ${circle.contains({ x: 2, y: 2 })}`);
    
    console.log("\n3D Geometry:");
    const point3d1: Geometry.ThreeD.Point3D = { x: 0, y: 0, z: 0 };
    const point3d2: Geometry.ThreeD.Point3D = { x: 1, y: 1, z: 1 };
    console.log(`3D Distance: ${Geometry.ThreeD.distance(point3d1, point3d2)}`);
    
    const sphere = new Geometry.ThreeD.Sphere(point3d1, 3);
    console.log(`Sphere volume: ${sphere.getVolume()}`);
    
    // Shared utilities
    console.log(`90 degrees to radians: ${Geometry.Utils.degreesToRadians(90)}`);
    
    // Data structures
    console.log("\nData Structures:");
    const stack = new DataStructures.Stack<string>();
    stack.push("first");
    stack.push("second");
    stack.push("third");
    console.log(`Stack size: ${stack.size()}`);
    console.log(`Stack peek: ${stack.peek()}`);
    console.log(`Stack pop: ${stack.pop()}`);
    
    const queue = new DataStructures.Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    console.log(`Queue front: ${queue.front()}`);
    console.log(`Queue dequeue: ${queue.dequeue()}`);
    console.log(`Queue size: ${queue.size()}`);
    
    const linkedList = new DataStructures.LinkedList<string>();
    linkedList.append("A");
    linkedList.append("B");
    linkedList.prepend("Z");
    console.log(`LinkedList: ${linkedList.toArray().join(" -> ")}`);
    console.log(`LinkedList get(1): ${linkedList.get(1)}`);
    
    // Merged namespace (Logger)
    console.log("\nLogger:");
    Logger.setLevel(Logger.LogLevel.DEBUG);
    Logger.debug("Debug message");
    Logger.info("Info message");
    Logger.warn("Warning message");
    Logger.error("Error message");
    console.log(`Total logs: ${Logger.getLogs().length}`);
    
    // Event emitter
    console.log("\nEvent Emitter:");
    interface MyEvents {
        'user-login': [string, Date];
        'user-logout': [string];
        'data-update': [number, string];
    }
    
    const emitter = new EventEmitter.EventEmitter<MyEvents>();
    
    emitter.on('user-login', (userId, timestamp) => {
        console.log(`User ${userId} logged in at ${timestamp}`);
    });
    
    emitter.on('user-logout', (userId) => {
        console.log(`User ${userId} logged out`);
    });
    
    emitter.emit('user-login', 'user123', new Date());
    emitter.emit('user-logout', 'user123');
    
    console.log(`Login listeners: ${emitter.getListenerCount('user-login')}`);
    
    // Namespace aliases
    console.log("\nNamespace Aliases:");
    console.log(`Deep function: ${AliasExample.Deep.utilityFunction()}`);
    const utilityInstance = new AliasExample.Deep.UtilityClass();
    console.log(`Utility value: ${utilityInstance.getValue()}`);
}

// ===== NAMESPACE DECLARATION MERGING WITH CLASSES =====

class Calculator {
    constructor(public value: number = 0) {}
    
    add(n: number): Calculator {
        this.value += n;
        return this;
    }
    
    multiply(n: number): Calculator {
        this.value *= n;
        return this;
    }
}

namespace Calculator {
    export function create(initialValue?: number): Calculator {
        return new Calculator(initialValue);
    }
    
    export function fromString(str: string): Calculator {
        const value = parseFloat(str) || 0;
        return new Calculator(value);
    }
    
    export const constants = {
        PI: Math.PI,
        E: Math.E
    };
}

// ===== AMBIENT NAMESPACES =====

// This would typically be in a .d.ts file
declare namespace ExternalLibrary {
    interface Config {
        apiKey: string;
        timeout: number;
    }
    
    function initialize(config: Config): void;
    function getData(): Promise<any>;
    
    namespace Utils {
        function format(value: any): string;
        function validate(input: string): boolean;
    }
}

// Usage (assuming the external library is available)
// ExternalLibrary.initialize({ apiKey: "key", timeout: 5000 });

console.log("=== Running Namespace Demonstrations ===");
demonstrateNamespaces();

// Calculator with namespace
console.log("\nCalculator with namespace:");
const calc1 = Calculator.create(10);
console.log(`Calculator result: ${calc1.add(5).multiply(2).value}`);

const calc2 = Calculator.fromString("15");
console.log(`Calculator from string: ${calc2.add(10).value}`);
console.log(`Calculator constants - PI: ${Calculator.constants.PI}`);

console.log("Namespace demonstration complete!");