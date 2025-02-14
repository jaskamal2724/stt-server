import multer from "multer"

const allowedMimeTypes = [
    "audio/mpeg",    // MP3
    "audio/wav",     // WAV
    "audio/ogg",     // OGG
    "audio/flac",    // FLAC
    "audio/aac",     // AAC
    "audio/mp4",     // MP4 Audio
    "audio/webm"     // WebM Audio
];

// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

// valiadate file type 

const fileFilter = (req, file, cb)=>{
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else {
        cb(new Error("invalid file type. only audio files are allowed"),false)
       
    }
}

const upload = multer({ 
    storage: storage ,
    // fileFilter:fileFilter
})

export default upload