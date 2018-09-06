var express = require('express');
var router = express.Router();

const User = require('../models/User.js');
const Like = require('../models/Like.js');
const Match = require('../models/Match.js');
const Message = require('../models/Message.js');
/* GET home page. */

  router.post('/', function(request, response) {
  const {matchId} = request.body;

    Message.find({matchId:matchId},(error,data) =>{
      if (error){
          response.json({status:400,error:error});
      }else {
          response.json(data);
      }
    });

});

  router.post('/sendMessage', function(request, response) {
    const {senderUser,toUser,text,matchId} = request.body;

    Match.findById(matchId,(error,data) => {
      if(error){
        response.json({status:400,error:error});
      }else {

        if (data == undefined)
        {
          response.json({status:400,message:"There is no match!"});
        }else {
          if (data.matchStatus)
          {
            const message = new Message({
              senderUser:senderUser,
              toUser:toUser,
              matchId:matchId,
              messageText:text
            });
            message.save((error,data) => {
              if (error)
              {
                response.json({status:400,error:error});
              }else{
                response.json(data); // mesajın bilgileri
              }
            });
          }else {
              response.json({status:400,message:"You can not sent a message to this user"});
          }
        }
      }

    });




  });

module.exports = router;
