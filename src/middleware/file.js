const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Pictures',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
})

const upload = multer({ storage })
