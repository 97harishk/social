const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
            from: '97harishkumar@gmail.com',
            to: 'harishkumarvi12@gmail.com',
            sub: "new comment published!",
            html: htmlString
    },(err, info) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('message sent', info);
        return ;
    });
}