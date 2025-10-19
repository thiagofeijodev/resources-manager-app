# Testing Guide

## Overview

This project uses **Jest** and **React Testing Library** for automated testing. Tests are organized following the component/function structure and use the `__tests__` directory convention.

## Running Tests

### Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- loadStorage.test.js

# Run tests matching a pattern
npm test -- --testNamePattern="should render"
```

### CI/CD

```bash
# Run tests in CI mode (for GitHub Actions or similar)
npm run test:ci
```

## Test Structure

Tests are organized in `__tests__` directories alongside their implementation files:

```
src/
├── functions/
│   ├── loadStorage.js
│   └── __tests__/
│       └── loadStorage.test.js
├── components/
│   ├── List/
│   │   ├── index.jsx
│   │   └── __tests__/
│   │       └── List.test.jsx
│   └── RestoreBackup/
│       ├── index.js
│       └── __tests__/
│           └── RestoreBackup.test.jsx
```

## Test Coverage Goals

- **Statements**: 50%
- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%

These thresholds are configured in `jest.config.js` and can be adjusted as needed.

## Existing Tests

### 1. **loadStorage.test.js** - Utility Function Tests

Tests for the `loadStorage` function that reads from localStorage:

- ✅ Returns `null` when key doesn't exist
- ✅ Parses and returns JSON data correctly
- ✅ Handles empty objects
- ✅ Handles array data
- ✅ Handles string data

**Run:** `npm test -- loadStorage.test.js`

### 2. **List.test.jsx** - Component Tests

Tests for the `List` component which displays items with add/edit modal functionality:

- ✅ Renders with title and items
- ✅ Opens modal when add button is clicked
- ✅ Closes modal when close button is clicked
- ✅ Opens modal with selected item when list item is clicked
- ✅ Renders empty list when no items provided

**Run:** `npm test -- List.test.jsx`

### 3. **RestoreBackup.test.jsx** - Component Tests

Tests for the `RestoreBackup` component which handles file uploads and localStorage restoration:

- ✅ Renders file uploader
- ✅ Accepts only JSON files
- ✅ Parses and restores valid JSON backup files
- ✅ Only restores valid backup keys (history, resource)
- ✅ Handles file read errors gracefully
- ✅ Initializes with empty file rows

**Run:** `npm test -- RestoreBackup.test.jsx`

## Writing New Tests

### Example: Testing a Utility Function

```javascript
import { myFunction } from '../myFunction';

describe('myFunction', () => {
  test('should do something specific', () => {
    const result = myFunction(input);
    expect(result).toBe(expectedOutput);
  });
});
```

### Example: Testing a React Component

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  test('should render correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('should handle button clicks', () => {
    render(<MyComponent />);
    fireEvent.click(screen.getByRole('button'));
    // Add assertions
  });
});
```

## Debugging Tests

### Run a Single Test

```bash
npm test -- --testNamePattern="should render correctly"
```

### Debug Mode

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome DevTools.

### Print Debug Info in Tests

```javascript
import { screen } from '@testing-library/react';

test('debug test', () => {
  render(<MyComponent />);
  screen.debug(); // Prints the DOM
});
```

## Best Practices

1. **One assertion per test** - Makes tests easier to understand and maintain
2. **Descriptive test names** - Use "should" format: `should render correctly`
3. **Arrange-Act-Assert** - Structure tests clearly:
   ```javascript
   test('example', () => {
     // Arrange
     const data = { id: 1 };
     // Act
     const result = myFunction(data);
     // Assert
     expect(result).toBe(expected);
   });
   ```
4. **Mock external dependencies** - Use `jest.mock()` for complex dependencies
5. **Clean up after tests** - Use `beforeEach()` and `afterEach()` hooks

## Troubleshooting

### "Module not found" in tests

Make sure the `moduleNameMapper` in `jest.config.js` includes the path alias:

```javascript
moduleNameMapper: {
  '^functions(.*)$': '<rootDir>/src/functions$1',
}
```

### Tests fail due to CSS imports

CSS imports are mocked to `identity-obj-proxy` in Jest config. Make sure it's installed:

```bash
npm install --save-dev identity-obj-proxy
```

### localStorage is undefined

localStorage is automatically mocked in the Jest environment (jsdom). For manual mocking, see `jest.setup.js`.

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
