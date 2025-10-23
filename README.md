# TypeScript 0 to Hero Tutorial

A comprehensive guide to mastering TypeScript from absolute beginner to advanced level.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic TypeScript](#basic-typescript)
3. [Intermediate TypeScript](#intermediate-typescript)
4. [Advanced TypeScript](#advanced-typescript)
5. [Project Structure](#project-structure)

## Getting Started

### Prerequisites
- Basic knowledge of JavaScript
- Node.js installed on your machine

### Installation
```bash
npm install -g typescript
npm install -g ts-node
```

### Project Setup
```bash
tsc --init  # Creates tsconfig.json
```

## Basic TypeScript

### 1. Variables and Basic Types
- [01-variables.ts](./examples/01-basic/01-variables.ts) - Variable declarations and basic types
- [02-functions.ts](./examples/01-basic/02-functions.ts) - Function types and parameters
- [03-arrays-objects.ts](./examples/01-basic/03-arrays-objects.ts) - Arrays and object types

### 2. Type Annotations
- [04-type-annotations.ts](./examples/01-basic/04-type-annotations.ts) - Explicit type annotations
- [05-union-literal.ts](./examples/01-basic/05-union-literal.ts) - Union and literal types

## Intermediate TypeScript

### 3. Interfaces and Types
- [06-interfaces.ts](./examples/02-intermediate/06-interfaces.ts) - Interface definitions
- [07-type-aliases.ts](./examples/02-intermediate/07-type-aliases.ts) - Type aliases vs interfaces
- [08-extending-interfaces.ts](./examples/02-intermediate/08-extending-interfaces.ts) - Interface inheritance

### 4. Classes and OOP
- [09-classes.ts](./examples/02-intermediate/09-classes.ts) - Class basics
- [10-inheritance.ts](./examples/02-intermediate/10-inheritance.ts) - Class inheritance
- [11-access-modifiers.ts](./examples/02-intermediate/11-access-modifiers.ts) - Public, private, protected

### 5. Generics
- [12-basic-generics.ts](./examples/02-intermediate/12-basic-generics.ts) - Generic functions and classes
- [13-generic-constraints.ts](./examples/02-intermediate/13-generic-constraints.ts) - Generic constraints

## Advanced TypeScript

### 6. Advanced Types
- [14-mapped-types.ts](./examples/03-advanced/14-mapped-types.ts) - Mapped types
- [15-conditional-types.ts](./examples/03-advanced/15-conditional-types.ts) - Conditional types
- [16-utility-types.ts](./examples/03-advanced/16-utility-types.ts) - Built-in utility types

### 7. Modules and Namespaces
- [17-modules.ts](./examples/03-advanced/17-modules.ts) - ES6 modules
- [18-namespaces.ts](./examples/03-advanced/18-namespaces.ts) - TypeScript namespaces

### 8. Decorators and Metaprogramming
- [19-decorators.ts](./examples/03-advanced/19-decorators.ts) - Class and method decorators
- [20-advanced-patterns.ts](./examples/03-advanced/20-advanced-patterns.ts) - Advanced design patterns

## Project Structure
```
typescript-tutorial/
├── examples/
│   ├── 01-basic/          # Basic TypeScript concepts
│   ├── 02-intermediate/   # Intermediate concepts
│   └── 03-advanced/       # Advanced concepts
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
└── README.md             # This file
```

## Running the Examples

```bash
# Compile and run a specific file
ts-node examples/01-basic/01-variables.ts

# Compile all files
tsc

# Watch mode for development
tsc --watch
```

## 🚀 How to Use:

  Installation:

```
  npm install
```

  Run Individual Examples:

```
  npm run run:basic          # Variables & types
  npm run run:functions      # Functions & parameters  
  npm run run:classes        # Classes & OOP
  npm run run:generics       # Generics
  npm run run:decorators     # Decorators
  npm run run:patterns       # Design patterns
```

  Run All Examples by Category:

```
  npm run run:all-basic         # All 5 basic examples
  npm run run:all-intermediate  # All 8 intermediate examples  
  npm run run:all-advanced      # All 7 advanced examples
  npm run run:all              # All 20 examples
```

  Build & Development:

```
  npm run build        # Build for production
  npm run type-check   # Check types only
  npm run lint         # Check code quality
  npm run format       # Format code
```



Continue your journey by building projects and exploring TypeScript with popular frameworks like React, Node.js, or Angular.