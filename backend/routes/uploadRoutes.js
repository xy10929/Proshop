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

function fileFilter(req, file, cb) {
  //allowed types
  const filetypes = /jpe?g|png|webp/
  //mimetype - text/image/audio/video/application
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/

  //for checking
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = mimetypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error('Images only!'), false)
  }
}

const upload = multer({ storage, fileFilter })

//middleware(allow single file), handles actual upload
//'image' - file.fieldname
const uploadSingleImage = upload.single('image')

//submit image route
router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message })
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    })
  })
})

export default router
