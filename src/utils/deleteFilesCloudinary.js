var cloudinary = require('cloudinary').v2
const deleteCloudinaryFiles = (listURLs) => {
  var listNames = listURLs.map((url) =>
    url.split('/').slice(-2).join('/').split('.').shift()
  )
  cloudinary.api.delete_resources(listNames, () => {
    console.log('destroyed a list of files')
  })
}

module.exports = { deleteCloudinaryFiles }
