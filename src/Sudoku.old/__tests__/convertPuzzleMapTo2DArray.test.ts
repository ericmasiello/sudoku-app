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
        Object {
          "id": "A1",
          "value": 4,
        },
        Object {
          "id": "A2",
          "value": 1,
        },
        Object {
          "id": "A3",
          "value": null,
        },
        Object {
          "id": "A4",
          "value": null,
        },
        Object {
          "id": "A5",
          "value": null,
        },
        Object {
          "id": "A6",
          "value": null,
        },
        Object {
          "id": "A7",
          "value": 8,
        },
        Object {
          "id": "A8",
          "value": 9,
        },
        Object {
          "id": "A9",
          "value": 7,
        },
      ],
      Array [
        Object {
          "id": "B1",
          "value": null,
        },
        Object {
          "id": "B2",
          "value": 9,
        },
        Object {
          "id": "B3",
          "value": null,
        },
        Object {
          "id": "B4",
          "value": null,
        },
        Object {
          "id": "B5",
          "value": null,
        },
        Object {
          "id": "B6",
          "value": null,
        },
        Object {
          "id": "B7",
          "value": 4,
        },
        Object {
          "id": "B8",
          "value": 2,
        },
        Object {
          "id": "B9",
          "value": 3,
        },
      ],
      Array [
        Object {
          "id": "C1",
          "value": null,
        },
        Object {
          "id": "C2",
          "value": null,
        },
        Object {
          "id": "C3",
          "value": null,
        },
        Object {
          "id": "C4",
          "value": null,
        },
        Object {
          "id": "C5",
          "value": null,
        },
        Object {
          "id": "C6",
          "value": null,
        },
        Object {
          "id": "C7",
          "value": 5,
        },
        Object {
          "id": "C8",
          "value": null,
        },
        Object {
          "id": "C9",
          "value": null,
        },
      ],
      Array [
        Object {
          "id": "D1",
          "value": null,
        },
        Object {
          "id": "D2",
          "value": null,
        },
        Object {
          "id": "D3",
          "value": null,
        },
        Object {
          "id": "D4",
          "value": null,
        },
        Object {
          "id": "D5",
          "value": 1,
        },
        Object {
          "id": "D6",
          "value": null,
        },
        Object {
          "id": "D7",
          "value": null,
        },
        Object {
          "id": "D8",
          "value": null,
        },
        Object {
          "id": "D9",
          "value": null,
        },
      ],
      Array [
        Object {
          "id": "E1",
          "value": null,
        },
        Object {
          "id": "E2",
          "value": 2,
        },
        Object {
          "id": "E3",
          "value": null,
        },
        Object {
          "id": "E4",
          "value": null,
        },
        Object {
          "id": "E5",
          "value": 5,
        },
        Object {
          "id": "E6",
          "value": 9,
        },
        Object {
          "id": "E7",
          "value": null,
        },
        Object {
          "id": "E8",
          "value": 8,
        },
        Object {
          "id": "E9",
          "value": null,
        },
      ],
      Array [
        Object {
          "id": "F1",
          "value": null,
        },
        Object {
          "id": "F2",
          "value": null,
        },
        Object {
          "id": "F3",
          "value": null,
        },
        Object {
          "id": "F4",
          "value": 8,
        },
        Object {
          "id": "F5",
          "value": null,
        },
        Object {
          "id": "F6",
          "value": null,
        },
        Object {
          "id": "F7",
          "value": null,
        },
        Object {
          "id": "F8",
          "value": 7,
        },
        Object {
          "id": "F9",
          "value": null,
        },
      ],
      Array [
        Object {
          "id": "G1",
          "value": null,
        },
        Object {
          "id": "G2",
          "value": null,
        },
        Object {
          "id": "G3",
          "value": 9,
        },
        Object {
          "id": "G4",
          "value": 5,
        },
        Object {
          "id": "G5",
          "value": 2,
        },
        Object {
          "id": "G6",
          "value": null,
        },
        Object {
          "id": "G7",
          "value": 3,
        },
        Object {
          "id": "G8",
          "value": 4,
        },
        Object {
          "id": "G9",
          "value": null,
        },
      ],
      Array [
        Object {
          "id": "H1",
          "value": null,
        },
        Object {
          "id": "H2",
          "value": 4,
        },
        Object {
          "id": "H3",
          "value": 5,
        },
        Object {
          "id": "H4",
          "value": null,
        },
        Object {
          "id": "H5",
          "value": 9,
        },
        Object {
          "id": "H6",
          "value": 6,
        },
        Object {
          "id": "H7",
          "value": 7,
        },
        Object {
          "id": "H8",
          "value": null,
        },
        Object {
          "id": "H9",
          "value": 2,
        },
      ],
      Array [
        Object {
          "id": "I1",
          "value": null,
        },
        Object {
          "id": "I2",
          "value": 3,
        },
        Object {
          "id": "I3",
          "value": 7,
        },
        Object {
          "id": "I4",
          "value": null,
        },
        Object {
          "id": "I5",
          "value": 8,
        },
        Object {
          "id": "I6",
          "value": 4,
        },
        Object {
          "id": "I7",
          "value": 6,
        },
        Object {
          "id": "I8",
          "value": 5,
        },
        Object {
          "id": "I9",
          "value": 9,
        },
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
