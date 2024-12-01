const fs = require('fs').promises
const path = require('path')
const multer = require('multer')
const { v4: uuidV4 } = require('uuid');
const { isImageAndTransform } = require('./helpers/avatarHelper');

const tempDir = path.join(__dirname, "../public/temp");
const storageImgDir = path.join(__dirname, "../public/avatars")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("in storage tempdir", tempDir)
        console.log("in storage storageImgDir", storageImgDir)
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        console.log("file before", file)
        cb(null, file.originalname)
        console.log("file after renaming", file)
    }
})

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"]
const mimetypeWhiteList = ["image/jpg", "image/jpeg", "image/png", "image/gif"]

const uploadMiddleware = multer({
    storage,
    fileFilter: async (req, file, cb) => {
        console.log("in fileFilter", file)
        const extension = path.extname(file.originalname).toLowerCase(); 
        const mimetype = file.mimetype
        console.log("extension:", extension)
        console.log("mimetype:", mimetype)

        if (
            !extensionWhiteList.includes(extension) || !mimetypeWhiteList.includes(mimetype)
        ) {
            console.log("w if fileFilter")
            return cb(null, false)
        }

        console.log("przed return w fileFilter")


        return cb(null, true)

    },
    limits: {
        fileSize: 1024*1024*5,
    }
})

const validateAndTransformAvatar = async (req, res, next) => {
    console.log("req in validate", req)
    if (!req.file) {
        return res.status(400).json({message: "File isn't a photo"})
    }

    console.log("w validate rq", req)

    const { path: tempFilePath } = req.file;
    console.log("req.file", req.file)

    // console.log("req file",req.file)

    const extension = path.extname(tempFilePath); // take an extension (eq. .jpg, .png etc.)
    const fileName = `${uuidV4()}${extension}`;
    console.log("filename in validate and transform", fileName)
    const filePath = path.join(storageImgDir, fileName);
    console.log("filepath in validate and transform", filePath)

    try {
        console.log("before rename")
        await fs.rename(tempFilePath, filePath);
        console.log("after rename")

        // req.file.destination = storageImgDir;
        // req.file.path = filePath;
        // req.file.filename = fileName;

    } catch (error) {
    console.log("Error in validateAndTransformAvatar:", error);
    await fs.unlink(tempFilePath);
    return next(error);
    }
    
    console.log("before validation ")
    console.log(filePath)
    const isValidAndTransform = await isImageAndTransform(filePath);
        console.log("after validation ") 
        console.log(isValidAndTransform)
        
    if (!isValidAndTransform) {
        console.log("w if vallid and transform")
        await fs.unlink(filePath)
        return res.status(400).json({ message: "Avatar's validation failed" })
    }



}

    module.exports = {
        uploadMiddleware,
        validateAndTransformAvatar
    }