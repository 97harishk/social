{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button', newPost));
                },error: function(error){
                    console.log(error.responseText);
                }

            })
        })
    }   

    let newPostDom = function(post){
        return $(`<li id="post-${ post._id }">
        <a href="/post/destroy/${ post._id }">X </a>${ post.content }
</br>
<small>
${ post.user }
</small>
<form method="POST" action="/comment/create">
        <input type="text" name="content" placeholder="comment" required />
        <input type="hidden" name="post" value="${ post.id }" required />
        <input type="submit" name="submit" value="comment">
</form>
<div class="post-comments-list">
        <ul id="post-comments-${ post.id }">
        </ul>
</div>
</li>`)
    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${ data.data.id }`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}