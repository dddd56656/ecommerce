// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { productHandlers } from './product';

export const worker = setupWorker(...handlers,...productHandlers);
