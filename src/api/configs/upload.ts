import path from 'path'
import multer from 'multer'
import crypto from 'crypto'
import { CustomRequest } from '../middlewares/ensureAuthenticated'

export const TMP_FOLDER = path.resolve(__dirname, '..', '..' ,'..','tmp')
export const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, 'uploads')

export const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request: CustomRequest, file, callback) {
      // validação de tipos
      const type = file.originalname.split('.')[1];
      const conditions = ['png', 'jpg', 'jpeg']
      if (conditions.includes(`${type}`)) {

        const fileNameHashed = crypto.randomBytes(64).toString('hex')
        callback(null, fileNameHashed)
      }else
        callback(null, '')
    },
  }),
}
