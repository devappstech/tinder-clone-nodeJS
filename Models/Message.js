const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderUser:Schema.Types.ObjectId,
  toUser:Schema.Types.ObjectId,
  matchId:Schema.Types.ObjectId,
  messageText:String,
  dateAdded:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('message',messageSchema);
