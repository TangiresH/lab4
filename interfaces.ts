export interface FileSystemInterface {
  readFile(filepath: string): string[];
  writeFile(filename: string, field: string): void;
}

export interface TetrisInterface {
  play(): string[];
}

export interface GameStateInterface<T> {
  collision: boolean;
  nextStep(): void;
  getField(): string[];
  getCoordShape(): Coordinates[];
}

export interface Coordinates {
  x: number;
  y: number;
}
