import { FileSystemInterface } from './interfaces';
import { FileSystem } from './src/IO/file-system';
import { MainHandler } from './src/Communication/main-handler';

const OUTPUT_FILE = 'output.txt';

const main = (): void => {
  const filepath = process.argv[2] || null;
  const fs: FileSystemInterface = new FileSystem();

  const mainHandler = new MainHandler(filepath, OUTPUT_FILE, fs);
  const err = mainHandler.exec();
  if (err) console.log(err.message);
};

main();
