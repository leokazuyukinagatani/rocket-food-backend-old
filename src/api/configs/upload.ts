import path from "path";
import multer from "multer";
import crypto from "crypto";
import { CustomRequest } from "../middlewares/ensureAuthenticated";

export const TMP_FOLDER = path.resolve(__dirname, "..", "..", "..", "tmp");
export const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads");
export const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request: CustomRequest, file, callback) {
      // const fileHash = crypto.randomBytes(10).toString("hex");
 
      const filename = request.user?.id ? `avatar-${request.user.id}` : "avatar-teste";
      if (typeof filename === "string") return callback(null, filename);
    },
  }),
};
