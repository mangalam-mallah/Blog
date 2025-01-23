import { Client, ID, Storage, Databases, Query} from 'appwrite'
import config from '../config/config';

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
        console.log("Endpoint ", this.client
            .setEndpoint(config.appwriteURL));
        
    }

    async createPost({title, slug, content, featuredImage, status, userID}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )

        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
             await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
           return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries
            );
            console.log('Fetched posts:', response.documents);
            return response;
        } catch (error) {
            console.log("Error fetching posts:", error);
            throw error;
        }
    }
    

    // File upload services/methods

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileID) {
        try {
             await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileID,
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileID) {
        try {
            // console.log('Fetching preview for fileID:', fileID); // Add this line
            console.log("FileId", this.bucket.getFilePreview(config.appwriteBucketID, fileID));
            return this.bucket.getFilePreview(config.appwriteBucketID, fileID);
            
        } catch (error) {
            // console.error('Error getting file preview:', error);
            throw error;
        }
    }
    
    
}

const service = new Service();

export default service