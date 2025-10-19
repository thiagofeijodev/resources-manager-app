import { loadStorage } from '../loadStorage';

describe('loadStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should return null when key does not exist', () => {
    const result = loadStorage('nonexistent');
    expect(result).toBeNull();
  });

  test('should return parsed JSON when key exists', () => {
    const testData = { name: 'test', value: 123 };
    localStorage.setItem('testKey', JSON.stringify(testData));

    const result = loadStorage('testKey');
    expect(result).toEqual(testData);
  });

  test('should handle empty object', () => {
    localStorage.setItem('emptyKey', JSON.stringify({}));

    const result = loadStorage('emptyKey');
    expect(result).toEqual({});
  });

  test('should handle array data', () => {
    const testArray = [1, 2, 3, 4, 5];
    localStorage.setItem('arrayKey', JSON.stringify(testArray));

    const result = loadStorage('arrayKey');
    expect(result).toEqual(testArray);
  });

  test('should handle string data', () => {
    const testString = 'test string';
    localStorage.setItem('stringKey', JSON.stringify(testString));

    const result = loadStorage('stringKey');
    expect(result).toBe(testString);
  });
});
