const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comment_mailer');
module.exports.create = async function(req, res){
    try {
        let post = await Post.findById(req.body.post);
    
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            })
                post.comments.push(comment);
                post.save();
                comment = comment.populate('user', 'name email').execPopulate();
                commentMailer.newComment(comment);
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment: comment
                        },
                        message: "post created!"
                    });

                }
                req.flash('success','comment Published');
                res.redirect('/');
    }
 } catch (error) {
        console.log('cant comment', error)
    }
   


   
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id,function(err, comment){
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}