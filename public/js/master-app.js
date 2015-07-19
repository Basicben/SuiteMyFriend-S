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

var USER =  /**/null; /**/
/*
{

        id: "10153356515014410",
        birthday: "05/25/1989",
        email: "benari1_kutai@yahoo.com",
        first_name: "Ben Ari",
        isNew: true,
        gender: "Male",
        hometown: {
            id: "102184499823699",
            name: "Quebec, Montreal"
        },
        last_name: "Kutai",
        link: "https://www.facebook.com/app_scoped_user_id/10153356515014410/",
        locale: "en_US",
        location: {
            id: "111853268841906",
            name: "Rehovot, Israel"
        },
        mediumProfilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p200x200/1610834_10152823206274410_2045878086116312477_n.jpg?oh=7a35a74f394b9695a57a2fb6beaca3ad&oe=55F08067&__gda__=1441648651_a2dc5d750e0df629db63895735809c66",
        name: "Ben Ari Kutai",
        relationship_status: "Single",
        smallProfilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p40x40/1610834_10152823206274410_2045878086116312477_n.jpg?oh=a4743f1ef762de4734ed3a7b2434a78e&oe=55E88EC0&__gda__=1442821295_ac942cc9712dc12de7d91f4e23ac7e8c",
        timezone: 3,
        updated_time: "2015-06-05T18:00:17+0000",
        verified: true,
        friendsList: [
                {
                    profilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/v/t1.0-1/c39.36.450.450/s50x50/999588_10151791538574592_1966057484_n.jpg?oh=b69066e7944df6b60a25713a66edea59&oe=5618D284&__gda__=1444836887_82ac05e25e6c7d583087aaee11f6c648",
                    gender: "female",
                    name: "Dana Freilich",
                    id: "10153390184239592",
                    bigProfilePicture: 'https://graph.facebook.com/10153390184239592/picture?height=215&width=215'
                },
                {
                    profilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/c49.49.618.618/s50x50/208959_10150978397109863_793617579_n.jpg?oh=8a53ff8aa2cc8baa865ff5f7c1e7515f&oe=56183530&__gda__=1444989859_1bcfd25a1a554d40917b825093c0b88b",
                    gender: "male",
                    name: "Noam Rom",
                    id: "10153947428804863",
                    bigProfilePicture: 'https://graph.facebook.com/10153947428804863/picture?height=215&width=215'
                }
        ]
        

};/**/

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
        /**/
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

        /* API CALL IN LOCALHOST 
        console.log(window.location.origin);
        $http.post( BASE_URL + '/api/userInsert', { user:USER } ).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                // if user has signed up or not
                if(data == null){
                    $location.path('signup');
                }else{
                    connectedUser.set(data);
                    $scope.connectedUser = data;
                    $location.path('welcome');
                }

              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // Redirect user back to login page
                $location.path('signup');
              });
        /* End API CALL IN LOCALHOST */        
    }

});