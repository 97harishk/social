const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                },
                message: 'post Created!'
            })
        }
        req.flash('success','post published');
        return res.redirect('back');  
    } catch (error) {
        console.log("error",error);
    }
  
}
module.exports.destroy = async function(req, res){
  
        try {
            let post =  await Post.findById(req.params.id);
            console.log(post);
            if(req.user.id == post.user){
                post.remove();
                await Comment.deleteMany({post: req.params.id});
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
                req.flash('success', 'Post and associated comments deleted!');
    
                return res.redirect('back');
            }
            else{
                req.flash('error', 'You cannot delete this post!');
                return res.redirect('back');
            }
        } catch (error) {
            console.log('error',error);
        }
}
