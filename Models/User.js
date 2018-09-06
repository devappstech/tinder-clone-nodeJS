const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname:{
    type:String,
    required:[true,'´{PATH}´ is required.']
  },email:{
    type:String,
    required:[true,'´{PATH}´ is required.'],
    unique:true
  },
  password:{
    type:String,
    required:[true,'´{PATH}´ is required.']
  },
  img_url:String,
  age:Number,
  gender:Number, // 0 is women, 1 is man
  dateAdded:{
    type:Date,
    default:Date.now
  }
});


module.exports = mongoose.model('user',userSchema);
