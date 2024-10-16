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

const postComment = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body)
    newComment.person = req.person
    const comment = await newComment.save()
    // const updateCommentToPerson = Person.comments.push(comment)
    // console.log(updateCommentToPerson)
    // const newPerson = await Person.findOneAndUpdate(
    //   { personName: req.person },
    //   { comments: Person.comments.push(comment) }
    // )
    // console.log(newPerson)
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
    const newComment = new Comment(req.body)
    newComment._id = id
    const commentUpdated = await Comment.findByIdAndUpdate(id, newComment, {
      new: true
    })
    return res.status(202).json(commentUpdated)
  } catch (error) {
    return res.status(400).json('error while updating')
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
  deleteComment
}
