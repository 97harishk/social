const FriendShip = require('../models/friendship');
const User = require('../models/user');
module.exports.toggleFriend  =  async function(req, res){
    try {
        let friend = await FriendShip.findOne({
            from_user: req.user._id,
            to_user: req.params.id
        });
        let fromUser = await User.findById(req.user._id);
        let toUser  = await User.findById(req.params.id);
        if(friend){
            fromUser.friend.pull(friend._id);
            toUser.friend.pull(friend._id);
            fromUser.save();
            toUser.save();
            friend.remove();
            return res.redirect('back');
        }
        else{
            let friend = await FriendShip.create({
                from_user: req.user.id,
            to_user: req.params.id
            })
            fromUser.friend.push(friend._id);
            toUser.friend.push(friend._id);
            fromUser.save();
            toUser.save();
            console.log(friend);
            return res.redirect('back');
        } 
    } catch (error) {
        if(error){
            console.log('error found',error);
        }
        return res.redirect('back');
    }
    
}