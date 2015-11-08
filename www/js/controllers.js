angular.module('starter.controllers', [])
.value('config', {
  server: "https://masterhack-server1.herokuapp.com/"
})
.service("$api", [
  "$http", "$rootScope", "config",
  function($http, $rootScope, config) {
    var api = {
      error: function(err) {
        console.log("API ERROR", JSON.stringify(err,null,2));
        throw err;
      },
      signup: function(data) {
        // Sign the user up
        console.log('Doing signup', JSON.stringify(res.data, null, 2));

        return $http
                .post(config.server + "api/user/signup", data)
                .then(function(res) {
                  console.log("signup response", res);

                  $rootScope.user = res.data;
                  return res.data;
                }, api.error);
      },
      login: function(data) {
        // Log the user in
        console.log('Doing login', JSON.stringify(res.data, null, 2));

        return $http
                .post(config.server + "api/user/login", data)
                .then(function(res) {
                  console.log("login response", res);

                  $rootScope.user = res.data.data;
                  return res.data;
                }, api.error);
      },
      scan: function(data) {
        // Scan receipt image through OCR
        console.log('Doing scan', JSON.stringify(data, null,2));

        return $http
                .post(config.server + "api/receipt", data)
                .then(function(res) {
                  console.log("scan response", JSON.stringify(res.data, null, 2));

                  return res.data;
                }, api.error);
      },
      confirm: function(data) {
        // Send a finished receipt for processing
        console.log('Doing confirm', JSON.stringify(res.data, null, 2));

        return $http
                .post(config.server + "api/receipt/process", data)
                .then(function(res) {
                  console.log("process response", res);

                  return res.data;
                }, api.error);
      }
    };

    return api;
  }
])
.controller('AppCtrl', [
  "$scope", "$rootScope", "$api", "$timeout", "$cordovaCamera", "$cordovaGeolocation", "config",
  function($scope, $rootScope, $api, $timeout, $cordovaCamera, $cordovaGeolocation, config) {
    console.log("starting app controller: ", $rootScope.$state);

    // Perform the login action when the user submits the login form
    $scope.doLogin = $api.login;

    $scope.scan = function() {
      console.log("starting receipt scan");

      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        // targetWidth: 1080,
        targetHeight: 1920,
        cameraDirection: 0,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:false
      };

      $cordovaCamera
      .getPicture(options)
      .then(function(imageData) {
        return { "image": imageData.substring(0, imageData.length-2) };
      })
      .then($api.scan)
      .then(function(data) {
        $scope.receipt = data;
        $rootScope.$state.go("app.charge");
      })
      .catch(function(err) {
        console.log("scan error: ", JSON.stringify(err, null, 2));
        alert("error scanning receipt");
      });
    };
}])
// .controller('HistoryCtrl', function($scope) {
//   console.log("starting history controller");

//   $scope.history = [
//     { title: 'Bachelor Party 2015', id: 1 },
//     { title: 'Vegas Trip', id: 2 }
//   ];

// })

.controller('ChargeCtrl', [
  "$scope", "$cordovaContacts", "$stateParams", "$ionicModal",
  function($scope, $cordovaContacts, $stateParams, $ionicModal) {
    console.log("starting ChargeCtrl");

    // get the contacts

    $scope.removeItem = function(idx, item) {
      $scope.receipt.lineItems.splice(idx,1);
    }

    $scope.addContacts = function(item) {
      console.log("adding contacts to item: ", item, $cordovaContacts);

      $cordovaContacts.pickContact().then(function(contact) { //omitting parameter to .find() causes all contacts to be returned
        console.log("what is this shit", JSON.stringify(contact, null, 2));
        
        if(!item.owners) {
          item.owners = []
        }

        item.owners.push({ 
          initials: contact.name.givenName.charAt(0) + contact.name.familyName.charAt(0),
          number: contact.phoneNumbers[0].value.replace(/[^\d]/g,'')
        });

        console.log("new shit", JSON.stringify(item,null,2));
        
        $ionicModal.fromTemplateUrl('templates/add.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      }, function(err) {
        console.log("get contacts fail: ", err);
      });
    };

    $scope.removeContact = function(item,idx) {
      item.owners.splice(idx,1);
    }

    $scope.addItem = function(item) {
      if(!$scope.receipt) {
        $scope.receipt = { lineItems: [] };
      }

      if(!$scope.receipt.items) {
        $scope.receipt.lineItems = [];
      }

      $scope.receipt.lineItems.push(item);
      $scope.modal.hide();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    }
}])
.controller('SettingsCtrl', function($scope, $stateParams) {
  console.log("starting setting controller");
})
.controller('ScanCtrl', function($scope, $stateParams) {
  console.log("starting scan controller");
})

;
