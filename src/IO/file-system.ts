const fs = require('fs');

import { FileSystemInterface } from '../../interfaces';
import { Coordinates } from '../../interfaces';

export class FileSystem implements FileSystemInterface {
  public readFile(filepath: string): string[] {
    try {
      const data = fs.readFileSync(filepath, 'utf-8');
      const formatedData = data.replace(/\s+/g, ' ').trim().split(' ');

      const params = formatedData.slice(0, 2);
      const field = formatedData.slice(2);

      this.checkParams(params);
      this.checkField(field, +params[0], +params[1]);
      this.checkShape(field);

      return field;
    } catch (err) {
      throw new Error('Incorrect input data');
    }
  }

  public writeFile(filename: string, field: string): void {
    try {
      fs.writeFileSync(filename, field);
    } catch (err) {
      throw new Error('Could not write file');
    }
  }

  private checkParams(params: string[]): void {
    if (params.length !== 2) {
      throw new Error('Invalid number of parameters');
    }

    params.forEach((el) => {
      const numericValue = +el;
      if (isNaN(numericValue) || numericValue < 5 || numericValue > 20) {
        throw new Error('Invalid parameter value');
      }
    });
  }

  private checkField(field: string[], height: number, width: number): void {
    if (field.length !== height) {
      throw new Error('Invalid field height');
    }

    for (const key of field) {
      if (key.length !== width) {
        throw new Error('Invalid field width');
      }

      if (!/^[\.\#p]+$/.test(key)) {
        throw new Error('Invalid character in the field');
      }
    }
  }

  private checkShape(field: string[]): void {
    const currentShape: Coordinates[] = [];
    for (let i = 0; i < field.length; i++) {
      for (let k = 0; k < field[i].length; k++) {
        if (field[i][k] === 'p') {
          currentShape.push({ x: i, y: k });
        }
      }
    }

    if (currentShape.length !== 4) {
      throw new Error('Invalid number of points in the shape');
    }

    const validShapes = this.getValidShapes(
      currentShape[0].x,
      currentShape[0].y
    );

    if (
      !validShapes.some((correctCoord) =>
        currentShape.some(
          (coord) => coord.x === correctCoord.x && coord.y === correctCoord.y
        )
      )
    )
      throw new Error('Invalid shape');
  }

  private getValidShapes(x: number, y: number): Coordinates[] {
    const I = [
      { x, y },
      { x: x + 1, y },
      { x: x + 2, y },
      { x: x + 3, y },
    ];
    const O = [
      { x, y },
      { x, y: y + 1 },
      { x: x + 1, y },
      { x: x + 1, y: y + 1 },
    ];
    const L = [
      { x, y },
      { x: x + 1, y },
      { x: x + 2, y },
      { x: x + 2, y: y + 1 },
    ];
    const J = [
      { x, y },
      { x: x + 1, y },
      { x: x + 2, y: y - 1 },
      { x: x + 2, y },
    ];
    const T = [
      { x, y },
      { x, y: y + 1 },
      { x, y: y + 2 },
      { x: x + 1, y: y + 1 },
    ];
    const S = [
      { x, y },
      { x, y: y + 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y },
    ];
    const Z = [
      { x, y },
      { x, y: y + 1 },
      { x: x + 1, y: y + 1 },
      { x: x + 1, y: y + 2 },
    ];

    return [...I, ...O, ...L, ...J, ...T, ...S, ...Z];
  }
}
