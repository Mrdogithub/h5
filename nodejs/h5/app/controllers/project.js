var Project = require('../models/project');
var Picture = require('../models/picture');
var Constant = require('../common/constant');
var fs = require('fs');
var http = require('http');
var path = require('path');
var qr = require('qr-image');
var logger = require('../../config/logger').logger('logger');

/**
**add or update project
**/
exports.saveProject = function(req, res){
	// var id = '566fd114be06311c0fb742b1';
	// var id = '';
	// var projectname = 'project2';
	// var code = ['<div>aaaa11</div>', '<div>bbbbb</div>'];
	// var owner = 'shisjsj@cn.ibm.com';
	// var form = [{'name':'haha', 'content': 'test'}, {'name':'form2','test':'content'}];

	var id = req.body.projectId;
	var projectname = req.body.projectName;
	var projectInfo = req.body.projectInfo;
	var pages = req.body.pages;
	var pageLength = req.body.pageLength;
	var form = req.body.formLabel;
	// var owner = req.session.user.intranetId;
	// var owner = 'shisjsj@cn.ibm.com';
	var owner = req.body.userName;
	var cover = 'cover1.jpg';
	var qrcode = req.qrcode;
	var url = req.fileurl;

	// console.log('id===========' + id);
	// console.log('projectname===========' + projectname);
	// console.log('projectInfo===========' + projectInfo);
	// console.log('pages===========' + pages);
	// console.log('pageLength===========' + pageLength);
	// console.log('owner===========' + owner);
	// console.log('form===========' + form);
	// console.log('qrcode===========' + qrcode);
	// console.log('url===========' + url);
	
	if(id){
		var condition = {_id: id},
 			update = { pages: pages, pageLength: pageLength, form: form, url: url}
 		Project.update(condition, update, function(err){
			if(err){
				logger.error(err);
				res.send(err);
			}else{
				res.send({'status':'1'});
			}
		});
	} else {
		var projectObj = new Project({
			projectname : projectname,
			projectInfo : projectInfo,
			pages : pages,
			pageLength: pageLength,
			owner : owner,
			url : url,
			qrcode : qrcode,
			cover : cover,
			form: form
		});
		projectObj.save(function(err, project){
			if(err){
				logger.error(err);
				res.send(err);
			} else {

				if(project.form){

					var filePath = 'public/file/'+ project.url;

					fs.readFile(filePath, function(err,data){
						var content = '' + data;
						// update projectId to html5 file
						content = content.replace('projectIdIsActive', project._id);
						fs.writeFile(filePath, content, function(err){
							if(err){
								logger.error(err);
								res.send(err);
							} else {
								var returnProject = {};
								returnProject.id = project._id;
								returnProject.projectname = project.projectname;
								returnProject.projectInfo = project.projectInfo;
								returnProject.owner = project.owner;
								returnProject.createtime = project.createtimeStr;
								returnProject.lastmodify = project.lastmodifyStr;
								returnProject.pages = project.pages;
								returnProject.pageLength = project.pageLength;
								if (project.owner.length>0 && project.owner.indexOf('@')>0) {
									returnProject.url = Constant.file_host + project.owner.substring(0, project.owner.indexOf('@')) + '/' + project.url;
								} else {
									returnProject.url = Constant.file_host + project.owner + '/' + project.url;
								}
								returnProject.qrcode = Constant.qr_host + project.qrcode;
								returnProject.cover = Constant.cover_host + project.cover;
								returnProject.form = project.form;

								res.send({status: 1, project: returnProject});
							}
						})
					})
				} else {
					var returnProject = {};
					returnProject.id = project._id;
					returnProject.projectname = project.projectname;
					returnProject.projectInfo = project.projectInfo;
					returnProject.owner = project.owner;
					returnProject.createtime = project.createtimeStr;
					returnProject.lastmodify = project.lastmodifyStr;
					returnProject.pages = project.pages;
					returnProject.pageLength = project.pageLength;
					if (project.owner.length>0 && project.owner.indexOf('@')>0) {
						returnProject.url = Constant.file_host + project.owner.substring(0, project.owner.indexOf('@')) + '/' + project.url;
					} else {
						returnProject.url = Constant.file_host + project.owner + '/' + project.url;
					}
					returnProject.qrcode = Constant.qr_host + project.qrcode;
					returnProject.cover = Constant.cover_host + project.cover;
					returnProject.form = project.form;

					res.send({status: 1, project: returnProject});
				}

			}
		});
	}
}

