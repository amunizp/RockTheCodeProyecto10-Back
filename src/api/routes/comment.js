const {
  getComments,
  getCommentById,
  postComment,
  updateComment,
  deleteComment
} = require('../controllers/comment')
const { isAuth } = require('../middlewares/auth')

const commentsRouter = require('express').Router()

commentsRouter.get('/', getComments)
commentsRouter.get('/:id', getCommentById)
commentsRouter.post('/', isAuth, postComment)
commentsRouter.put('/:id', isAuth, updateComment)
commentsRouter.delete('/:id', isAuth, deleteComment)

module.exports = commentsRouter
