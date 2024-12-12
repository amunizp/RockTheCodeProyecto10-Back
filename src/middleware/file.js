const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const cloudinary = require('cloudinary').v2

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'CommentPictures',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
})

const uploadFile = multer({ storage })
module.exports = uploadFile
