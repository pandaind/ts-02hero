// Jest setup file
// This file runs before all tests

// Global test timeout
jest.setTimeout(10000);

// Mock console methods if needed for cleaner test output
// jest.spyOn(console, 'log').mockImplementation(() => {});
// jest.spyOn(console, 'warn').mockImplementation(() => {});
// jest.spyOn(console, 'error').mockImplementation(() => {});

// Global test utilities
global.testUtils = {
    delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
    
    mockConsole: () => {
        const originalConsole = { ...console };
        const mockConsole = {
            log: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
            info: jest.fn(),
            debug: jest.fn()
        };
        
        Object.assign(console, mockConsole);
        
        return {
            restore: () => Object.assign(console, originalConsole),
            mocks: mockConsole
        };
    }
};

// Extend Jest matchers if needed
declare global {
    namespace jest {
        interface Matchers<R> {
            // Custom matchers can be defined here
        }
    }
    
    // Global test utilities type definition
    const testUtils: {
        delay: (ms: number) => Promise<void>;
        mockConsole: () => {
            restore: () => void;
            mocks: {
                log: jest.Mock;
                warn: jest.Mock;
                error: jest.Mock;
                info: jest.Mock;
                debug: jest.Mock;
            };
        };
    };
}