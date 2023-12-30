import * as fs from 'fs';
import { describe, test, expect, afterAll } from '@jest/globals';

import { FileSystem } from './file-system';
import { FileSystemInterface } from 'interfaces';

const readFile_test_dataset = [
  {
    filepath: 'src/IO/testfiles/test1.txt',
    expectedOutput: [
      '...pp...',
      '...pp...',
      '........',
      '.....#..',
      '.....#..',
      '#.##.#.#',
      '####.###',
    ],
  },
  {
    filepath: 'src/IO/testfiles/test2.txt',
    expectedOutput: [
      '...p....',
      '...p....',
      '...pp...',
      '........',
      '.....#..',
      '..##.#.#',
      '#..#####',
    ],
  },
  {
    filepath: 'src/IO/testfiles/test3.txt',
    expectedOutput: [
      '...p....',
      '...pp...',
      '...p....',
      '........',
      '####....',
      '#.##...#',
      '#..#####',
    ],
  },
];

const readFile_err_test_dataset = [
  {
    filepath: 'src/IO/testfiles/test4.txt',
    message: 'invalid parameters',
  },
  {
    filepath: 'src/IO/testfiles/test5.txt',
    message: 'invalid field size',
  },
  {
    filepath: 'src/IO/testfiles/test6.txt',
    message: 'invalid shape',
  },
  {
    filepath: 'src/IO/testfiles/test7',
    message: 'invalid field cell',
  },
  {
    filepath: 'src/IO/testfiles/clown',
    message: 'non-existing file',
  },
];

describe('FileSystem', () => {
  const fileSystem: FileSystemInterface = new FileSystem();

  describe('readFile()', () => {
    readFile_test_dataset.forEach((dataset) =>
      test('should read the file and return parsed content', () => {
        const input = fileSystem.readFile(dataset.filepath);
        expect(input).toEqual(dataset.expectedOutput);
      })
    );

    readFile_err_test_dataset.forEach((dataset) =>
      test(`should throw an error if provided with ${dataset.message}`, () => {
        expect(() => fileSystem.readFile(dataset.filepath)).toThrowError();
      })
    );
  });

  describe('writeFile()', () => {
    test('should write file with provided string', () => {
      const input =
        '7 8\n' +
        '...pp...\n' +
        '...pp...\n' +
        '........\n' +
        '....##..\n' +
        '.....#..\n' +
        '..##.#.#\n' +
        '#..#####';
      const expectedOutput = [
        '...pp...',
        '...pp...',
        '........',
        '....##..',
        '.....#..',
        '..##.#.#',
        '#..#####',
      ];

      fileSystem.writeFile('src/IO/testfiles/output.txt', input);
      const output = fileSystem.readFile('src/IO/testfiles/output.txt');
      expect(output).toEqual(expectedOutput);
    });
  });

  afterAll(() => {
    fs.unlink('src/IO/testfiles/output.txt', (err) => {});
  });
});
