const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  user1:Schema.Types.ObjectId,
  user2:Schema.Types.ObjectId,
  user1Status:{
    type:Boolean,
    default:true
  },
  user2Status:{
    type:Boolean,
    default:true
  },
  matchStatus:{
    type:Boolean,
    default:true
  },
  dateAdded:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('match',matchSchema);
