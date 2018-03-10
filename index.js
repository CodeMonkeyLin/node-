const express = require("express");
const app = express();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
app.use(express.static("./public"));
app.use("/pic", express.static("./pic"));
app.post("/upload", (req, res, next) => {
	const form = new formidable.IncomingForm();
	form.uploadDir = path.normalize(__dirname + "/pic");
	console.log(form.parse)
	form.parse(req, function (err, fields, files){
		console.log(files)
		let oldpath = files.tx.path;
		let filename = new Date().getTime();
		let newpath = path.normalize(__dirname + "/pic/" + filename + ".jpg");
		fs.rename(oldpath, newpath, (err) => {
			if(err) {
				res.send("fail");
				return;
			}
			res.redirect("/index.html?" + filename);
		})
	})

})
app.listen(3000, () => {
	console.log("running.....")
})