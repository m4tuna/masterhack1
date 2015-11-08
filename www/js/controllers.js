angular.module('starter.controllers', [])

.controller('AppCtrl', [
  "$scope", "$rootScope", "$ionicModal", "$timeout", "$cordovaCamera", "$cordovaGeolocation",
  function($scope, $rootScope, $ionicModal, $timeout, $cordovaCamera, $cordovaGeolocation) {
    console.log("starting app controller", $rootScope.$state);

    $scope.scan = function() {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        console.log("this is a test", imageData);
      }, function(err) {
        console.log("picture error", err);
        // error
      });
    }

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
}])
.value('config', {
  server: "http://masterhack-server1.herokuapp.com/"
})
.controller('ContactsCtrl', function($scope, $cordovaContacts, $stateParams){
  console.log("starting contacts controller");

  $scope.getContacts = function() {
    $scope.phoneContacts = [];
    function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }
    };
    function onError(contactError) {
      alert(contactError);
    };
    var options = {};
    options.multiple = true;
    $cordovaContacts.find(options).then(onSuccess, onError);
  };
})

.controller('HistoryCtrl', function($scope) {
  console.log("starting history controller");

  $scope.history = [
    { title: 'Bachelor Party 2015', id: 1 },
    { title: 'Vegas Trip', id: 2 }
  ];

})

.controller('NearbyCtrl', function($scope, $stateParams) {
  console.log("starting nearby controller");
})
.controller('ScanCtrl', function($scope, $stateParams, $http, config) {
  console.log("starting ScanCtrl");
})
.controller('SignupCtrl', function($scope, $stateParams) {
  console.log("starting issue controller");
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
