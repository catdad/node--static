/* jshint node: true, -W030 */

var fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    express = require('express'),
    app = express();

// set default values for the global variables
var dir = __dirname,
    directoryAccess = false,
    port = 81;

process.argv.forEach(function(el, i){
    if (i < 2) {
        // this is either "node" or the filename, ignore it
        return;
    } else if (fs.existsSync(path.resolve(el))) {
        // this item exists as a path name, use it as the dir variable
        dir = el;
    } else if (el === "true" || el === "false") {
        // this item is a boolean, use it for directory access
        directoryAccess = (el === "true");   
    } else if (+el) {
        // this item is a number, use it as the port
        port = el;
    }
});

dir = path.resolve(dir);

app.configure(function(){
	app.use(function(req, res, next){
		console.log(chalk.cyan(req.url));
		next();
	});
	app.use(express.compress());
	app.use(express.static(dir));
	
    directoryAccess && app.use(express.directory(dir),{
		icons: true,
		filter: function(a, b, c){
			console.log(a,b,c);
			return true;
		}
	});
	
	//app.use(app.router);
});

// app.get('/', function(req, res){
	// res.send('Node');
// });

app.listen(port);

// print info to console
var info = [
    ['port', port].join(': '),
    ['path', dir].join(': '),
    ['directory access', directoryAccess].join(': ')
].join('\n\r');
console.log(chalk.yellow(info));
