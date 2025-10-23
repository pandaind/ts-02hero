// TypeScript 0 to Hero Tutorial
// Main entry point

export const TUTORIAL_INFO = {
    name: "TypeScript 0 to Hero",
    version: "1.0.0",
    description: "A comprehensive TypeScript tutorial from beginner to advanced level",
    author: "TypeScript Tutorial",
    examples: {
        basic: [
            "01-variables.ts - Variables and basic types",
            "02-functions.ts - Functions and parameters",
            "03-arrays-objects.ts - Arrays and objects",
            "04-type-annotations.ts - Type annotations and inference",
            "05-union-literal.ts - Union and literal types"
        ],
        intermediate: [
            "06-interfaces.ts - Interface definitions",
            "07-type-aliases.ts - Type aliases vs interfaces",
            "08-extending-interfaces.ts - Interface inheritance",
            "09-classes.ts - Class basics and OOP",
            "10-inheritance.ts - Class inheritance",
            "11-access-modifiers.ts - Public, private, protected",
            "12-basic-generics.ts - Generic functions and classes",
            "13-generic-constraints.ts - Generic constraints"
        ],
        advanced: [
            "14-mapped-types.ts - Mapped types",
            "15-conditional-types.ts - Conditional types",
            "16-utility-types.ts - Built-in utility types",
            "17-modules.ts - ES6 modules",
            "18-namespaces.ts - TypeScript namespaces",
            "19-decorators.ts - Class and method decorators",
            "20-advanced-patterns.ts - Advanced design patterns"
        ]
    }
};

export function welcome(): string {
    return `
🎉 Welcome to ${TUTORIAL_INFO.name}!

This tutorial covers ${TUTORIAL_INFO.examples.basic.length + TUTORIAL_INFO.examples.intermediate.length + TUTORIAL_INFO.examples.advanced.length} comprehensive examples.

📚 Examples available:
• ${TUTORIAL_INFO.examples.basic.length} Basic examples
• ${TUTORIAL_INFO.examples.intermediate.length} Intermediate examples  
• ${TUTORIAL_INFO.examples.advanced.length} Advanced examples

🚀 To run examples:
npm run run:basic       # Run basic variable example
npm run run:all-basic   # Run all basic examples
npm run run:all         # Run all examples

Happy learning! 🎯
`;
}

// Export for use in other modules
export default TUTORIAL_INFO;

// Main execution when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    console.log(welcome());
}