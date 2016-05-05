var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var mongoStore = require('connect-mongo')(session);
var log4js = require('./config/logger');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var app = express();

var port = process.env.PORT || 3000;
// var dbUrl = 'mongodb://localhost/html5';
var dbUrl = 'mongodb://9.115.24.193/h5db';
mongoose.connect(dbUrl);

// log
log4js.use(app);

app.set('port', port);
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended: true}));
app.use(cookieParser());
app.use(session({
	secret: 'html5',
	name: 'h5',
	cookie: {maxAge: 3600000},
	resave: true,
	saveUninitialized: true,
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}));

if('development' == app.get('env')){
	app.set('showStackError', true);
	// app.use(morganLogger(':method :url :status'));
	mongoose.set('debug', true);
}

// routes
require('./config/routes')(app);
app.use('/public', express.static(path.join(__dirname, 'public')));


//http.createServer(app).listen(app.get('port'), function(){
//	console.log('Express server listening on port ' + app.get('port'));
//});

if (cluster.isMaster) {
    console.log("master start...");

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening',function(worker,address){
        console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died, will restart new worker');
        cluster.fork();
    });
} else {
    http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
    });
}
