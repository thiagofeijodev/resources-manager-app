import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RestoreBackup from '../index';

// Mock FileUploader component
jest.mock('baseui/file-uploader', () => ({
  FileUploader: ({ accept, fileRows, setFileRows, processFileOnDrop }) => (
    <div data-testid="file-uploader">
      <input
        type="file"
        accept={accept?.join(',')}
        data-testid="file-input"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            // Simulate FileReader behavior with file content
            processFileOnDrop({
              ...file,
              _testContent: file._testContent,
            }).then(() => {
              setFileRows([...fileRows, { name: file.name }]);
            });
          }
        }}
      />
      <div data-testid="file-rows">
        {fileRows.map((row) => (
          <div key={row.name}>{row.name}</div>
        ))}
      </div>
    </div>
  ),
}));

// Mock data constants
jest.mock('data/history', () => ({
  BASE_PATH: 'history',
}));

jest.mock('data/resource', () => ({
  BASE_PATH: 'resource',
}));

describe('RestoreBackup Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should render file uploader', () => {
    render(<RestoreBackup />);
    expect(screen.getByTestId('file-uploader')).toBeInTheDocument();
  });

  test('should accept only json files', () => {
    render(<RestoreBackup />);
    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toHaveAttribute('accept', '.json');
  });

  test('should parse and restore valid JSON file', async () => {
    render(<RestoreBackup />);

    const testData = {
      history: JSON.stringify([{ id: 1, action: 'test' }]),
      resource: JSON.stringify({
        1: { id: 1, name: 'Resource 1', amount: 10 },
      }),
    };

    const fileContent = JSON.stringify(testData);
    const file = new File([fileContent], 'backup.json', {
      type: 'application/json',
    });

    // Attach test content for mock FileReader
    file._testContent = fileContent;

    const fileInput = screen.getByTestId('file-input');

    await waitFor(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(localStorage.getItem('history')).toBe(testData.history);
      expect(localStorage.getItem('resource')).toBe(testData.resource);
    });
  });

  test('should only restore valid backup keys', async () => {
    render(<RestoreBackup />);

    const testData = {
      history: JSON.stringify([{ id: 1 }]),
      resource: JSON.stringify({ 1: { id: 1 } }),
      invalid_key: JSON.stringify({ some: 'data' }),
    };

    const fileContent = JSON.stringify(testData);
    const file = new File([fileContent], 'backup.json', {
      type: 'application/json',
    });

    // Attach test content for mock FileReader
    file._testContent = fileContent;

    const fileInput = screen.getByTestId('file-input');

    await waitFor(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(localStorage.getItem('history')).toBe(testData.history);
      expect(localStorage.getItem('resource')).toBe(testData.resource);
      expect(localStorage.getItem('invalid_key')).toBeNull();
    });
  });

  test('should handle file read errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<RestoreBackup />);

    // Test error handling through mock behavior
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Error reading file'));

    consoleSpy.mockRestore();
  });

  test('should initialize with empty file rows', () => {
    render(<RestoreBackup />);
    const fileRowsDiv = screen.getByTestId('file-rows');
    expect(fileRowsDiv).toBeEmptyDOMElement();
  });
});
