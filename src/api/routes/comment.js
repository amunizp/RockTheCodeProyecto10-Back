const {
  getComments,
  getCommentById,
  postComment,
  updateComment,
  deleteComment,
  getCommentByPerson,
  getCommentByType
} = require('../controllers/comment')
const { isAuth } = require('../../middleware/auth')
const uploadFile = require('../../middleware/file')

const commentsRouter = require('express').Router()

commentsRouter.get('/', isAuth, getComments)
commentsRouter.get('/person/:id', isAuth, getCommentByPerson)
commentsRouter.get('/type/:typeComment', isAuth, getCommentByType)
commentsRouter.get('/:id', isAuth, getCommentById)
commentsRouter.post('/', isAuth, uploadFile.array('img', 4), postComment)
commentsRouter.put('/:id', isAuth, uploadFile.array('img', 4), updateComment)
commentsRouter.delete('/:id', isAuth, deleteComment)

module.exports = commentsRouter
