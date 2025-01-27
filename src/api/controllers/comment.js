const { deleteCloudinaryFiles } = require('../../utils/deleteFilesCloudinary')
const Comment = require('../models/comment')

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate('person')
    return res.status(200).json(comments)
  } catch (error) {
    return res.status(400).json({
      message: 'Error when getting all comments',
      error: error.message
    })
  }
}

const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await Comment.findById(id)
    return res.status(200).json(comment)
  } catch (error) {
    return res.status(400).json({
      message: 'error while getting comment by id',
      error: error.message
    })
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
    return res.status(400).json({
      message: 'error when getting comments by person',
      error: error.message
    })
  }
}

const getCommentByType = async (req, res, next) => {
  try {
    const { typeComment } = req.params
    console.log(req.params)
    const comments = await Comment.find({ typeComment })
    return res.status(200).json(comments)
  } catch (error) {
    return res.status(400).json({
      message: 'error when getting comments by type',
      error: error.message
    })
  }
}

const postComment = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body)
    //console.log(req.files)
    if (req.files) {
      console.log('File uploaded:', req.files)
      newComment.img = req.files.map((file) => file.path) // Assign the file URL to the img field
      console.log('New comment img:', newComment.img)
    } else {
      console.log('I did not find a file to upload')
    }
    newComment.person = req.person
    const { id } = req.person._id
    const comment = await newComment.save()
    return res.status(201).json(comment)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'error when creating a comment', error: error.message })
  }
}

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldComment = await Comment.findById(id)
    const newComment = new Comment(req.body)
    //console.log(req.body)
    if (req.files) {
      console.log('File uploaded:', req.files)
      newComment.img = req.files.map((file) => file.path) // Assign the file URL to the img field
      console.log('New comment img:', newComment.img)
    } else {
      console.log('I did not find a file to upload')
    }
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
    const commentDeleted = await Comment.findByIdAndDelete(id)
    console.log('attempting delete', commentDeleted)
    if (commentDeleted) {
      deleteCloudinaryFiles(commentDeleted.img)
      console.log(
        'Attempted to delete images from Cloudinary: ',
        commentDeleted.img
      )
    }
    return res.status(200).json({
      message: 'This comment has been deleted',
      commentDeleted: commentDeleted
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'error while deleting', error: error.message })
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
