const Post = require('../models/post');
const User = require('../models/user')
module.exports.home = async function(req,res){
    if (!req.isAuthenticated()){
        return res.redirect('/user/sign-up');
    }
    try{
        let posts = await Post.find({}).sort('-createdAt').populate({path:'user', select:"name"}).populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: User,
                select: "name"
            }
        });
        let all_user = await User.find({});
            return res.render('home', {
                title: "Social | Home",
                posts:  posts,
                all_user: all_user
            })
    }catch(err){
        console.log('error',err);
    }
}