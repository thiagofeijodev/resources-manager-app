import { createAction } from '@reduxjs/toolkit';

const BASE_PATH = '/resources';
const INCLUDE = `${BASE_PATH}/INCLUDE`;
const CHANGE = `${BASE_PATH}/CHANGE`;

const include = createAction(INCLUDE);
const change = createAction(CHANGE);

export { BASE_PATH, INCLUDE, CHANGE, include, change };
