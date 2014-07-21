var fs = require('fs');
var express = require('express');
var app = express();

var dir = process.argv[2] || __dirname;
var directoryAccess = !!process.argv[3];
var port = 81;

app.configure(function(){
	app.use(function(req, res, next){
		console.log(req.url);
		next();
	});
	app.use(express.compress());
	app.use(express.static(dir));
	app.use(express.directory(dir),{
		icons:true,
		filter: function(a, b, c){
			console.log(a,b,c);
			return false;
		}
	});
	
	//app.use(app.router);
});

// app.get('/', function(req, res){
	// res.send('Node');
// });

app.listen(port);
console.log('port', port, dir, directoryAccess);