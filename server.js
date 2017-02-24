// server.js
//=========================================================

// Simple File upload using Express.js + multer
//=========================================================

var express =   require("express");
var multer  =   require('multer');
var app		=	express();

// MULTER CONFIGURATION
//=========================================================
var storage =   multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
	}
});

var upload = multer({ storage : storage}).array('userPhoto', 5);

// This will help to load other included files in index.html
app.set("view options", {layout: false});
app.use(express.static(__dirname));

// ROUTER
//=========================================================

// HOME PAGE
app.get('/',function(req,res){
	res.sendFile(__dirname + "/index.html");
});

// UPLOAD PAGE
app.post('/api/photo', upload, function(req, res){
	console.log("Files :: -- ", req.files);
	res.render("File is uploaded");
});

// START EXPRESS SERVER
//=========================================================
app.listen(3000,function(){
    console.log("Working on port 3000");
});