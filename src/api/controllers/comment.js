const Comment = require('../models/comment')
const Person = require('../models/person')

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find()
    return res.status(200).json(comments)
  } catch (error) {
    return res.status(400).json('error while getting comments')
  }
}

const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await Comment.findById(id)
    return res.status(200).json(comment)
  } catch (error) {
    return res.status(400).json('error while getting comment by id')
  }
}

const getCommentByPerson = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(req.params)
    const comments = await Comment.find({ person: id }).populate(
      'relatedComments'
    )
    return res.status(200).json(comments)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'error when getting comments by person', error })
  }
}

const getCommentByType = async (req, res, next) => {
  try {
    const { typeComment } = req.params
    console.log(req.params)
    const comments = await Comment.find({ typeComment })
    return res.status(200).json(comments)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'error when getting comments by type', error })
  }
}

const postComment = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body)
    if (req.file) {
      newComment.img = req.file.path
      console.log(req.file.path)
    }
    newComment.person = req.person
    const { id } = req.person._id
    const comment = await newComment.save()
    return res.status(201).json(comment)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'error when creating a comment', error })
  }
}

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldComment = await Comment.findById(id)
    const newComment = new Comment(req.body)
    newComment._id = id
    newListRelatedComments = req.body.relatedComments || []
    newComment.relatedComments = [
      ...new Set([...oldComment.relatedComments, ...newListRelatedComments])
    ]
    const commentUpdated = await Comment.findByIdAndUpdate(id, newComment, {
      new: true
    })
    return res.status(200).json(commentUpdated)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'error while updating', error: error.message })
  }
}

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await Comment.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'This commentHas been deleted',
      commentDeleted: comment
    })
  } catch (error) {
    return res.status(400).json('error while deleting')
  }
}

module.exports = {
  getComments,
  getCommentById,
  postComment,
  updateComment,
  deleteComment,
  getCommentByPerson,
  getCommentByType
}
