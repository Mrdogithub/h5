var bluepages = require('ibm_bluepages');
var Userlog = require('../models/userlog');
var Forms = require('../models/form');
var User = require('../models/user');
var Constant = require('../common/constant');

exports.login = function(req, res){
	var intranetId = req.body.username;
	var password = req.body.password;

	bluepages.authenticate(intranetId, password, function(result){
		if(result==true){
			
			bluepages.getNameByIntranetID(intranetId, function(userName){
				var userPhoto = 'https://w3-connectionsapi.ibm.com/profiles/photo.do?email='+intranetId;
				var user = {
					intranetId: intranetId,
					password: password,
					userName: userName,
					userPhoto: userPhoto
				};
				console.log('user========'+user.intranetId + '===' + user.userName);
				req.session.user = user;
				req.session.save();
				res.send({status: result, userName: userName, userPhoto: userPhoto, email: intranetId});
			})			
		} else {
			res.send({status: result});
		}
	})	
}

exports.loginRequired = function(req, res, next){
	var user = req.session.user;
	if(!user){
		console.log('need login');
		return res.send({status: 0, message: 'please login'});
	}
	next();
}

exports.logout = function(req, res){
	delete req.session.user;
	res.send({'status': 1});
}

//用户访问html页面
exports.userlog = function(req, res){
	var user_id = 'shisjsj@cn.ibm.com';
	var page = 'http://localhost:3000/index';
	var project_id = '5677b27d4c66b2d026ce1af9';
	var ip = getClientIp(req);
	var accesstime = Date.now();
	var userlogObj = new Userlog({
		user_id: user_id,
		ip: ip,
		accesstime: accesstime,
		page: page,
		project_id: project_id
	});
	userlogObj.save(function(err, userlog){
		if(err){
			res.send(err);
		}else{
			res.send({'status': 1});
		}
	});
}

function getClientIp(req){
	var ipStr = req.headers['x-forwarded-for'] || 
	req.connection.remoteAddress ||
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress;
	var ipArr = ipStr.split(':');
	return ipArr[ipArr.length-1];
}

exports.addUserForm = function(req, res){
	var pid = 'hshshhs';
	var formValue = {name:'testname', school: 'testschool'};
	var formObj = new Forms({
		project_id : pid,
		value : formValue
	});
	formObj.save(function(err, form){
		if(err){
			res.send(err);
		}else{
			res.send({'status': 1, 'form': form});
		}

	});
}

exports.adminLogin = function(req, res, next) {
	var intranetId = req.body.username;
	var password = req.body.password;

	User.findLoginUser(intranetId, password, function(err, user){
		if(err){
			logger.error(err);
			res.send(err);
		} else {
			if(user != null){
				console.log('admin login===='+ intranetId);
				var userName = user.username;
				var userPhoto = Constant.cover_host + user.photo;
				var email = user.email;
				res.send({status: true, userName: userName, userPhoto: userPhoto, email: userName});
			}else{
				next();
			}
		}
	});

}