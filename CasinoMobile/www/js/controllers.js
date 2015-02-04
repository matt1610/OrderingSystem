// var socket = io('http://192.168.1.103:8080');

var socket = io('http://192.168.1.101:8080');

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup) {

    $scope.Data = {
        Cart : [],
        FloorNumber : ''
    }

    $scope.Menu;

    socket.emit('clientConnection');

    socket.on('menu', function (data) {
      Menu = data.Menu;
      $scope.Menu = data.Menu;
      $scope.Data.ID = data.ID;
      console.log($scope.Data.ID);
    });

    socket.on('MessageToClient', function(data) {

      if (data.Type == 'Success') {

        $ionicPopup.alert({
          title: 'Success',
          template: data.Message
        });

      };

      if (data.Type == 'OrderSent') {
          $ionicPopup.alert({
            template: data.Message
          });
      };
      
    });

    $scope.SendMessage = function () {

      if ($scope.Data.FloorNumber.length < 1) {
          $scope.Data.FloorNumber = prompt('Please enter table number');
          if ($scope.Data.FloorNumber == null) {
              $scope.Data.FloorNumber = '';
              return;
          };
      };

      $scope.Data.Time = new Date();

      socket.emit('order', $scope.Data);
      $scope.Data.Cart = [];

      for (var i = 0; i < $scope.Menu.length; i++) {
        if ($scope.Menu[i].hasOwnProperty('amount')) {
          delete $scope.Menu[i].amount;
        };
      };

      $ionicPopup.alert({
          title: 'Success',
          template: 'Your order has been sent'
        });

    }

    $scope.AddToCart = function (item) {
      if (item.hasOwnProperty('amount')) {
          item.amount++;
      } else {
        item.amount = 1;
        $scope.Data.Cart.push(item);
      }
      
    }


  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.CheckAmount = function(item) {
    return !item.hasOwnProperty('amount');
  }


  $scope.login = function() {
    $scope.modal.show();
  };

})

.controller('PlaylistsCtrl', function($scope) {
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
