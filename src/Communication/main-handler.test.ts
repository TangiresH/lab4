import * as fs from 'fs';
import { describe, test, expect, afterAll } from '@jest/globals';

import { MainHandler } from './main-handler';
import { FileSystemInterface } from '../../interfaces';

const TEST_OUTPUT_FILE = 'test-output.txt';

describe('MainHandler', () => {
  describe('exec()', () => {
    test('should return an error if provided with non-existing file', () => {
      const fsMock: jest.Mocked<FileSystemInterface> = {
        readFile: jest.fn((filepath: string) => {
          return [
            '..pp....',
            '..pp....',
            '........',
            '#....##.',
            '###.###.',
            '########',
          ];
        }),
        writeFile: jest.fn(),
      };
      const mainHandler = new MainHandler(null, 'test', fsMock);

      expect(mainHandler.exec()).toBeInstanceOf(Error);
    });

    test('should return an error if provided with invalid output-file', () => {
      const fsMock: jest.Mocked<FileSystemInterface> = {
        readFile: jest.fn((filepath: string) => {
          return [
            '..pp....',
            '..pp....',
            '........',
            '#....##.',
            '###.###.',
            '########',
          ];
        }),
        writeFile: jest.fn(),
      };
      const mainHandler = new MainHandler('test', null, fsMock);

      expect(mainHandler.exec()).toBeInstanceOf(Error);
    });

    test('should return an error if readFile throws an error', () => {
      const fsMock: jest.Mocked<FileSystemInterface> = {
        readFile: jest.fn((filepath: string) => {
          throw new Error();
        }),
        writeFile: jest.fn(),
      };
      const mainHandler = new MainHandler('test', 'test', fsMock);

      expect(mainHandler.exec()).toBeInstanceOf(Error);
    });

    test('should return an error if writeFile throws an error', () => {
      const fsMock: jest.Mocked<FileSystemInterface> = {
        readFile: jest.fn((filepath: string) => {
          return [
            '..pp....',
            '..pp....',
            '........',
            '#....##.',
            '###.###.',
            '########',
          ];
        }),
        writeFile: jest.fn((filename: string, field: string) => {
          throw new Error();
        }),
      };
      const mainHandler = new MainHandler('test', 'test', fsMock);

      expect(mainHandler.exec()).toBeInstanceOf(Error);
    });


    test('should write the result in the provided file', () => {
      const fsMock: jest.Mocked<FileSystemInterface> = {
        readFile: jest.fn((filepath: string) => {
          return [
            '..pp....',
            '..pp....',
            '........',
            '#....##.',
            '###.###.',
            '########',
          ];
        }),
        writeFile: jest.fn((filename: string, field: string) => {
          fs.writeFileSync(filename, field);
        }),
      };
      const expectedOutput =
        '........\n' +
        '........\n' +
        '..pp....\n' +
        '#.pp.##.\n' +
        '###.###.\n' +
        '########';
      const mainHandler = new MainHandler('test', TEST_OUTPUT_FILE, fsMock);
      mainHandler.exec();
      const output = fs.readFileSync(TEST_OUTPUT_FILE, 'utf-8');
      expect(output).toEqual(expectedOutput);
    });

    afterAll(() => {
      fs.unlink(TEST_OUTPUT_FILE, (err) => {});
    });
  });
});
