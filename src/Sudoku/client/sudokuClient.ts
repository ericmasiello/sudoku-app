import { Difficulty, Puzzle } from '../sudokuTypes';

export type APIResponse = {
  difficulty: Difficulty;
  puzzle: Partial<Puzzle>;
};

type FetchPuzzle = (config: {
  difficulty: Difficulty;
  abortSignal?: AbortSignal;
}) => Promise<APIResponse['puzzle']>;

export const fetchPuzzle: FetchPuzzle = async (config) => {
  const response = await fetch(
    `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${config.difficulty}`,
    { signal: config?.abortSignal }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = (await response.json()) as APIResponse;

  return json.puzzle;
};
