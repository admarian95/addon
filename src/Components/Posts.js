import { useEffect, useState } from 'react'
import Post from './Post'
import './Posts.css'
const Posts = () => {
    let [items,load] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3000' + '/getPosts', {
            method: 'GET',
            headers: {
                // 'Authorization' : sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            console.log(data.posts)
            if(data.posts.length!==0){
                load(data.posts)
            }
        })
    },[]);

    return (
        <div style={{ display: 'inline-block' }}>
            {items !== [] && items.map((el,idx)=> <Post post={el} key={idx} />)}
        </div>
    )
}

export default Posts