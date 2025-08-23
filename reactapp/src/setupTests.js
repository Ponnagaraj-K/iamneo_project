import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Reset fetch mock before each test
beforeEach(() => {
  fetchMock.resetMocks();
});