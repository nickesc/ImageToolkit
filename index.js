const fs = require("fs");
const os = require("os");
const platform = os.platform();

let binPath = String.raw`bin/linux/`;
if (platform == "darwin") binPath = "bin/macos/";

const gm = require("gm").subClass({
  imageMagick: "7+",
  appPath: binPath
});

gm("img/dark-forces.webp")
  .resize(240, 240)
  .noProfile()
  .write("out/dark-forces.webp", function (err) {
        if (!err) console.log("done");
    else{
        throw(err)
    }
  });
