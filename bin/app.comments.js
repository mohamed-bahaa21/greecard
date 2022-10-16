
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