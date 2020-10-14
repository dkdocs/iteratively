import { Request} from 'express'
import * as multer from 'multer'
import HttpException from '../lib/exceptions'

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req: Request, file: Express.Multer.File, cb) {
            cb(null, '/tmp/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    }),
    fileFilter: (req: Request, file: Express.Multer.File, cb) => { 
        if(file.mimetype === 'text/csv') {
            cb(null, true)
        }else {
            cb(new HttpException(422, 'File uploaded is not of type CSV'))
        }
    }
})

export default upload