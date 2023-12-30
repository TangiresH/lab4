import {
  Coordinates,
  GameStateInterface,
  TetrisInterface,
} from '../../interfaces';
import { GameState } from './game-state';

export class Tetris implements TetrisInterface {
  constructor(private input: string[]) {}

  public play(): string[] {
    let result: string[] = null;
    const height = this.input.length;
    const width = this.input[0].length;
    const [shapePos, landscapePos]: Coordinates[][] = this.getShapes(
      this.input,
      height,
      width
    );

    const gameState: GameStateInterface<Coordinates> = new GameState(
      shapePos,
      landscapePos,
      height,
      width
    );

    while (!gameState.collision) {
      gameState.nextStep();
      if (gameState.collision) {
        result = gameState.getField();
        break;
      }
    }

    return result;
  }

  private getShapes(
    field: string[],
    height: number,
    width: number
  ): Coordinates[][] {
    const shapePos: Coordinates[] = [];
    const landscapePos: Coordinates[] = [];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (field[i][j] === 'p') {
          shapePos.push({ x: i, y: j });
        } else if (field[i][j] === '#') {
          landscapePos.push({ x: i, y: j });
        }
      }
    }

    return [shapePos, landscapePos];
  }
}