class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('connection established using sockets....');
            self.socket.on('join_room',{
                user_email: self.userEmail,
                chatroom: 'social'
            });
    
    
            self.socket.on('user_joined',function(data){
                console.log('a user joined', data);
            });

           
        });
        $('#send-message').click(function(){
            let message = $('#chat-message-input').val();
            if(message != ''){
                self.socket.emit('send-message',{
                    message: message,
                    user_email: self.userEmail,
                    chatroom: 'social'
                })
            }
        });
        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);
                let newMessage = $('<li>');
                let messageType = 'other-message';
                if(data.user_email = self.userEmail){
                    messageType = 'self-message';
                }
                newMessage.append($('<h3>',{
                    'html': data.message
                }));
                newMessage.append($('<sub>',{
                    'html': data.user_email
                }));
                newMessage.addClass(messageType);
                $('#chat-message-list').append(newMessage);
        });

      
    }
}
