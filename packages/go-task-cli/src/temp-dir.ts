import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

export class TempDir {
  readonly path: string;
  private constructor(path: string) {
    this.path = path;
  }

  static async create(prefix: string): Promise<TempDir> {
    const dirPath = await fs.promises.mkdtemp(path.join(os.tmpdir(), prefix));
    try {
      const tempDir = new TempDir(dirPath);
      return tempDir;
    } catch (error) {
      await TempDir.finalize(dirPath);
      throw error;
    }
  }

  private static async finalize(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      return
    }
    await fs.promises.rm(dirPath, { recursive: true, force: true })
  }

  async [Symbol.asyncDispose]() {
    await TempDir.finalize(this.path);
  }
}
