angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  console.log("starting app controller");
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  // $scope.loginData = {};

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
})

.controller('HistoryCtrl', function($scope) {
  console.log("starting history controller");

  $scope.history = [
    { title: 'Bachelor Party 2015', id: 1 },
    { title: 'Vegas Trip', id: 2 }
  ];
  
})
.controller('SettingsCtrl', function($scope, $stateParams) {
  console.log("starting setting controller");
})
.controller('HistoryItemCtrl', function($scope, $stateParams) {
  console.log("starting history item controller");
})

.controller('UploadCtrl', function($scope, Camera) {
  console.log("starting upload controller");
  function takePicture() {
    navigator.camera.getPicture(function(imageURI) {

      // imageURI is the URL of the image that we can use for
      // an <img> element or backgroundImage.

    }, function(err) {

      // Ruh-roh, something bad happened

    }, cameraOptions);
  }

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };
})

;