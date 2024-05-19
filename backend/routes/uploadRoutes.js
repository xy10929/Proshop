import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

//use diskStorage(on the server) to storage image
const storage = multer.diskStorage({
  //set where to save images
  destination(req, file, cb) {
    //cb - callback that will call within
    //null for error, 'uploads/' folder for uploads
    cb(null, 'uploads/')
  },

  //set filename
  filename(req, file, cb) {
    cb(
      null,
      //use the extansion whatever the file has
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  //allowed types
  const filetypes = /jpg|jpej|png/

  //for checking
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  //mimetype - text/image/audio/video/application
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, ture)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  checkFileType,
})

//submit image route
//upload.single('image') - middleware(allow single file), handles actual upload
//'image' - file.fieldname
router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path}`,
  })
})

export default router
