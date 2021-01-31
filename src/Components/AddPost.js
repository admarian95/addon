const addPost = () => {

    const submit = (e) => { 
            e.preventDefault();
            let imgSrc = document.getElementById('imgSrc').value;
            let title = document.getElementById('title').value;
            let description = document.getElementById('description').value;
            fetch('http://localhost:3000' + '/addPost', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imgSrc , title , description})
            }).then(res => res.json()).then(data => {
                alert(data.message);
               window.location.href = 'http://localhost:3001/getPosts'; 
            });
        
    }

    return (
        <form onSubmit={submit}>
            <div class="container">
                <div class="form-group">
                    <label for="imgSrc">Image Source : </label>
                    <input type="text" class="form-control" id="imgSrc" placeholder="Image Source " />
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" placeholder="Title" />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description" placeholder="Description" />
                </div>
            </div>
            <button type="submit" id="register" class="btn btn-primary">Add Post</button>
        </form>
    )
}

export default addPost