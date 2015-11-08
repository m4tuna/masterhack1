// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform, $state, $rootScope) {
  // expose state
  $rootScope.$state = $state;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: '/',
      views: {
        menuContent: {
          templateUrl: 'templates/login.html',
        }
      }
    })

    .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html',
          controller: 'SignupCtrl'
        }
      }
    })


    .state('app.nearby', {
      url: '/nearby',
      views: {
        'menuContent': {
          templateUrl: 'templates/nearby.html',
          controller: 'NearbyCtrl'
        }
      }
    })


    .state('app.newissue', {
      url: '/new-issue',
      views: {
        'menuContent': {
          templateUrl: 'templates/new-issue.html',
          controller: 'IssueCtrl'
        }
      }
    })

    .state('app.payment', {
      url: '/payment',
      views: {
        'menuContent': {
          templateUrl: 'templates/payment.html',
          controller: 'IssueCtrl'
        }
      }
    })

    .state('app.complete', {
      url: '/complete',
      views: {
        'menuContent': {
          templateUrl: 'templates/complete.html',
          controller: 'IssueCtrl'
        }
      }
    })


    .state('app.single', {
      url: '/single',
      views: {
        'menuContent': {
          templateUrl: 'templates/single.html',
          controller: 'IssueCtrl'
        }
      }
    })


    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'HistoryCtrl'
        }
      }
    })


    .state('app.history', {
      url: '/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html',
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'ContactsCtrl'
        }
      }
    })

    .state('app.upload', {
      url: '/upload',
      views: {
        'menuContent': {
          templateUrl: 'templates/upload.html',
          controller: 'UploadCtrl'
        }
      }
    })
    .state('app.payform', {
      url: '/payform',
      views: {
        menuContent: {
          templateUrl: 'templates/payform.html',
        }
      }
    })

  .state('app.historysingle', {
    url: '/history/:historyId',
    views: {
      'menuContent': {
        templateUrl: 'templates/history.html',
        controller: 'HistoryItemCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/');
});
