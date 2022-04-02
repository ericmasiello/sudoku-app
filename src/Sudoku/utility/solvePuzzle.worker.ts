import * as Comlink from 'comlink';
import { solve } from './solvePuzzle';

/*
 * Wraps the solve() method in Comlink
 * so it can be used in a WebWorker
 */
Comlink.expose({
  solve,
});
