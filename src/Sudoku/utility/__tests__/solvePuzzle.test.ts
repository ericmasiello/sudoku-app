import { solver } from '../solvePuzzle';
import type { Board } from '../solvePuzzle';

const b = null;

const solvableBoard: Board = [
  [b, b, b, b, b, 8, 9, 1, b],
  [b, b, 1, b, b, b, b, b, 3],
  [9, b, b, b, 2, 7, b, b, 5],
  [3, b, 2, 5, 6, b, b, b, b],
  [5, b, b, b, b, b, b, b, 8],
  [b, b, b, b, 8, 3, 5, b, 4],
  [8, b, b, 7, 4, b, b, b, 2],
  [6, b, b, b, b, b, 1, b, b],
  [b, 5, 7, 3, b, b, b, b, b],
];

const solvableBoard2: Board = [
  [b, b, 6, b, b, b, 3, b, 8],
  [b, b, b, b, b, 3, b, 9, b],
  [8, b, b, 5, b, b, b, b, 2],
  [b, b, 8, b, b, b, b, b, 5],
  [b, 9, 3, 8, b, 6, 4, b, 1],
  [1, b, 5, b, b, 4, b, b, 6],
  [2, b, b, 4, b, b, 7, 8, b],
  [b, 7, 9, 1, 6, 8, 2, b, 4],
  [b, 8, b, b, 9, 2, 6, b, b],
];

const unsolvableBoard: Board = [
  [1, 2, 3, 4, 5, 6, 7, 8, b],
  [b, b, b, b, b, b, b, b, 2],
  [b, b, b, b, b, b, b, b, 3],
  [b, b, b, b, b, b, b, b, 4],
  [b, b, b, b, b, b, b, b, 5],
  [b, b, b, b, b, b, b, b, 6],
  [b, b, b, b, b, b, b, b, 7],
  [b, b, b, b, b, b, b, b, 8],
  [b, b, b, b, b, b, b, b, 9],
];

it('should solve a solvable board', () => {
  const result = solver(solvableBoard);
  expect(result).toMatchInlineSnapshot(`
    Array [
      Array [
        4,
        2,
        5,
        6,
        3,
        8,
        9,
        1,
        7,
      ],
      Array [
        7,
        6,
        1,
        4,
        9,
        5,
        2,
        8,
        3,
      ],
      Array [
        9,
        3,
        8,
        1,
        2,
        7,
        4,
        6,
        5,
      ],
      Array [
        3,
        8,
        2,
        5,
        6,
        4,
        7,
        9,
        1,
      ],
      Array [
        5,
        9,
        4,
        2,
        7,
        1,
        6,
        3,
        8,
      ],
      Array [
        1,
        7,
        6,
        9,
        8,
        3,
        5,
        2,
        4,
      ],
      Array [
        8,
        1,
        9,
        7,
        4,
        6,
        3,
        5,
        2,
      ],
      Array [
        6,
        4,
        3,
        8,
        5,
        2,
        1,
        7,
        9,
      ],
      Array [
        2,
        5,
        7,
        3,
        1,
        9,
        8,
        4,
        6,
      ],
    ]
  `);
});
it('should solve another solvable board', () => {
  const result = solver(solvableBoard2);
  expect(result).toMatchInlineSnapshot(`
    Array [
      Array [
        9,
        5,
        6,
        2,
        1,
        7,
        3,
        4,
        8,
      ],
      Array [
        4,
        1,
        2,
        6,
        8,
        3,
        5,
        9,
        7,
      ],
      Array [
        8,
        3,
        7,
        5,
        4,
        9,
        1,
        6,
        2,
      ],
      Array [
        6,
        4,
        8,
        3,
        2,
        1,
        9,
        7,
        5,
      ],
      Array [
        7,
        9,
        3,
        8,
        5,
        6,
        4,
        2,
        1,
      ],
      Array [
        1,
        2,
        5,
        9,
        7,
        4,
        8,
        3,
        6,
      ],
      Array [
        2,
        6,
        1,
        4,
        3,
        5,
        7,
        8,
        9,
      ],
      Array [
        3,
        7,
        9,
        1,
        6,
        8,
        2,
        5,
        4,
      ],
      Array [
        5,
        8,
        4,
        7,
        9,
        2,
        6,
        1,
        3,
      ],
    ]
  `);
});

it('should not solve an unsolvable board', () => {
  const result = solver(unsolvableBoard);
  expect(result).toMatchInlineSnapshot(`false`);
});
