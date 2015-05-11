angular.module('starter.controllers', [])

.controller('ProfileCtrl', function($scope,$ionicLoading,$ionicViewService) {
        //removing login screen from navigation history.
        $ionicViewService.clearHistory();
        $ionicLoading.show({template:"Retrieving Profile"});
        openFB.api({
            path: '/me',
            success: function(user) {
                $ionicLoading.hide();
                $scope.$apply(function() {
                    $scope.user = user;
                });
            },
            error: function(error) {
                $ionicLoading.hide();
                alert('Facebook error: ' + error.error_description);
            }
        });

    })

.controller('PhotosCtrl', function($scope,$ionicLoading) {
        $ionicLoading.show({template:"Retrieving Photos"});
        openFB.api({
            path: '/me/photos',
            success: function(photos) {
                $ionicLoading.hide();
                $scope.$apply(function() {
                    $scope.photos = photos.data ;
                });
            },
            error: function(error) {
                $ionicLoading.hide();
                alert('Facebook error: ' + error.error_description);
            }
        });
})

.controller('LoginController',function($scope,$state,$ionicLoading){

        $scope.fbLogin = function(){
            $ionicLoading.show({template:'Logging In'});
            openFB.login(
                function(response) {
                    if (response.status === 'connected') {
                        $ionicLoading.hide();
                        console.log('Facebook login succeeded');
                        $state.go('tab.profile');
                    } else {
                        alert('Facebook login failed');
                    }
                },
                {scope: 'public_profile,email,user_photos,user_friends'});
        }
});