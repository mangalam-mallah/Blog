import React, {useState, useEffect} from 'react'
import { PostCard } from '../Components'
import appwriteService from '../appwrite/configuration'
import { Query } from 'appwrite'

function Home() {
    const [posts, setPosts] = useState([])

    // In the Home component
    useEffect(() => {
        appwriteService.getPosts([Query.equal("status", "active"), Query.limit(1)])
            .then((posts) => {
                console.log("Fetched posts for Home: ", posts);
                if (posts && posts.documents) {
                    setPosts(posts.documents);
                }
            }).catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    
    

    // console.log("Current posts:", posts);

  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
        </div>
    )
}


export default Home