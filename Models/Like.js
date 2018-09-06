const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  whoLike:Schema.Types.ObjectId,
  toLike:Schema.Types.ObjectId,
  status:{
    type:Boolean,
    default:false
  },
  dateAdded:{
    type:Date,
    default:Date.now
  }
});


module.exports = mongoose.model('like',likeSchema);
