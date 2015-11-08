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

        // $scope.loading = true;


        return $http
                .post(config.server + "api/receipt", data)
                .then(function(res) {
                  console.log("scan response", JSON.stringify(res.data, null, 2));
                  // $scope.loading = false;
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
  "$scope", "$rootScope", "$api", "$timeout", "$cordovaCamera", "$cordovaGeolocation", "config", '$state',
  function($scope, $rootScope, $api, $timeout, $cordovaCamera, $cordovaGeolocation, config, $state) {
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
        targetHeight: 1000,
        cameraDirection: 0,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true,
      };
      $scope.loading = true;
      var isSet = false;
      $cordovaCamera
      .getPicture(options)
      .then(function(imageData) {

        return { "image": imageData.substring(0, imageData.length-2) };
      })
      .then($api.scan)
      .then(function(data) {
        $scope.receipt = data;
        isSet = true;
      })
      .catch(function(err) {
        console.log("scan error: ", JSON.stringify(err, null, 2));
        alert("error scanning receipt");
      })
      .finally(function () {
        $scope.loading = false;
        if(isSet) {
          $state.go('app.charge');
        }
      });
    };

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
  // };
}])
.controller('HistoryCtrl', function($scope) {
  console.log("starting history controller");

  $scope.history = [
    { title: 'Bachelor Party 2015', id: 1 },
    { title: 'Vegas Trip', id: 2 }
  ];

})

.controller('ChargeCtrl', function($scope, $cordovaContacts, $stateParams, $ionicModal) {
  console.log("starting ChargeCtrl");
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
      }, function(err) {
        console.log("get contacts fail: ", err);
      });
    };

    $scope.removeContact = function(item,idx) {
      item.owners.splice(idx,1);
    }

    $scope.addItem = function() {
      $ionicModal.fromTemplateUrl('templates/add.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }

    $scope.adding = function(item) {
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
    };
})
.controller('ScanCtrl', function($scope, $stateParams, $http, config) {
  console.log("starting ScanCtrl");

  //PAYMENT LOGIC HERE
  //  SimplifyCommerce.generateToken({
  //    key: "sbpb_NzYwZjc1YmEtMmZhOC00MTMzLWE1ZWQtY2EzYjA2OTYzZTBj",
  //    card: {
  //      number: "4111111111111111",
  //      cvc: "234",
  //      expMonth: "10",
  //      expYear: "16"
  //    }
  //  }, function(data){
  //     console.log("Processing token");
  //    if (data.error) {
  //      // Show any validation errors
  //      if (data.error.code == "validation") {
  //        var fieldErrors = data.error.fieldErrors,
  //        fieldErrorsLength = fieldErrors.length,
  //        errorList = "";
  //        for (var i = 0; i < fieldErrorsLength; i++) {
  //          errorList += fieldErrors[i].field + ": " + fieldErrors[i].message;
  //        }
  //        console.log("Error: ", errorList);
  //      }
  //    } else {
  //       console.log("Connecting to masterhack server1");
  //       // The token contains id, last4, and card type
  //       var token = data["id"];
  //       //pay 5 dollers
   //
  //       $http.post(config.server + "/api/issue/pay", {
  //         token: token,
  //         amount: 5
  //       }).then(function(){
  //         console.log("PAYMENT COMPLETED! YEA YEA");
  //       });
  //    }
  //  });
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
