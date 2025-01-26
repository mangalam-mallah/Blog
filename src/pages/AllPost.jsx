import React, { useState, useEffect } from 'react';
import { PostCard } from '../Components';
import appwriteService from '../appwrite/configuration';

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      {/* Mobile: Vertical Scroll */}
      <div className="flex flex-col items-center gap-6 px-4 sm:px-0 overflow-y-auto sm:overflow-y-visible max-h-[calc(100vh-100px)]">
        {/* Desktop: Grid Layout */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="w-full">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPost;
