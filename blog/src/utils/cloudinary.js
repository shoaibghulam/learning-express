import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const uploadFileCloudinary =  async(filepath)=>{
    try {
          if(!filepath) return null;
         const response=await  cloudinary.uploader.upload(filepath,{
          resource_type:"auto"
          });
          console.log("Uploading path is",response.url);
          return response
    } catch (error) {
        fs.unlinkSync(filepath);
        return null;
    }
}
export { uploadFileCloudinary};