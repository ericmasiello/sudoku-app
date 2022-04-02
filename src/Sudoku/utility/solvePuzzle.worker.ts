import * as Comlink from 'comlink';
import { solve } from './solvePuzzle';

Comlink.expose({
  solve,
});
