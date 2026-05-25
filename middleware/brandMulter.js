import { v2 as cloudinary } from 'cloudinary';

import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';  

dotenv.config();

cloudinary.config({
    cloud_name: "dspp2vqid",
    api_key: "568976388911298",
    api_secret:"_aZ1r2NEQ2Put4_UdQrOLDSzHjQ",
    secure: true
}); 

const storage = multer.diskStorage({
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const fileFilter = (req, file, cb) => {
    
    const allowedTypes = /jpeg|png|gif|webp/;

    const ext = path .extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }

};

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader
        .upload(filePath.path, {
            folder: "Brand", // Optional: specify a folder
            resource_type: "image" // Automatically detects image vs video
        });
        
        console.log('Upload successful! URL:', result.secure_url);
        return result;

    } catch (error) {
        console.error(' Cloudinary Image Upload Error:', error);
         throw error;
    }
};

const brandMulter = multer({ storage, fileFilter,
    limits: {fileSize: 5 * 1024 * 1024 }, // 5MB max file size
});
    
export { brandMulter, uploadImage};