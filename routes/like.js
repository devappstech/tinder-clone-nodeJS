var express = require('express');
var router = express.Router();

const User = require('../models/User.js');
const Like = require('../models/Like.js');
const Match = require('../models/Match.js');


router.post('/like',(request,response) => {
  const {user1,user2,type} = request.body;

    Like.find({ whoLike:user2,toLike:user1 },(error,data) =>{
      if (error)
      {
        response.json({status:400,error:error});
      }else {
        if (data == undefined || data == null || data.length == 0)
        {
          Like.find({ whoLike:user1,toLike:user2 },(error,data) =>{
          if (error)
          {
            response.json({status:400,error:error});
          }else {
            if (data == undefined || data == null || data.length == 0)
            {
              const like = new Like({
                whoLike:user1,
                toLike:user2,
                type:1
              });
              like.save((error,data) => {
                if (error)
                {
                  response.json({status:400,error:error});
                }else{
                  response.json(data); // böyle bir ilişki yoktu artık oluştu
                }
              });
            }else {
              response.json({message:"You already like this user!"});
            }
          }
        });
        }else {
          if (data[0] == undefined)
          {
            response.json({status:400,error:"There is no user defined!"});
          }else {
            Like.findByIdAndUpdate(data[0]._id,{status:true},{new:true},(error,matchData) => {
              if(error)
              {
                  response.json({status:400,error:error});
              }else {
                  console.log("O adam seni beğenmiş şimdi sende onu beğendin artık matchlendiniz");

                  const match = new Match({
                    user1:matchData.whoLike,
                    user2:matchData.toLike,
                  });
                  match.save((error,data) => {
                    if (error)
                    {
                      response.json({status:400,error:error});
                    }else{
                      response.json(data); // yeni oluşan eşleşmenin bilgileri
                    }
                  });

              }
            });
          }

        }
      }
    });


});

module.exports = router;
