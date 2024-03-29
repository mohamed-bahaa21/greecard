const path = require("path");
const express = require("express");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const multer = require("multer");
const Jimp = require("jimp");

const sizeOf = require('image-size');
const dimensions = sizeOf('./public/imgs/design.jpeg');

const storage = multer.diskStorage({
  destination: "./public/imgs/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      'result.jpeg'
      // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("img");


function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const app = express();

app.set("view engine", "ejs");
app.use(
  express.urlencoded({ extended: false }),
  express.static("public"),
  cookieParser(),
  session({
    resave: false,
    saveUninitialized: false,
    secret: "#write@on@image#",
    cookie: {
      maxAge: 60000
    }
  }),
  flash()
);

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  // session.cookie.secure = true // serve secure cookies
}

app.get("/", (req, res) => {
  res.render("landing", { msg: req.flash("info") });
});
app.get("/demo", (req, res) => {
  res.render("index", { msg: req.flash("info") });
});

app.post("/demo", (req, res) => {
  req.flash("info", "successfull");
  res.redirect("/imgs/uploads/result.jpeg");

  // upload(req, res, err => {
  //   if (err) {
  //     req.flash("info", "not successfull");
  //     res.redirect("/");
  //   } else {

  //     var imgPath = req.file.path;
  //     console.log(imgPath);
  //     var imgCaption = req.body.name;
  //     var loadedImage;

  // Jimp.read(imgPath)
  //   .then(function (image) {
  //     loadedImage = image;
  //     return Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  //   })
  //   .then(function (font) {

  //     var textWidth = Jimp.measureText(font, imgCaption);
  //     var textHeight = Jimp.measureTextHeight(font, imgCaption);

  //     console.log({
  //       width: loadedImage.bitmap.width,
  //       height: loadedImage.bitmap.height,
  //       textWidth, textHeight
  //     });

  //     loadedImage.print(font,
  //       ((loadedImage.bitmap.width / 2) - (textWidth / 2)),
  //       ((loadedImage.bitmap.height / 2) - (textHeight / 2)), imgCaption).write(imgPath);

  //   }).then(function () {
  //     req.flash("info", "successfull");
  //     res.redirect("/imgs/uploads/result.jpeg");
  //   })
  //   .catch(function (err) {
  //     console.error(err);
  //     req.flash("info", "failed");
  //     res.redirect("/demo");
  //   });
  //   }
  // });
});

app.listen(3000, console.log("Server: 3000"));
