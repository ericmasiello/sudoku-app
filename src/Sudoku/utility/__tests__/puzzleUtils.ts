import {
  createBlocksKeys,
  createRowKeys,
  createColumnKeys,
} from '../puzzleUtils';

it('should create all valid blocks', () => {
  expect(createBlocksKeys()).toMatchInlineSnapshot(`
      Array [
        Array [
          "A1",
          "B1",
          "C1",
          "A2",
          "B2",
          "C2",
          "A3",
          "B3",
          "C3",
        ],
        Array [
          "A4",
          "B4",
          "C4",
          "A5",
          "B5",
          "C5",
          "A6",
          "B6",
          "C6",
        ],
        Array [
          "A7",
          "B7",
          "C7",
          "A8",
          "B8",
          "C8",
          "A9",
          "B9",
          "C9",
        ],
        Array [
          "D1",
          "E1",
          "F1",
          "D2",
          "E2",
          "F2",
          "D3",
          "E3",
          "F3",
        ],
        Array [
          "D4",
          "E4",
          "F4",
          "D5",
          "E5",
          "F5",
          "D6",
          "E6",
          "F6",
        ],
        Array [
          "D7",
          "E7",
          "F7",
          "D8",
          "E8",
          "F8",
          "D9",
          "E9",
          "F9",
        ],
        Array [
          "G1",
          "H1",
          "I1",
          "G2",
          "H2",
          "I2",
          "G3",
          "H3",
          "I3",
        ],
        Array [
          "G4",
          "H4",
          "I4",
          "G5",
          "H5",
          "I5",
          "G6",
          "H6",
          "I6",
        ],
        Array [
          "G7",
          "H7",
          "I7",
          "G8",
          "H8",
          "I8",
          "G9",
          "H9",
          "I9",
        ],
      ]
    `);
});

it('should create valid rows', () => {
  const rows = createRowKeys();

  expect(rows).toHaveLength(9);

  rows.forEach((row) => expect(row).toHaveLength(9));

  expect(rows).toMatchInlineSnapshot(`
    Array [
      Array [
        "A1",
        "B1",
        "C1",
        "D1",
        "E1",
        "F1",
        "G1",
        "H1",
        "I1",
      ],
      Array [
        "A2",
        "B2",
        "C2",
        "D2",
        "E2",
        "F2",
        "G2",
        "H2",
        "I2",
      ],
      Array [
        "A3",
        "B3",
        "C3",
        "D3",
        "E3",
        "F3",
        "G3",
        "H3",
        "I3",
      ],
      Array [
        "A4",
        "B4",
        "C4",
        "D4",
        "E4",
        "F4",
        "G4",
        "H4",
        "I4",
      ],
      Array [
        "A5",
        "B5",
        "C5",
        "D5",
        "E5",
        "F5",
        "G5",
        "H5",
        "I5",
      ],
      Array [
        "A6",
        "B6",
        "C6",
        "D6",
        "E6",
        "F6",
        "G6",
        "H6",
        "I6",
      ],
      Array [
        "A7",
        "B7",
        "C7",
        "D7",
        "E7",
        "F7",
        "G7",
        "H7",
        "I7",
      ],
      Array [
        "A8",
        "B8",
        "C8",
        "D8",
        "E8",
        "F8",
        "G8",
        "H8",
        "I8",
      ],
      Array [
        "A9",
        "B9",
        "C9",
        "D9",
        "E9",
        "F9",
        "G9",
        "H9",
        "I9",
      ],
    ]
  `);
});

it('should create all valid column keys', () => {
  const columns = createColumnKeys();

  expect(columns).toHaveLength(9);

  columns.forEach((column) => expect(column).toHaveLength(9));

  expect(columns).toMatchInlineSnapshot(`
    Array [
      Array [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "A9",
      ],
      Array [
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "B9",
      ],
      Array [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
      ],
      Array [
        "D1",
        "D2",
        "D3",
        "D4",
        "D5",
        "D6",
        "D7",
        "D8",
        "D9",
      ],
      Array [
        "E1",
        "E2",
        "E3",
        "E4",
        "E5",
        "E6",
        "E7",
        "E8",
        "E9",
      ],
      Array [
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
      ],
      Array [
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G6",
        "G7",
        "G8",
        "G9",
      ],
      Array [
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "H7",
        "H8",
        "H9",
      ],
      Array [
        "I1",
        "I2",
        "I3",
        "I4",
        "I5",
        "I6",
        "I7",
        "I8",
        "I9",
      ],
    ]
  `);
});
