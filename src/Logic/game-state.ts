import { GameStateInterface, Coordinates } from '../../interfaces';

export class GameState implements GameStateInterface<Coordinates> {
  constructor(
    private coordShape: Coordinates[],
    private coordLandscape: Coordinates[],
    private height: number,
    private width: number
  ) {}

  public collision: boolean = false;

  public nextStep(): void {
    const newCoordShape = this.coordShape.map((coord) => ({
      ...coord,
      x: coord.x + 1,
    }));

    if (this.checkCollision(newCoordShape)) {
      this.collision = true;
      return;
    }

    this.coordShape = newCoordShape;
  }

  public getField(): string[] {
    const field: string[] = Array.from({ length: this.height }, () =>
      '.'.repeat(this.width)
    );

    for (const { x, y } of this.coordShape) {
      if (x >= 0 && x < this.height && y >= 0 && y < this.width) {
        field[x] = field[x].substring(0, y) + 'p' + field[x].substring(y + 1);
      }
    }

    for (const { x, y } of this.coordLandscape) {
      if (x >= 0 && x < this.height && y >= 0 && y < this.width) {
        field[x] = field[x].substring(0, y) + '#' + field[x].substring(y + 1);
      }
    }

    return field;
  }

  public getCoordShape(): Coordinates[] {
    return this.coordShape;
  }

  private checkCollision(coords: Coordinates[]): boolean {
    for (const coord of coords) {
      const overlapping = this.coordLandscape.some(
        (landscapeCoord) =>
          landscapeCoord.x === coord.x && landscapeCoord.y === coord.y
      );

      if (overlapping || coord.x >= this.height) {
        return true;
      }
    }

    return false;
  }
}
