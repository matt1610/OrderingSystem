var socket = io.connect();

var Casino = angular.module('Casino', []).

controller('MainCtrl', function($scope){
	
	socket.on('eventname', function (data) {
		
	})

	socket.emit('clientConnection',{message : 'message'});

})