import * as fs from "fs";
import * as path from "path";

import { TMP_FOLDER, UPLOAD_FOLDER } from "../api/configs/upload";
import { AppError } from "../api/utils/AppError";
import { CloudinaryStorage } from "./CloudinaryStorage";

type IOption = "users" | "products" | "ingredients";

export class DiskStorage {
  async saveFile(file: string, option: IOption) {
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOAD_FOLDER, file)
    );
    console.log('estou dentro do diskStorage')
   const response = await new CloudinaryStorage().saveFile({file, option});
    await this.deleteFile(file);
    console.log('response save file in Cloudinary===>',response);
    if(!response){
      throw new AppError('Erro in CloudinaryStorage');
    }
    return response;
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
