var express = require('express');
var router = express.Router();

const Match = require('../models/Match.js');
/* GET home page. */

  router.post('/unMatch', function(request, response) {
  const {matchId} = request.body;

    Match.findByIdAndUpdate(matchId,{matchStatus:false},{new:true},(error,data) =>{
      if (error){
          response.json({status:400,error:error});
      }else {
          response.json(data);
      }
    });

});


module.exports = router;
