import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite"


export class Service {
    client = new Client()
    databases;
    bucket;
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            // .setKey(conf.appwriteApiKey)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);

    }

//databases

    async createComplaint({ title, description, status, userId, image }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    description,
                    status,
                    userId,
                    image,
                }
            )

        } catch (error) {
            console.log("Appwrite service :: createComplaint :: error", error);

        }
    }

    async updateComplaint(id, { title, description, status, image }) {
        try {

            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    description,
                    status,
                    image,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateComplaint :: error", error);

        }
    }

    async deleteComplaint(id) {
        try {

            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                id
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteComplaint :: error", error);
            return false;
        }
    }

    async getComplaint(id) {
        try {
            const complaint = await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                id
            );
            return complaint;
            
        } catch (error) {
            console.log("Appwrite service :: getComplaint :: error", error);
            return false;
        }
    }
    

    async getAllComplaints(queries = []) {
        //Query.equal("status", active)//
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getAllComplaints :: error", error);
            return false
        }
    }

    async getUserComplaints(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('userId', userId)
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getUserComplaints :: error", error);
            return false
        }
    }


//storage

    async uploadFile(file) {
        
        try {
            
            return await this.bucket.createFile(
              conf.appwriteBucketId,
               ID.unique(),
               file,
               [
                Permission.read(Role.any()),
               ]
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        //whenever file sucessfully uploaded it return fileId and receavie in featuredImage = fileId
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    async getFileView(fileId) {
        try {
    
            console.log("FileId is: ", fileId);
            
           const file_url =  await this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )
            console.log("file_url", file_url);
            
            return file_url;
        } catch (error) {
            console.log("File Not getting ", error);
            
        }
    }

    fileDownLoad(fileId) {
        try {
            return this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: fileDonwnLoad :: error", error);
            return false
        }
    }

}

const service = new Service()

export default service