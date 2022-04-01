export const validate = (array: number[]) => {
  // filter out empty spaces
  const validDigits = array.filter((value) => value >= 1 && value <= 9);

  // check if all digits are unique
  return validDigits.length === new Set(validDigits).size;
};

export const isValidSudoku = (board: number[][]): boolean => {
  const result = board.reduce((acc, column, columIndex) => {
    const columnIsValid = validate(column);
    const row = board.reduce((acc, column) => {
      return acc.concat(column[columIndex]);
    }, [] as number[]);
    const rowIsValid = validate(row);

    // TODO: validate 3x3 squares

    return acc && columnIsValid && rowIsValid;
  }, true);

  return result;
};
