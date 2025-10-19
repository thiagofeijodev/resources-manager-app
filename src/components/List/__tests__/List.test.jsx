import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import List from '../index';

// Mock child components
jest.mock('../components', () => ({
  List: ({ items, onSelect, Component }) => (
    <div data-testid="list">
      {items?.map((item) => (
        <div key={item.id} data-testid={`list-item-${item.id}`} onClick={() => onSelect({ item })}>
          <Component item={item} />
        </div>
      ))}
    </div>
  ),
  Align: ({ children }) => <div data-testid="align">{children}</div>,
}));

// Mock BaseUI Modal to be simpler for testing
jest.mock('baseui/modal', () => ({
  Modal: ({ isOpen, children }) =>
    isOpen ? (
      <div data-testid="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    ) : null,
  SIZE: { full: 'full' },
  ROLE: { dialog: 'dialog' },
}));

jest.mock('baseui/heading', () => ({
  Heading: ({ children }) => <h1>{children}</h1>,
  HeadingLevel: ({ children }) => <div>{children}</div>,
}));

jest.mock('baseui/button', () => ({
  Button: ({ onClick, children }) => (
    <button data-testid="add-button" onClick={onClick}>
      {children}
    </button>
  ),
  SHAPE: { circle: 'circle' },
}));

jest.mock('baseui/icon', () => ({
  Plus: () => <span>+</span>,
}));

const mockViewer = ({ item, onClose }) => (
  <div data-testid="viewer">
    <span>{item?.id || 'new'}</span>
    <button data-testid="close-button" onClick={onClose}>
      Close
    </button>
  </div>
);

const mockItem = ({ item }) => <span>{item?.name}</span>;

const mockItems = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

// Create a mock store
const createMockStore = () =>
  configureStore({
    reducer: {
      dummy: () => ({}),
    },
  });

describe('List Component', () => {
  test('should render with title and items', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <List title="Test List" items={mockItems} Viewer={mockViewer} Item={mockItem} />
      </Provider>,
    );

    expect(screen.getByText('Test List')).toBeInTheDocument();
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  test('should open modal when add button is clicked', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <List title="Test List" items={mockItems} Viewer={mockViewer} Item={mockItem} />
      </Provider>,
    );

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('viewer')).toBeInTheDocument();
  });

  test('should close modal when close button is clicked', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <List title="Test List" items={mockItems} Viewer={mockViewer} Item={mockItem} />
      </Provider>,
    );

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  test('should open modal with selected item when list item is clicked', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <List title="Test List" items={mockItems} Viewer={mockViewer} Item={mockItem} />
      </Provider>,
    );

    const listItem = screen.getByTestId('list-item-1');
    fireEvent.click(listItem);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('should render empty list when items prop is empty', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <List title="Empty List" items={[]} Viewer={mockViewer} Item={mockItem} />
      </Provider>,
    );

    expect(screen.getByText('Empty List')).toBeInTheDocument();
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });
});
