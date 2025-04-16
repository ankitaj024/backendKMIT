const multer = require("multer");
const fs = require("fs");
const path = require("path");

const allowedFormates = ["image/jpg", "image/jpeg", "image/png", "text/csv",  "application/vnd.ms-excel",
  "application/csv"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let { name } = req.query;
    if (!name) {
      return cb(new Error("please Enter the name in the url"));
    }
    
    const parentDir = path.resolve(__dirname, "..");
    // console.log(parentDir)
    const uploadPath = path.join(parentDir, "uploads", name);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileSizeLimit = 10 * 1024 * 1024;

const fileFilter = (req, file, cb) => {
  if (allowedFormates.includes(file.mimetype)) {
    cb(null, true);
  } else {
    
    cb(new Error("Please upload PNG, JPG, JPEG formate only"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizeLimit },
  fileFilter: fileFilter,
});

const uploadFiles = (req, res) => {
  try {
    upload.array("file", 3)(req, res, function (err) {
      if (err) {
        return res.status(500).send({ status: 500, message: err.message });
      }
      res.status(200).send({
        status: 200,
        message: "File uploaded successfully",
        files: req.files.map((file) => ({
          storedName: file.filename,
          filePath: file.path,
        })),
      });
    });
  } catch (error) {

    res.status(500).send({ status: 500, message: error.message });
  }
};

const deleteUpload = (req, res) => {
  try {
    const { fileName } = req.query;
    if (!fileName) {
      res.status(404).send({ status: 404, message: "Not such file found" });
    }
    const parentDir = path.resolve(__dirname, "..");
    // const deleteFilePath = `${parentDir}/uploads/${fileName}`;
    const deleteFilePath = path.join(parentDir, "uploads", fileName);
    fs.unlinkSync(deleteFilePath);
    res.status(200).send({ status: 200, message: "Succesfully deleted" });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

module.exports = { uploadFiles, deleteUpload };
