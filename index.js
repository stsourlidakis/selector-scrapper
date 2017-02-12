const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jsdom = require("jsdom");
const delay = 5;	//seconds
let url = '';
let ccsSelector = '';
let intervalId;
let previousValue = '';

if( process.argv.length==4 ){
	url = process.argv[2];
	ccsSelector = process.argv[3];
}


function stopWatch(){
	clearInterval(intervalId);
}

function startWatch(socket){
	checkValue(socket);
	intervalId = setInterval(function(){
		checkValue(socket);
	}, delay*1000);
}

function checkValue(socket){
	jsdom.env(
		url,
		function (err, window) {
			const newValue = window.document.querySelector(ccsSelector).textContent;
			if( previousValue!==newValue ){
				console.log(`Value changed from ${previousValue} to ${newValue}`);
				socket.emit('new-value', { new: newValue, old: previousValue });
			} else {
				console.log(`The value is ${newValue}`);
			}

			previousValue = newValue;
		}
	);
}

io.on('connection', function (socket) {
	socket.on('start-watch', function (data) {
		url = data.url;
		ccsSelector = data.selector;
		startWatch(socket);
		console.log(`Started watching: ${data.url}`);
	});
	socket.on('stop-watch', function(data){
		stopWatch();
		console.log(`Stopped watching: ${data.url}`);
	});
	socket.on('disconnect', function(data){
		previousValue = '';
		stopWatch();
		console.log(`Stopped watching: due to disconnect`);
	});
});

server.listen(80);

app.use('/', express.static('public'));
const port = process.env.PORT || 80;
server.listen(port, function () {
	console.log(`App listening on port ${port}!`);
});
