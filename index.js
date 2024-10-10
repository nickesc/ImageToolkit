const fs = require("fs");
var path = require("path");
const os = require("os");
const express = require("express");
const platform = os.platform();

let binPath = String.raw`bin/linux/`;
if (platform == "darwin") binPath = "bin/macos/";

const gm = require("gm").subClass({
  imageMagick: "7+",
  //appPath: binPath
});

app = express();
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log("listening")
});


app.get("/", (req, res) => {
    gm("img/dark-forces.webp")
      .resize(240, 240)
      .noProfile()
      .write("out/dark-forces.webp", function (err) {
        if (!err) console.log("done");
        else {
          throw err;
        }
      });
    res.sendFile(path.join(__dirname, "out/dark-forces.webp"));
})