exports.checkUpdate = function(req, res, next){
	var pid = req.body.projectId;
	if(pid){
		Project.findById(pid, function(err, project){
			if(err){
				logger.error(err);
				res.send(err);
			} else {
				if(project==null){
					res.send({status:0, message:'can not find project by id:'+pid});
				}else{
					req.body.url = project.url;
					next();
				}
			}
		});
	} else {
		next();
	}
}

/**copy project**/
exports.findProjectAddReq = function(req, res, next){
	var pid = req.query.pid;
	var projectname = req.query.projectname;
	var projectInfo = req.query.projectInfo;
	console.log('pid==========='+pid);
	console.log('projectname======='+ projectname);
	Project.findById(pid, function(err, project){
		if(err){
			logger.error(err);
			res.send(err);
		} else {
			if(project==null){
				res.send({'status':0});
			}else{
				req.body.projectName = projectname;
				req.body.projectInfo = projectInfo;
				req.body.pages = project.pages;
				req.body.pageLength = project.pageLength;
				req.body.userName = project.owner;
				req.body.cover = project.cover;
				next();
			}
		}
	});
}

exports.findDemoProjectAddReq = function(req, res, next) {
	Project.findByOwner('demo', function(err, projects){
		if (err) {
			logger.error(err);
			res.send(err);
		} else {
			if(projects.length > 0) {
				req.body.projectName = projects[0].projectname;
				req.body.projectInfo = projects[0].projectInfo;
				req.body.pages = projects[0].pages;
				req.body.pageLength = projects[0].pageLength;
				req.body.userName = req.query.userName;
				req.body.cover = projects[0].cover;
				next();
			} else {
				logger.info('no demo project create for new user');
				res.send({status: 0, message: 'no demo project create for new user'})
			}
		}
	});
}

/**
** delete project by id
**/
exports.deleteProject = function(req, res){
	var pid = req.query.pid;
	if(pid){
		Project.findById(pid, function(err, project){
			if(err){
				logger.error(err);
				res.send(err);
			} else {
				if(project){
					var qrcode = path.join(__dirname, '../../', '/public/qr/'+project.qrcode);
					var htmlFile = '';
					if (project.owner.length>0 && project.owner.indexOf('@')>0) {
						htmlFile = Constant.file_path + project.owner.substring(0, project.owner.indexOf('@')) + '/' + project.url;
					} else {
						htmlFile = Constant.file_path + project.owner + '/' + project.url;
					}

					// Delete project
					Project.remove({_id: pid}, function(err, project){
						if(err){
							logger.error(err);
							res.send(err);
						}else {

							res.send({status: 1, message: 'success'});

							// Delete html file and qrcode
							fs.unlinkSync(htmlFile);
							fs.unlinkSync(qrcode);
						}
					});

				} else {
					res.send({status: 0, message: 'can not find the project'});
				}
			}
		});
	}
}

exports.findProjectByUser = function(req, res, next){
	// var uid = req.session.user.intranetId;
	// var uid = 'shisjsj@cn.ibm.com';
	var uid = req.query.userName;
	logger.info(uid);
	if(uid){
		Project.findByOwner(uid, function(err, projects){
			if(err){
				logger.error(err);
				res.send(err);
			} else {
				if (projects.length==0) {
					next();
				} else {
					var projectList = [];
					for(var i = 0; i < projects.length; i++){
						var project = {};
						project.id = projects[i]._id;
						project.projectname = projects[i].projectname;
						project.projectInfo = projects[i].projectInfo;
						project.owner = projects[i].owner;
						project.createtime = projects[i].createtimeStr;
						project.lastmodify = projects[i].lastmodifyStr;
						project.pages = projects[i].pages;
						project.pageLength = projects[i].pageLength;
						if (projects[i].owner.length>0 && projects[i].owner.indexOf('@')>0) {
							project.url = Constant.file_host + projects[i].owner.substring(0, projects[i].owner.indexOf('@')) + '/' + projects[i].url;
						} else {
							project.url = Constant.file_host + projects[i].owner + '/' + projects[i].url;
						}
						project.qrcode = Constant.qr_host + projects[i].qrcode;
						project.cover = Constant.cover_host + projects[i].cover;
						project.form = projects[i].form;
						projectList.push(project);
					}
					res.send(projectList);
				}
			}
		});
	}
}

