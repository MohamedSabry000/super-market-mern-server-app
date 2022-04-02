const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
      console.log("what");
    cb(null, "./public/storage");
  },
  filename: function (req, file, cb) {
      console.log("file");
      const path = Date.now() + '-' + file.originalname;
      req.body.file = {path};
    //   console.log(req);
    // cb(null, Date.now() + '-' + file.originalname );
    cb(null, path);
  },
});

const upload = multer({ storage });

module.exports = upload;
