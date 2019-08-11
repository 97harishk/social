class ToggleLikes{
    constructor(toggleElement){
        this.toggler  = toggleElement;
        this.toggleLikes();
    }

toggleLikes(){
    $(this.togggler).click(function(e){
        e.preventDefault();
        let self = this;
        $ajax({
            type: 'Post',
            url: $(self).attr('href'),
        })
        .done(function(data){
            let likeCount = parseInt($(self).attr('data-likes'));
            console.log(likeCount);
            if(data.data.deleted == true){
                likeCount -= 1;
            }
            else{
                likeCount +=1;
            }
            $(self).attr('data-likes', likeCount);
            $(self).html(`${likeCount} Likes`);
        })
        .fail(function(errData){
                console.log('error in compiling request');
        });
    });
}
}