import { convertPuzzleMapTo2DArray } from '../convertPuzzleMapTo2DArray';
import { PuzzleMap } from '../puzzleTypes';

it('should convert a valid map to a 2D array', () => {
  const validPuzzleMap: PuzzleMap = {
    A1: '4',
    A2: '1',
    A7: '8',
    A8: '9',
    A9: '7',
    B2: '9',
    B7: '4',
    B8: '2',
    B9: '3',
    C7: '5',
    D5: '1',
    E2: '2',
    E5: '5',
    E6: '9',
    E8: '8',
    F8: '7',
    G3: '9',
    G4: '5',
    G5: '2',
    G7: '3',
    G8: '4',
    H2: '4',
    H3: '5',
    H5: '9',
    H6: '6',
    H7: '7',
    H9: '2',
    I2: '3',
    I3: '7',
    I5: '8',
    I6: '4',
    I7: '6',
    I8: '5',
    I9: '9',
    F4: '8',
  };
  const result = convertPuzzleMapTo2DArray(validPuzzleMap);

  expect(result).toMatchInlineSnapshot(`
    Array [
      Array [
        4,
        1,
        null,
        null,
        null,
        null,
        8,
        9,
        7,
      ],
      Array [
        null,
        9,
        null,
        null,
        null,
        null,
        4,
        2,
        3,
      ],
      Array [
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        null,
        null,
      ],
      Array [
        null,
        null,
        null,
        null,
        1,
        null,
        null,
        null,
        null,
      ],
      Array [
        null,
        2,
        null,
        null,
        5,
        9,
        null,
        8,
        null,
      ],
      Array [
        null,
        null,
        null,
        8,
        null,
        null,
        null,
        7,
        null,
      ],
      Array [
        null,
        null,
        9,
        5,
        2,
        null,
        3,
        4,
        null,
      ],
      Array [
        null,
        4,
        5,
        null,
        9,
        6,
        7,
        null,
        2,
      ],
      Array [
        null,
        3,
        7,
        null,
        8,
        4,
        6,
        5,
        9,
      ],
    ]
  `);
});

it('should throw an error when passed an invalid column', () => {
  const invalidPuzzleMap: PuzzleMap = {
    A1: '4',
    A2: '1',
    A7: '8',
    A8: '9',
    A9: '7',
    // @ts-ignore
    Z1: '1', // invalid column 'Z'
  };
  expect(() =>
    convertPuzzleMapTo2DArray(invalidPuzzleMap)
  ).toThrowErrorMatchingInlineSnapshot(`"Invalid puzzle map key \\"Z1\\""`);
});

it('should throw an error when passed an invalid row', () => {
  const invalidPuzzleMap: PuzzleMap = {
    A1: '4',
    A2: '1',
    A7: '8',
    A8: '9',
    A9: '7',
    // @ts-ignore
    B20: '1', // invalid row '20'
  };
  expect(() =>
    convertPuzzleMapTo2DArray(invalidPuzzleMap)
  ).toThrowErrorMatchingInlineSnapshot(`"Invalid puzzle map key \\"B20\\""`);
});
