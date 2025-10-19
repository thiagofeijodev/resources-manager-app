import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock localStorage with actual storage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = String(value);
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

global.localStorage = localStorageMock;

// Mock FileReader with proper file reading
global.FileReader = class FileReader {
  readAsText(file) {
    const self = this;

    // Try multiple methods to get file content
    const readContent = () => {
      try {
        // Method 1: Check if test content is available
        if (file._testContent !== undefined) {
          return Promise.resolve(file._testContent);
        }

        // Method 2: Try arrayBuffer method
        if (typeof file.arrayBuffer === 'function') {
          return file.arrayBuffer().then((buffer) => {
            const decoder = new TextDecoder();
            return decoder.decode(buffer);
          });
        }

        // Method 3: Try stream method
        if (typeof file.stream === 'function') {
          const stream = file.stream();
          const reader = stream.getReader();
          const chunks = [];

          return reader.read().then(function processChunk({ done, value }) {
            if (done) {
              const decoder = new TextDecoder();
              const bytes = new Uint8Array(chunks.reduce((acc, chunk) => [...acc, ...chunk], []));
              return decoder.decode(bytes);
            }
            chunks.push(Array.from(value));
            return reader.read().then(processChunk);
          });
        }

        // Fallback: return empty string
        return Promise.resolve('{}');
      } catch (err) {
        return Promise.reject(err);
      }
    };

    readContent()
      .then((content) => {
        self.result = content;
        setTimeout(() => {
          self.onload?.();
        }, 0);
      })
      .catch((err) => {
        self.error = err;
        setTimeout(() => {
          self.onerror?.(err);
        }, 0);
      });
  }
};
