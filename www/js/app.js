// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
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

  .state('main', {
    url: '/',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html'
      }
    }
  })

  .state('history', {
      url: '/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html',
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('upload', {
      url: '/upload',
      views: {
        'menuContent': {
          templateUrl: 'templates/upload.html',
          controller: 'UploadCtrl'
        }
      }
    })

  .state('single', {
    url: '/history/:historyId',
    views: {
      'menuContent': {
        templateUrl: 'templates/history.html',
        controller: 'HistoryCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('main');
});
