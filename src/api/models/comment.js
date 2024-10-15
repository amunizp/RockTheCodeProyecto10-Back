const { default: mongoose } = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    img: { type: String, trim: true, required: false },
    description: { type: String, required: true },
    resolved: { type: Boolean, required: true, default: false },
    person: { type: mongoose.Types.ObjectId, required: true, ref: 'people' }
  },
  {
    timestamps: true,
    collection: 'comments'
  }
)

const Comment = mongoose.model('comments', commentSchema, 'comments')
module.exports = Comment
