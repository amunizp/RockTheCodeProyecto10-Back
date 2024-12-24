const { default: mongoose } = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    img: [{ type: String, trim: true, required: false }],
    description: { type: String, required: true },
    resolved: { type: Boolean, required: true, default: false },
    person: { type: mongoose.Types.ObjectId, required: true, ref: 'people' },
    relatedComments: [
      // { type: mongoose.Types.ObjectId, required: false, ref: 'comments' }
      this
    ],
    typeComment: {
      type: String,
      required: false,
      enum: ['🛠️', '💬', '🌳']
    }
  },
  {
    timestamps: true,
    collection: 'comments'
  }
)

const Comment = mongoose.model('comments', commentSchema, 'comments')
module.exports = Comment
