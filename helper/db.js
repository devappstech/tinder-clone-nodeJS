const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://datinguser:google31@ds141872.mlab.com:41872/wixvi-dating",{userMongoClient:true});
  mongoose.connection.on('open',() => {
    console.log("mongoDB:Connected");
  });
  mongoose.connection.on('error',(error) => {
    console.log("mongoDB error:",error);
  });
};
