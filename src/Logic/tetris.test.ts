import { describe, test, expect } from '@jest/globals';

import { Tetris } from './tetris';
import { TetrisInterface } from 'interfaces';

const play_test_dataset = [
  {
    input: [
      '..pp....',
      '..pp....',
      '........',
      '#....##.',
      '###.###.',
      '########',
    ],
    expectedOutput: [
      '........',
      '........',
      '..pp....',
      '#.pp.##.',
      '###.###.',
      '########',
    ],
  },
  {
    input: [
      '...pp...',
      '..pp....',
      '........',
      '#...###.',
      '##..###.',
      '########',
    ],
    expectedOutput: [
      '........',
      '........',
      '...pp...',
      '#.pp###.',
      '##..###.',
      '########',
    ],
  },
  {
    input: [
      '...p....',
      '...p....',
      '...p....',
      '#..p.##.',
      '###.###.',
      '###.####',
    ],
    expectedOutput: [
      '........',
      '........',
      '...p....',
      '#..p.##.',
      '###p###.',
      '###p####',
    ],
  },
];

describe('Tetris', () => {
  describe('play()', () => {
    play_test_dataset.forEach((dataset) =>
      test('should return correct result', () => {
        const { input, expectedOutput } = dataset;
        const tetris: TetrisInterface = new Tetris(input);
        const result = tetris.play();

        expect(result).toEqual(expectedOutput);
      })
    );
  });
});
