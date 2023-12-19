const express = require("express")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
require("./config")
const Image = require("./ImageUpload")
const app = express()
app.use(express.json())
app.use(cors())
app.use('/abc', express.static(path.join(__dirname + '/upload')));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "upload")
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
  })
}).single("user_file")
app.post("/image-upload", upload, async (req, resp) => {

  const image = new Image({ image: req.file.filename });
  const result = await image.save();
  if (result) {
    resp.send(result)
  } else {
    resp.send({ result: "image is not in the database" })
  }

})
app.get("/image", upload, async (req, resp) => {


  const result = await Image.find();
  if (result) {
    resp.send(result)
  } else {
    resp.send({ result: "no images is in the database" })
  }

})


app.listen(5000)