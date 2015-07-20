/****************************************************************************
 *                                                                          *
 *                      MASTER - APP                                        *
 *                                                                          *
 *      master-app.js it's the parent controller of all the app's           *
 *      controllers.                                                        *
 *                                                                          *
 *      Responsible for connecting to the facebook user profile,            *
 *      holding the main module (suiteApp) and fix function for             *
 *      any other control to use.                                           *
 *                                                                          *
 *                                                                          *
 *      Created by Ben Ari Kutai && Noam Rom                                *                                                                          *
 ****************************************************************************/

var BASE_URL = "http://serversuitmybeer.herokuapp.com";

var suiteApp = angular.module('suiteApp',['ngRoute','ngAutocomplete','leaflet-directive','angular-carousel']);

var USER =  null;

suiteApp
.config(['$routeProvider','$locationProvider','$httpProvider',
    function($routeProvider,$locationProvider,$httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider.
    when('/', {
            templateUrl: 'templates/signup.html',
            controller: 'signupCntrl'
    }).
    when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'signupCntrl'
    }).
    when('/welcome', {
            templateUrl: 'templates/welcome.html',
            controller: 'welcomeCntrl'
    }).
    when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'homeCntrl'
    }).
    when('/guide', {
          templateUrl: 'templates/guide.html',
          controller: 'guideCntrl'
    }).
    when('/myfriends', {
           templateUrl: 'templates/myfriends.html',
           controller: 'myFriendsCntrl'
    }).
    when('/suitmyfriends', {
          templateUrl: 'templates/suitmyfriends.html',
          controller: 'suitmyfriendsCntrl'
    }).
    when('/invitefriends', {
          templateUrl: 'templates/invitefriends.html',
          controller: 'inviteFriendsCntrl'
    }).
    when('/selectfriends', {
          templateUrl: 'templates/selectfriends.html',
          controller: 'selectFriendsCntrl'
    }).
    when('/invitation', {
          templateUrl: 'templates/invitation.html',
          controller: 'invitationsCntrl'
    }).
    otherwise({
            redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

}]);

suiteApp.controller('masterCntrl', function($scope,$http,$location,connectedUser) {
         
    $(document).ready(function(){

        setTimeout(function(){
            $('#splashscreen').fadeOut(500);    
        },900);

    });

    $scope.changeURL = function(url){
        $location.path(url);
    };

    $scope.angFacebookLogin = function(){
        $scope.friendList = [];
        facebookLogin(function(friendList){
                //friendList = getFacebookFriendsImages(friendList);
                
                delete friendList['paging'];
                delete friendList['summary'];
                friendList.data.forEach(function(friend){
                    friend.profilePicture = friend.picture.data.url
                    friend.bigProfilePicture = 'https://graph.facebook.com/'+ friend.id +'/picture?height=215&width=215';
                    delete friend['picture'];
                });

                USER.isNew = true;
                USER.friendsList = friendList.data;
                console.log('BASE_URL',BASE_URL);
                $http.post(BASE_URL + '/api/userInsert', { user:USER } ).
                  success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    // if user has signed up or not
                    if(data == null){
                        $location.path('signup');
                    }else{
                        connectedUser.set(data);
                        $scope.connectedUser = data;
                        console.log('$scope.connectedUser',$scope.connectedUser);
                        $location.path('welcome');
                    }

                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('Error : data', data);
                    console.log('Error : status', status);
                    console.log('Error : headers', headers);
                    console.log('Error : config', config);
                    // Redirect user back to login page
                    $location.path('signup');
                  });
        });/**/
      
    }

});