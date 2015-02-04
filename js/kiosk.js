var socket = io.connect();

var Casino = angular.module('Casino', []).

controller('MainCtrl', function($scope){

	$scope.Users;
	$scope.Orders = [];
	
	socket.on('kiosk', function (data) {
		$scope.Users = data;
		$scope.$apply();
	});

	socket.on('ToKiosk', function (order) {

		var total = 0;

		for (var i = 0; i < order.Cart.length; i++) {
			total += order.Cart[i].amount * parseFloat(order.Cart[i].price);
		};

		order.Cart.Total = Math.floor(total * 100) / 100;

		$scope.Orders.push(order);
		$scope.$apply();
		console.log(order);
	});

	socket.on('disconnected', function (data) {
		$scope.Users = data;
		$scope.$apply();
	});

	$scope.MessageToUser = function(order, message, type) {

		order[type] = true;

		console.log(order);

		socket.emit('Message', {
			ID : order.ID, 
			Message : message, 
			Type : type
		});
	}

})