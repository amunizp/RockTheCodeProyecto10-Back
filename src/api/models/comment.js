const { default: mongoose } = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    img: { type: String, trim: true, required: false },
    description: { type: String, required: true },
    updates: [{ type: String, ref: 'updates', required: false }],
    resolved: { type: Boolean, required: true, default: false },
    person: { type: String, ref: 'people', required: true }
  },
  {
    timestamps: true,
    collection: 'comments'
  }
)

const Comment = mongoose.model('comments', commentSchema, 'comments')
module.exports = Comment
