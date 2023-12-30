import { FileSystemInterface, TetrisInterface } from '../../interfaces';
import { Tetris } from '../Logic/tetris';

export class MainHandler {
  constructor(
      private filepath: string,
      private output_file: string,
      private fs: FileSystemInterface,
      private showSteps: boolean // Додано параметр showSteps
  ) {}

  public exec() {
    try {
      if (!this.filepath) {
        throw new Error('Invalid filepath');
      } else if (!this.output_file) {
        throw new Error('Invalid output filepath');
      }

      const input = this.fs.readFile(this.filepath);
      const game: TetrisInterface = new Tetris(input as string[], this.showSteps); // Додано параметр showSteps
      const finalBoard = game.play().toString().replaceAll(',', '\n');

      this.fs.writeFile(this.output_file, finalBoard);
    } catch (err) {
      return err;
    }
  }
}
