// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { setupServer } from 'msw/node';
import { rest } from 'msw';
import type { RequestHandler } from 'msw';

type RequestHandlersList = RequestHandler<any, any, any, any>[];

// These are static handlers that exist for all tests.
// Add handlers for mocking API responses in tests or local development
// See https://mswjs.io/docs/getting-started/mocks/rest-api

const handlers: RequestHandlersList = [
  rest.get(
    'https://vast-chamber-17969.herokuapp.com/generate*',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          difficulty: 'easy',
          puzzle: {
            A2: '6',
            A6: '5',
            A7: '8',
            B1: '7',
            B6: '4',
            C8: '6',
            D4: '9',
            D5: '4',
            D6: '7',
            D8: '3',
            D9: '5',
            E2: '1',
            E3: '7',
            E4: '3',
            E5: '5',
            E9: '2',
            F2: '4',
            F3: '3',
            F4: '1',
            F6: '2',
            F7: '9',
            F8: '8',
            F9: '7',
            G1: '4',
            G4: '5',
            G6: '1',
            G9: '6',
            H5: '2',
            H6: '3',
            I2: '8',
            I3: '5',
            I5: '9',
            I7: '4',
            I8: '1',
            I9: '3',
          },
        })
      );
    }
  ),
];

export const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
