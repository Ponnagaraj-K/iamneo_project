// src/setupTests.js
import '@testing-library/jest-dom';

// Force mock canvas so Jest never loads the native binary
jest.mock('canvas', () => ({}));

