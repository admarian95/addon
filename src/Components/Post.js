const Post = ({post}) => {
    console.log(post)
    return (
        <div class="card" >
            <img class="card-img-top" src={post.imgSrc} alt="Card image cap" />
            <div class="card-body">
                <h5 class="card-title">{post.postHeading}</h5>
                <p class="card-text">{post.postDescription}</p>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
}

export default Post