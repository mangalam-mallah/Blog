import React, { useState, useEffect } from 'react';
import { PostCard } from '../Components';
import appwriteService from '../appwrite/configuration';
import { Query } from 'appwrite';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService
      .getPosts([Query.equal('status', 'active'), Query.limit(2)])
      .then((posts) => {
        if (posts && posts.documents) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

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
    );
  }

  return (
    <div className="w-full py-8">
      {/* Mobile: Vertical Scroll */}
      <div className="flex flex-col sm:max-h-[calc(100vh-100px)] sm:overflow-y-auto sm:mb-0 px-4 sm:px-0">
        {/* Desktop: Grid Layout */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="w-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
