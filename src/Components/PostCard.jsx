import React from 'react';
import appwriteService from "../appwrite/configuration";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="w-full h-48 relative rounded-t-xl overflow-hidden mb-4">
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title} 
            className="object-cover w-full h-full rounded-t-xl"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-30 rounded-t-xl"></div>
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 truncate">{title}</h2>
          <p className="text-gray-600 mt-2 text-sm">Click to read more...</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
