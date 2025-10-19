import { createAction } from '@reduxjs/toolkit';

const BASE_PATH = '/history';
const INCLUDE = `${BASE_PATH}/INCLUDE`;

const include = createAction(INCLUDE);

export { BASE_PATH, INCLUDE, include };
