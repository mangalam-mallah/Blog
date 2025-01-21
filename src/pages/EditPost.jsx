import React, {useState, useEffect} from 'react'
import { PostForm } from '../Components'
import appwriteService from '../appwrite/configuration'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post) {
                    setPost(post)
                }
            })
        }else {
            navigate('/')
        }
    },[slug, navigate])
    console.log("Slug : ", slug)

  return post ? (
    <div className='py-8'>
            <PostForm post={post}/>
    </div>
  ) : null
}

export default EditPost