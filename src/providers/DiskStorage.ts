import * as fs from "fs";
import * as path from "path";

import { TMP_FOLDER, UPLOAD_FOLDER } from "../api/configs/upload";
import { CloudinaryStorage } from "./CloudinaryStorage";

export class DiskStorage {
  async saveFile(file: string, option: "users" | "products" | "ingredients") {
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOAD_FOLDER, file)
    );

   const response = await new CloudinaryStorage().saveFile({file, option});

    await this.deleteFile(file);
    console.log(response);
    return response.url;
  }

  async deleteFile(file: string) {
    const filePath = path.resolve(UPLOAD_FOLDER, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
