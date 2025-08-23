import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Mock fetch globally for tests
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});