const {
  getComments,
  getCommentById,
  postComment,
  updateComment,
  deleteComment,
  getCommentByPerson
} = require('../controllers/comment')
const { isAuth } = require('../middlewares/auth')

const commentsRouter = require('express').Router()

commentsRouter.get('/', isAuth, getComments)
commentsRouter.get('/person/:id', isAuth, getCommentByPerson)
commentsRouter.get('/:id', isAuth, getCommentById)
commentsRouter.post('/', isAuth, postComment)
commentsRouter.put('/:id', isAuth, updateComment)
commentsRouter.delete('/:id', isAuth, deleteComment)

module.exports = commentsRouter
