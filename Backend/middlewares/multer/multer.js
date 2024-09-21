// const multer = require('multer');
// const upload = multer({dest:'uploads/'});
// const multerUpload = upload.single('image');

// module.exports = multerUpload

const multer = require('multer');
const path = require('path');

// Set up storage options and file validation for Aadhar card uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/aadharCard'); // Store the files in this directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
    }
});

// Only accept image files for the Aadhar card (jpg, png)
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        return cb(new Error('Only JPG, JPEG, PNG Format images are allowed!'), false);
    }
    cb(null, true);
};

// Set up multer middleware with storage and file filtering
const multerUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
});

module.exports = multerUpload.single('aadharCard');




// multer.diskStorage():
// This function configures how files will be stored on the server (in which folder and under which filename).

// destination:

// req: This is the request object from Express. It represents the HTTP request being made, but in this case, it is not heavily used.
// file: This is the file that is being uploaded. It contains file information such as its name, size, and type.
// cb: This stands for "callback." After processing the file, this function is called to indicate where the file should be saved. The first parameter is for errors (if any), and the second is the path for storing the file.
// filename:

// req, file, and cb serve the same purpose as above.
// cb(null, Date.now() + path.extname(file.originalname)): This line generates a unique filename by adding the current timestamp (Date.now()) to the original file’s extension (path.extname(file.originalname)).




// This function ensures that only image files (JPG, PNG) are uploaded.

// ext: This variable extracts the file extension (e.g., .jpg, .png) from the file name.
// Filter Logic:
// If the file extension is not .jpg, .jpeg, or .png, the callback is invoked with an error: cb(new Error('Only images are allowed!'), false). The false means to reject the file.
// If the file is valid, the callback is invoked with cb(null, true), meaning the upload can proceed.




// storage: This specifies how and where to save the uploaded files, which you configured earlier with multer.diskStorage.
// fileFilter: This is the file filtering function that only allows certain file types (in this case, images).
// limits: This sets limits for the file, like the maximum size. Here it is 5MB (1024 * 1024 * 5).




// multer.diskStorage(): Configures where to store files and what their names will be.
// fileFilter: Filters the file types, allowing only images (JPG, PNG).
// Multer Instance (multerUpload): Sets up file handling with storage, filters, and file size limits.
// Export: The middleware handles a single file upload with the field name aadharImage.