exports.createDemoForNewUser = function(req, res){

	var projectObj = new Project({
		projectname : req.body.projectName,
		projectInfo : req.body.projectInfo,
		pages : req.body.pages,
		pageLength: req.body.pageLength,
		owner : req.body.userName,
		url : req.fileurl,
		qrcode : req.qrcode,
		cover : req.body.cover,
		form: req.body.formLabel
	});
	projectObj.save(function(err, project){
		if(err){
			logger.error(err);
			res.send(err);
		} else {

			var projectList = [];
			var returnProject = {};

			if(project.form){

				var filePath = 'public/file/'+ project.url;

				fs.readFile(filePath, function(err,data){
					var content = '' + data;
					// update projectId to html5 file
					content = content.replace('projectIdIsActive', project._id);
					fs.writeFile(filePath, content, function(err){
						if(err){
							logger.error(err);
							res.send(err);
						} else {
							returnProject.id = project._id;
							returnProject.projectname = project.projectname;
							returnProject.projectInfo = project.projectInfo;
							returnProject.owner = project.owner;
							returnProject.createtime = project.createtimeStr;
							returnProject.lastmodify = project.lastmodifyStr;
							returnProject.pages = project.pages;
							returnProject.pageLength = project.pageLength;
							if (project.owner.length>0 && project.owner.indexOf('@')>0) {
								returnProject.url = Constant.file_host + project.owner.substring(0, project.owner.indexOf('@')) + '/' + project.url;
							} else {
								returnProject.url = Constant.file_host + project.owner + '/' + project.url;
							}
							returnProject.qrcode = Constant.qr_host + project.qrcode;
							returnProject.cover = Constant.cover_host + project.cover;
							returnProject.form = project.form;

							projectList.push(returnProject);
							res.send(projectList);
						}
					})
				})
			} else {
				returnProject.id = project._id;
				returnProject.projectname = project.projectname;
				returnProject.projectInfo = project.projectInfo;
				returnProject.owner = project.owner;
				returnProject.createtime = project.createtimeStr;
				returnProject.lastmodify = project.lastmodifyStr;
				returnProject.pages = project.pages;
				returnProject.pageLength = project.pageLength;
				if (project.owner.length>0 && project.owner.indexOf('@')>0) {
					returnProject.url = Constant.file_host + project.owner.substring(0, project.owner.indexOf('@')) + '/' + project.url;
				} else {
					returnProject.url = Constant.file_host + project.owner + '/' + project.url;
				}
				returnProject.qrcode = Constant.qr_host + project.qrcode;
				returnProject.cover = Constant.cover_host + project.cover;
				returnProject.form = project.form;

				projectList.push(returnProject);
				res.send(projectList);
			}

		}
	});
}

exports.findProjectById = function(req, res){
	var pid = req.query.pid;
	if(pid){
		Project.findById(pid, function(err, project){
			if(err){
				logger.error(err);
				res.send(err);
			} else {
				if(project){
					var returnProject = {};
					returnProject.id = project._id;
					returnProject.projectname = project.projectname;
					returnProject.projectInfo = project.projectInfo;
					returnProject.owner = project.owner;
					returnProject.createtime = project.createtimeStr;
					returnProject.lastmodify = project.lastmodifyStr;
					returnProject.pages = project.pages;
					returnProject.pageLength = project.pageLength;
					if (project.owner.length>0 && project.owner.indexOf('@')>0) {
						returnProject.url = Constant.file_host + project.owner.substring(0, project.owner.indexOf('@')) + '/' + project.url;
					} else {
						returnProject.url = Constant.file_host + project.owner + '/' + project.url;
					}
					returnProject.qrcode = Constant.qr_host + project.qrcode;
					returnProject.cover = Constant.cover_host + project.cover;
					returnProject.form = project.form;
					res.send(returnProject);
				} else {
					res.send({status: 0, message: 'can not find the project'});
				}
			}
		});
	}
}

exports.generateHtml = function(req, res, next){
	var url = req.body.url;
	var pages = req.body.pages;
	var userName = req.body.userName;
	var filename;
	if(url){
		filename =  url;
	}else{
		var timestamp = Date.now();
		var filename = timestamp + ".html";
	}
	var header = fs.readFileSync(path.join(__dirname, '../../', '/public/file/templete/header.html'), 'utf-8');
	var footer = fs.readFileSync(path.join(__dirname, '../../', '/public/file/templete/footer.html'), 'utf-8');
	// var newPath = path.join(__dirname, '../../', '/public/file/'+filename);
	var fileFolder='';
	if (userName.length>0 && userName.indexOf('@')>0) {
		fileFolder = Constant.file_path + userName.substring(0, userName.indexOf('@'));
	} else {
		fileFolder = Constant.file_path + userName;
	}

	mkdirsSync(fileFolder); 
  
	var newPath = fileFolder + '/' + filename;
	var bodyStr;
	if(pages){
		bodyStr = header + pages.previewCode;
	} else {
		bodyStr = header;
	}
	// replace js 
	if(pages.pageSetting && pages.pageSetting.content){
		bodyStr += footer.substring(0, footer.indexOf('<script>')) + pages.pageSetting.content + footer.substring(footer.indexOf('</script>')+9);
	} else {
		bodyStr += footer;
	}

	fs.writeFile(newPath, bodyStr, function(err){
		if(err) {
			logger.error(err);
		} else {
			req.fileurl = filename;
			next();
		}
	})
}

