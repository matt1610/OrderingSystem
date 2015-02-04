//*** Setup server ***
var express = require('express'),
	app		= express(),
	server 	= require('http').createServer(app),
	io 		= require('socket.io').listen(server),
	url		= require('url'),
	clients = 0;

server.listen(process.env.PORT || 8080);

//*** Routing ***
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + '/img'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/kiosk', function (req, res) {
  res.sendfile(__dirname + '/kiosk.html');
});

//*** Socket connection ***
io.sockets.on('connection', function (socket) {

//	Fire event to the client side which associated to this socket.
	// socket.emit('menu', Data);
	
//	Fire event to all other sockets.
//	socket.broadcast.emit('eventname', data);
	
//	Fire event to all sockets connected
//	io.sockets.emit('eventname', data);

	Data.ID = socket.id;
	
	socket.on('order', function (data) {
	    io.sockets.emit('ToKiosk', data);
	});

	socket.on('Message', function(data) {
		socket.broadcast.to(data.ID).emit('MessageToClient', data);
	});

	socket.on('clientConnection', function (data) {
		clients++;
		io.sockets.emit('kiosk', clients);
		socket.emit('menu', Data);
	});

	socket.on('disconnect', function () {
		clients--;
		io.sockets.emit('disconnected', clients);
	});
});





































Data = {
	Menu : [
		{
			"name" : "Vodka Lime & Water",
			"price" : "29.99",
			"Description" : "Food Item Description"
		},
		{
			"name" : "Whiskey & Water",
			"price" : "39.99",
			"Description" : "Food Item Description"
		},
		{
			"name" : "Castle Light Draught",
			"price" : "19.99",
			"Description" : "Food Item Description"
		},
		{
			"name" : "Brandy & Coke",
			"price" : "25.99",
			"Description" : "Food Item Description"
		},
		{
			"name" : "Craft Beer",
			"price" : "29.99",
			"Description" : "Food Item Description"
		},
		{
			"name" : "Tequila",
			"price" : "29.99",
			"Description" : "Food Item Description"
		},
		{
			"name" : "Pizza",
			"price" : "59.99",
			"Description" : "Food Item Description"
		},
		{
			"name" : "Cheese Burger",
			"price" : "38.99",
			"Description" : "Food Item Description"
		},
		{
			"name" : "Chicken a la King",
			"price" : "108.99",
			"Description" : "Food Item Description"
		},
		{
			"name" : "Mutton Curry",
			"price" : "89.99",
			"Description" : "Food Item Description"
		}
	]
}