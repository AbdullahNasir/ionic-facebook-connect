// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform) {


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

        openFB.init({appId: '875972015774490'});

        var checkLoggedIn = function($q,$ionicLoading){
            $ionicLoading.show({template:"Checking Login Status"});
            var deferred = $q.defer();

            openFB.getLoginStatus(function(response){
                $ionicLoading.hide();
                if(response.status === 'connected'){
                    deferred.resolve('connected');
                }else{
                    deferred.reject('user not logged in');
                    location.href = "#/login";
                }
            });

            return deferred.promise;
        };


        // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('login',{
          url:'/login',
          templateUrl:"templates/login.html",
          controller:"LoginController"

      })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    },
          resolve:{
              loggedIn:checkLoggedIn
          }
  })

  .state('tab.photos', {
      url: '/photos',
      views: {
        'tab-photos': {
          templateUrl: 'templates/tab-photos.html',
          controller: 'PhotosCtrl'
        }
      },
          resolve:{
            loggedIn:checkLoggedIn
          }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/profile');

});
