/**
 * @jest-environment jsdom
 */

import movieCounter from '../modules/movieCounter.js';

describe('movie counter test', () => {
  test('add an array of length 5 to return 5', () => {
    const arr = [2, 4, 5, 6, 7];
    const element = document.createElement('a');
    expect(movieCounter(arr, element)).toBe('Movies(5)');
  });
  test('add an empty array to return 0', () => {
    const arr = [];
    const element = document.createElement('a');
    expect(movieCounter(arr, element)).toBe('Movies(0)');
  });
});
