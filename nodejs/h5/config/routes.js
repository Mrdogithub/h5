var Project = require('../app/controllers/project');
var User = require('../app/controllers/user');
var Report = require('../app/controllers/report');
var Common = require('../app/controllers/common');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function(app){

	// app.all('*', function(req, res, next) {
	//     res.header("Access-Control-Allow-Origin", "*");
	//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
	//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	//     res.header("X-Powered-By",' 3.2.1');
	//     res.header("Content-Type", "application/json;charset=utf-8");
	//     next();
	// });

	// app.all('/public/*', function(req, res, next) {
	//     res.header("Content-Type", "text/plain");
	//     next();
	// });

	app.all('*', function(req, res, next){
		if(req.url!=="/favicon.ico"){
			next();
		} else {
			return;
		}
	});

	app.get('/',function(req, res){
		res.send('html5 index');
	});

	/*project*/
	// app.post('/saveProject', User.loginRequired, Project.generateHtml, Project.generateQRCode, Project.saveProject);
	// app.get('/copyProject', User.loginRequired, Project.findProjectAddReq, Project.generateHtml, Project.saveProject);
	// app.get('/delProject', User.loginRequired, Project.deleteProject);
	// app.get('/findProjectByUser', User.loginRequired, Project.findProjectByUser);
	// app.get('/findProjectById', User.loginRequired, Project.findProjectById);
	// app.post('/uploadImage', User.loginRequired, multipartMiddleware, Project.uploadImage);
	// app.get('/findImageByUser', User.loginRequired, Project.findImageByUser);
	// app.get('/delImage', User.loginRequired, Project.deleteImage);
	// app.get('/downloadQRCode', Project.downloadQRCode);
	app.post('/saveProject', Common.sendJson, Project.checkUpdate, Project.generateHtml, Project.generateQRCode, Project.saveProject);
	app.post('/copyProject', Common.sendJson, Project.findProjectAddReq, Project.generateHtml, Project.generateQRCode, Project.saveProject);
	app.post('/delProject', Common.sendJson, Project.deleteProject);
	app.get('/findProjectByUser', Common.sendJson, Project.findProjectByUser, Project.findDemoProjectAddReq, Project.generateHtml, Project.generateQRCode, Project.createDemoForNewUser);
	app.get('/findProjectById', Common.sendJson, Project.findProjectById);
	app.post('/uploadImage', Common.sendJson, multipartMiddleware, Project.uploadImage);
	app.get('/findImageByUser', Common.sendJson, Project.findImageByUser);
	app.get('/delImage', Common.sendJson, Project.deleteImage);
	app.get('/downloadQRCode', Project.downloadQRCode);

	/*user*/
	app.post('/login', Common.sendJson, User.adminLogin, User.login);
	app.get('/logout', Common.sendJson, User.logout);
	app.get('/userlog', Common.sendJson, User.userlog);

	/*report*/
	app.get('/download', Report.findUserlogByProject, Report.findFormByProject, Report.download);
	app.post('/submitForm', Common.sendJson, Report.submitForm);

	// app.get('/parseHTML', )


}