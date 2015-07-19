/****************************************************************************
 *                                                                          *
 *                      SERVER                                              *
 *                                                                          *
 *      Server.js is our routing and configuration file.                    *
 *                                                                          *
 *      In this file, the server is used as the center of the app.          *
 *      Every request that has been made by the client, will be fulfilled   *
 *      by navigation between Client <--> Server <--> Web service.          *
 *                                                                          *
 *                                                                          *
 *      Created by Ben Ari Kutai && Noam Rom                                *
 *                                                                          *
 ****************************************************************************/

var express = require('express');
var bodyParser = require('body-parser');
var ngRoute = require('ng-route-it');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    origin = req.get('Origin') || '*';
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Expose-Headers', 'Content-Length');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // add the list of headers your site allows.
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

app.use('/',express.static('./public')).listen(process.env.PORT || 3000);

app.use('/js', express.static(__dirname + 'public/js'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/templates', express.static(__dirname + 'public/templates'));

app.get('/home', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    //res.send(__dirname + '/public/index.html');
    //console.log('__dirname',__dirname);
    res.sendFile('/public/index.html', { root: __dirname });
});

app.get('/welcome', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    //console.log('__dirname',__dirname);
    res.send(__dirname + '/public/index.html');
    //res.sendFile('/public/index.html', { root: __dirname });
});

app.get('/myfriends', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log('__dirname',__dirname);
    res.sendFile('/public/index.html', { root: __dirname });
});

app.get('/signup', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log('__dirname',__dirname);
    res.sendFile('/public/index.html', { root: __dirname });
});

app.get('/guide', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log('__dirname',__dirname);
    res.sendFile('/public/index.html', { root: __dirname });
});

app.get('/suitmyfriends', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log('__dirname',__dirname);
    res.sendFile('/public/index.html', { root: __dirname });
});

app.get('/invitefriends', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log('__dirname',__dirname);
    res.sendFile('/public/index.html', { root: __dirname });
});

app.get('/selectfriends', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log('__dirname',__dirname);
    res.sendFile('/public/index.html', { root: __dirname });
});

app.get('/invitation', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log('__dirname',__dirname);
    res.sendFile('/public/index.html', { root: __dirname });
});



// ngRoute Config
ngRoute.ignore( [ '^/api' ] );
app.use( ngRoute.route() );

console.log('listenning on server...');

var userDb = require('./webservices/Database/users/db.user');

var getAllCategories = require('./webservices/Database/categories/db.categories').getAllCategories;

var addUserCategoryFriend = require('./webservices/Database/usercategoryfriend/db.usercategoryfriend').addUserCategoryFriend;

var addUserEvent = require('./webservices/Database/userevent/db.userevent').addUserEvent;

// *************************** Routing *************************** //

// User Insert API
app.post('/api/userInsert',function(req,res){
	console.log('api/userInsert');
    userDb.addUser(req.body.user,function(newUser){
        // Callback function.
        res.json(newUser);
    });
});

// Get User Object by user id
app.post('/api/getUser',function(req,res){
    console.log('api/getUser',req.body.userId);
    userDb.getUser(req.body.userId,function(user){
        // Callback function.
        res.json(user);
    });
});

// GET  all Categories API
app.post('/api/getCategories',function(req,res){
    getAllCategories(function(categoriesJson){
        res.json(categoriesJson);
    });
});

// GET Uncategorized Friends API
app.post('/api/getMyUncategorizedFriends',function(req,res){
    // Get User Friends.
    console.log("api/getMyUncategorizedFriends DATA:", req.body.userId);
    getUserFriends(req.body.userId,function(friendsJson){
        res.json(friendsJson);
    });
});

// User Category Friend Insert API
app.post('/api/userCategoryFriendInsert',function(req,res){
    // Get User Category Friend
    console.log("api/userCategoryFriendInsert DATA:", req.body.categoriazedFriend);
    addUserCategoryFriend(req.body.categoriazedFriend,function(updatedUser){
        res.json(updatedUser);
    });
});

// User Event Insert API
app.post('/api/userEventInsert',function(req,res){
    console.log('userEventInsert');
    addUserEvent(req.body.invitationObj);
    res.send("SUCCESS");
});


app.post('/api/setIsNewFalse',function(req,res){
    console.log('setIsNewFalse',req.body.userId);
    userDb.changeIsNew(req.body.userId ,function(callback){
        res.send("SUCCESS",callback);
    });
});

// *************************** Routing *************************** //

