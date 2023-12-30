import * as fs from 'fs';
import { describe, test, expect, afterAll } from '@jest/globals';

import { MainHandler } from './main-handler';
import { FileSystemInterface } from '../../interfaces';

const TEST_OUTPUT_FILE = 'test-output.txt';

describe('MainHandler', () => {
  describe('exec()', () => {
    test('should return an error if provided with non-existing file', () => {
      const fs_mock: FileSystemInterface = {
        readFile(filepath: string): string[] {
          return [
            '..pp....',
            '..pp....',
            '........',
            '#....##.',
            '###.###.',
            '########',
          ];
        },
        writeFile(filename: string, field: string): void {},
      };
      const mainHandler = new MainHandler(null, 'test', fs_mock);

      expect(mainHandler.exec()).toBeInstanceOf(Error);
    });

    test('should return an error if provided with invalid output-file', () => {
      const fs_mock: FileSystemInterface = {
        readFile(filepath: string): string[] {
          return [
            '..pp....',
            '..pp....',
            '........',
            '#....##.',
            '###.###.',
            '########',
          ];
        },
        writeFile(filename: string, field: string): void {},
      };
      const mainHandler = new MainHandler('test', null, fs_mock);

      expect(mainHandler.exec()).toBeInstanceOf(Error);
    });

    test('should return an error if readFile throws an error', () => {
      const fs_mock: FileSystemInterface = {
        readFile(filepath: string): string[] {
          throw new Error();
        },
        writeFile(filename: string, field: string): void {},
      };
      const mainHandler = new MainHandler('test', 'test', fs_mock);

      expect(mainHandler.exec()).toBeInstanceOf(Error);
    });

    test('should return an error if writeFile throws an error', () => {
      const fs_mock: FileSystemInterface = {
        readFile(filepath: string): string[] {
          return [
            '..pp....',
            '..pp....',
            '........',
            '#....##.',
            '###.###.',
            '########',
          ];
        },
        writeFile(filename: string, field: string): void {
          throw new Error();
        },
      };
      const mainHandler = new MainHandler('test', 'test', fs_mock);

      expect(mainHandler.exec()).toBeInstanceOf(Error);
    });

    test('should write the result in provided file', () => {
      const fs_mock: FileSystemInterface = {
        readFile(filepath: string): string[] {
          return [
            '..pp....',
            '..pp....',
            '........',
            '#....##.',
            '###.###.',
            '########',
          ];
        },
        writeFile(filename: string, field: string): void {
          fs.writeFileSync(filename, field);
        },
      };
      const expectedOutput =
        '........\n' +
        '........\n' +
        '..pp....\n' +
        '#.pp.##.\n' +
        '###.###.\n' +
        '########';
      const mainHandler = new MainHandler('test', TEST_OUTPUT_FILE, fs_mock);
      mainHandler.exec();
      const output = fs.readFileSync(TEST_OUTPUT_FILE, 'utf-8');
      expect(output).toEqual(expectedOutput);
    });

    afterAll(() => {
      fs.unlink(TEST_OUTPUT_FILE, (err) => {});
    });
  });
});
