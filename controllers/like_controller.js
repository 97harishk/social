const Like = require('../models/likes');
const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.toggleLike = async function(req, res){
    try {
        let likeable;
        let deleted = false;
        if (req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

       let existinglike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        if(existinglike){
            likeable.likes.pull(existinglike._id);
            likeable.save();

            existinglike.remove();
            deleted = true;
        }else{
           let newLike = await Like.create({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
            })
            console.log(newLike);
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.json(200,
            {message:'Request successfull',
             data:{deleted: deleted}
    })
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
   
}