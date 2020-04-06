const path = require("path");
const express = require("express");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const multer = require("multer");
const Jimp = require("jimp");
const upload = multer({ dest: __dirname + "/public/imgs/uploads/" });

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
  res.render("index", { msg: req.flash("info") });
});

app.post("/", upload.single("img"), (req, res) => {
    res.json(req.file);

});

// app.get("/write", (req, res) => {
// const { img, name } = req.body;
// res.send(img);

// var imgPath = "public/imgs/design.jpeg";
// var imgCaption = name;
// var loadedImage;

// Jimp.read(imgPath)
//   .then(function(image) {
//     loadedImage = image;
//     return Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
//   })
//   .then(function(font) {
//     loadedImage.print(font, 10, 10, imgCaption).write(loadedImage);

//     req.flash("info", "wrote success");
//     res.redirect("/");
//   })
//   .catch(function(err) {
//     console.error(err);
//   });

// req.flash("info", "wrote not success");
// res.redirect("/");
// });

app.listen(3000, console.log("Server: 3000"));