exports.generateQRCode = function(req, res, next){
	var owner = req.body.userName;
	var url='';
	if (owner.length>0 && owner.indexOf('@')>0) {
		url = Constant.file_host + owner.substring(0, owner.indexOf('@')) + '/' + req.fileurl;
	} else {
		url = Constant.file_host + owner + '/' + req.fileurl;
	}
	var timestamp = Date.now();
	var filename = timestamp + '.png';
	try {
        var img = qr.image(url,{size :10});
        var newPath = path.join(__dirname, '../../', '/public/qr/'+ filename);
		img.pipe(fs.createWriteStream(newPath));
		req.qrcode = filename;
		next();
    } catch (e) {
        res.send(e);
    }
}

exports.uploadImage = function(req, res){
	// var uid = req.session.user.intranetId;
	// var uid = 'shisjsj@cn.ibm.com';
	var uid = req.body.userName;
	var image = req.files.uploadImage;
	console.log('uid==========='+ uid);
	console.log('image==========='+image);
	console.log('test username' + req.body.userName);
	if(image){
		var filePath = image.path;
		var originalFilename = image.originalFilename;
		var size = image.size;

		if(originalFilename){
			fs.readFile(filePath, function(err,data){
				var timestamp = Date.now();
				var type = image.type.split('/')[1];
				var filename = timestamp + "." + type;
				var newPath = path.join(__dirname, '../../', '/public/upload/'+filename);
				fs.writeFile(newPath, data, function(err){
					if(err){
						logger.error(err);
						res.send(err);
					} else {
						var imageObj = new Picture({
							name : originalFilename,
							size : size,
							url : filename,
							owner : uid,
							date : Date.now()
						});
						imageObj.save(function(err, pic){
							if(err){
								logger.error(err);
								res.send({status:0});
							} else {
								var returnPic = {};
								returnPic.id = pic._id;
								returnPic.name = pic.name;
								returnPic.size = pic.size;
								returnPic.url = Constant.image_host + pic.url;
								returnPic.owner = pic.owner;
								returnPic.date = pic.dateStr;
								res.send({status: 1, image: returnPic});
							}
						});
					}
				})
			})
		}
	} else {
		res.send({status: 0, message: 'can not get image'});
	}
}

exports.findImageByUser = function(req, res){
	// var uid = req.session.user.intranetId;
	// var uid = 'shisjsj@cn.ibm.com';
	var uid = req.query.userName;
	if(uid){
		Picture.findByOwner(uid, function(err, pictures){
			if(err){
				logger.error(err);
				res.send(err);
			} else {
				var imageList = [];
				for(var i=0; i < pictures.length; i++){
					var image = {};
					image.id = pictures[i]._id;
					image.name = pictures[i].name;
					image.size = pictures[i].size;
					image.url = Constant.image_host + pictures[i].url;
					image.owner = pictures[i].owner;
					image.date = pictures[i].dateStr;
					imageList.push(image);
				}

				res.send(imageList);
			}
		});
	}
}

exports.deleteImage = function(req, res){
	var id = req.query.id;
	if(id){
		Picture.remove({_id: id}, function(err, pic){
			if(err){
				logger.error(err);
				res.send(err);
			}else{
				res.send({status: 1});
			}
		});
	}
}

exports.downloadQRCode = function(req, res){
	var fileUrl = req.query.url;
	var filePath = 'public/qr/'+ fileUrl.substring(fileUrl.lastIndexOf('/')+1);
	res.download(filePath);
}

// create folders
function mkdirsSync(dirpath) { 
    console.log('mkdir======'+dirpath);
    if (!fs.existsSync(dirpath)) {
		console.log('===='+ dirpath + ' is not exist');
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
			if (dirname.length==0) {
				dirname = '/';
			}
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp)) {
                    return false;
                }
            }
        });
    }
    return true; 
}
