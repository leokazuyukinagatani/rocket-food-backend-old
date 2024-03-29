import cloudinary from "cloudinary";
import * as path from "path";
import { UPLOAD_FOLDER } from "../api/configs/upload";

/*Configurando Cloudinary */
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface IFileUpload {
  file: string;
  option: "users" | "products" | "ingredients";
}
export class CloudinaryStorage {
  async saveFile({ file, option }: IFileUpload) {
    const response = await cloudinary.v2.uploader.upload(
      path.resolve(UPLOAD_FOLDER, file),
      {
        tags: option,
        public_id: file,
        width: 250,
        height: 250,
        folder: option,
        crop: "fit",
      },

      function (err, image) {
        // console.log("** File Upload");
        // if (err) {
        //   console.warn(err);
        // }
        // console.log(
        //   "* public_id for the uploaded image is generated by Cloudinary's service."
        // );
        if (image) {
          console.log("* " + image.public_id);
          console.log("* " + image.url);
        }
      }
    );

    // console.log('response cloudinar', response)

    const { original_filename, url } = response;
    return { filename: original_filename, url };
  }
}
