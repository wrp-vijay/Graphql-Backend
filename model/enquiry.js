const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInquirySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UserInquiry', userInquirySchema);
