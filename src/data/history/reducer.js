import { createReducer } from '@reduxjs/toolkit';
import { loadStorage } from 'functions';
import { include, BASE_PATH } from './actions';

const initialState = () => {
  const storage = loadStorage(BASE_PATH);
  if (storage) return storage;

  return [];
};

const historyReducer = createReducer(initialState(), (builder) => {
  builder.addCase(include, (state, action) => {
    const { payload } = action;
    const historic = initialState();

    const storage = [...historic, payload];

    localStorage.setItem(BASE_PATH, JSON.stringify(storage));
    return storage;
  });
});

export default historyReducer;
