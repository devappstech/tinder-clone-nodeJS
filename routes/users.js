var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

router.get('/',(request,response) => {
response.send("Welcome to user api ");

});

router.post('/register',(request,response) => {
  const {fullname,email,password,img_url,age,gender} = request.body;
  bcrypt.hash(password, 10, (err, hash) => {
  // store in DB
  const user = new User({
    fullname:fullname,
    password:hash,
    email:email,
    img_url:img_url,
    age:age,
    gender:gender
  });
  user.save((error,data) => {
    if (error)
    {
      response.json(error);
    }else{
      response.json(data);
    }
  });
});
});

// login user with POST
router.post('/authenticate',(request,response) => {
  const {email,password} = request.body;
   User.findOne({
     email
   },(error,user) => {
     if (error)
     {
       response.json({status:400,error:"Authentication user not found!"});
     }else {
       if (!user)
       {
         response.json({status:400,error:"Authentication user not found!"});
       }else {
         bcrypt.compare(password,user.password).then((result) => {
           if (!result)
           {
             response.json({status:400,error:"Authentication error, wrong password!"});
           }else {
             const payload = {
               username:username
             };
             const token = jwt.sign(payload,request.app.get('api_secret_key'),{
               expiresIn:30 // dk cinsinden
             });
             response.json({status:true,username:username,token:token});
           }
         });
       }
     }
   });
});




module.exports = router;
