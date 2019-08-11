const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.signIn = function(req, res){
  if (req.isAuthenticated()){
    return res.redirect('/');
}
  return  res.render('sign_in',{title:"Sing in into your Social app"});
}
module.exports.signUp = function(req, res){
  if (req.isAuthenticated()){
    return res.redirect('/user/profile/req.user.id');
}
    return  res.render('sign_up',{title:"Singup into your Social app"});
  }

  module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err,user){
      if(user){
        return  res.render('profile',{title:"Profile page",profile_user: user});
      }
    })
    
  }
  module.exports.update = async function(req, res){


    if(req.user.id == req.params.id){

      try{

          let user = await User.findById(req.params.id);
          User.uploadedAvatar(req, res, function(err){
              if (err) {console.log('*****Multer Error: ', err)}
              
              user.name = req.body.name;
              user.email = req.body.email;

              if (req.file){

                  if (user.avatar){
                      fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                  }


                  // this is saving the path of the uploaded file into the avatar field in the user
                  user.avatar = User.avatarPath + '/' + req.file.filename;
              }
              console.log(user.avatar);
              user.save();
              return res.redirect('back');
          });

      }catch(err){
          req.flash('error', err);
          return res.redirect('back');
      }


  }else{
      req.flash('error', 'Unauthorized!');
      return res.status(401).send('Unauthorized');
  }
    
  }


  module.exports.create = async function(req, res){
     
    try {
      if(req.body.password != req.body.confirm_password){
        req.flash('success', 'password does not match!');
         return res.redirect('back'); 
      }
    let user = await User.findOne({email: req.body.email});
    if(user){
      req.flash('success', 'User Already Exit!');
      return res.redirect('back'); 
    }
    user = await User.create(req.body);
    req.flash('success', 'Successfully registered!');
    return res.redirect('/user/profile/user.id'); 
    } catch (error) {
      req.flash('success', 'User can not register');
      console.log('error',error);
    }
    }
  module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return  res.redirect('/');
  }

  module.exports.logOut = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}