const multer = require('multer')
console.log("gggg");
const storage = multer.diskStorage({
<<<<<<< HEAD
  destination: (req, res, cb) => {
    cb(null, "./public/storage")
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
=======
    destination: (req, res, cb) => {
        console.log("hiiiiiiiiiiiiiiiiiiiii");
        cb(null, "./public/storage")
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname );
        cb(null, `${Date.now()}-${file.originalname}`)
    }
>>>>>>> origin/MohammedAtef
})

const upload = multer({ storage })

module.exports = upload;
