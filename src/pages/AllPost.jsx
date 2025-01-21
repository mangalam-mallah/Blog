import React, {useState, useEffect} from 'react'
import {Container, PostCard } from '../Components'
import appwriteService from '../appwrite/configuration'

function AllPost() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

  return (
    <div className='w-full py-8'>
            <div className='flex flex-wrap'>
                {
                    posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard 
                            $id={post.$id} 
                            title={post.title} 
                            featuredImage={post.featuredImage} 
                            />

                        </div>
                    ))
                }
            </div>
    </div>
  )
}

export default AllPost