// We need the http and fs mosules for app to work
var http = require("http");
var fs = require("fs");

// Include socket.io which was installed by npm. It is NOT part of core.
var socketio = require("socket.io");

var server = http.createServer((req,res)=>{
	console.log("Someone connected via HTTP!");

	if(req.url == '/'){
		fs.readFile('index.html', 'utf-8',(error,data)=>{
		// console.log(error);
		// console.log(data);
			if(error){
				res.writeHead(500,{'content-type':'text/html'});
				res.end('Internal Server Error');
			}else{
				res.writeHead(200,{'content-type':'text/html'});
				res.end(data);
			}
		});
	}else if(req.url == '/styles.css'){
		fs.readFile('styles.css', 'utf-8',(error,data)=>{
		// console.log(error);
		// console.log(data);
			if(error){
				res.writeHead(500,{'content-type':'text/css'});
				res.end('Internal Server Error');
			}else{
				res.writeHead(200,{'content-type':'text/css'});
				res.end(data);
			}
		});

	}else if(req.url == '/config.js'){
		fs.readFile('config.js','utf-8',(error,data)=>{
			if(error){
				res.writeHead(500,{'content-type':'text/html'});
				res.end('Internal Server Error');
			}else{
				res.writeHead(200,{'content-type':'application/javascript'});
				res.end(data);
			}
		})
	}else{
		res.writeHead(404,{'content-type':'text/html'});
		res.end('<h1>This page does not exist</h1>');
		//404
	}

	
});

var userArray = [];
var inout

var io = socketio.listen(server);
// Handle socket connections...
io.sockets.on('connect',(socket)=>{                   // Adding 4 event listeners once connected
	console.log("Someone connected via socket!");
	// console.log()

	socket.on('nameToServer',(name)=>{                 // To include names of everyone online, emit array of names
		// var clientInfo = new Object();
		// clientInfo.name = name;
		// clientInfo.clientId = socket.id;
		// userArray.push(name);
		console.log(name + " just joined.");
		io.sockets.emit('newUser',name);
	});
	socket.on('sendMessage',()=>{
		console.log("Someone clicked on the big blue button.")
	})
	socket.on('messageToServer',(messageObj)=>{
		io.sockets.emit('messageToClient','\xa0\xa0'+messageObj.name.bold()+':'+'\xa0\xa0\xa0' +messageObj.newMessage+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+messageObj.time.italics());
	});

	// socket.on('disconnect',(data)=>{
	// 	console.log('Someone disconnected...');          // Disconnect????????
	// })





});


server.listen(8080);
console.log("Listening on port 8080");

// function updateUsers(){
// 	io.emit('newUser',{userArray,inout})
// }















