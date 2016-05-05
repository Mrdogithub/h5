// var nodeExcel = require('excel-export');
var Forms = require('../models/form');
var Userlog = require('../models/userlog');
var Project = require('../models/project');
var excel = require('node-excel-export');
var moment = require('moment');

exports.submitForm = function(req, res){
  var projectId = req.body.projectId;
  var value = req.body.formContent;
  console.log('projectId====='+projectId);
  console.log('value====='+value);
  var formObj = new Forms({
    project_id : projectId,
    value : value
  });
  formObj.save(function(err, form){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.send({status: 1});
    }
  });
}

exports.findUserlogByProject = function(req, res, next){
	var pid = req.query.pid;
	Userlog.findUserlogByProject(pid, function(err, userlogs){
    if(err){
      res.send(err);
    }else{
      req.userlogs = userlogs;
      next();
    }
	});
}

exports.findFormByProject = function(req, res, next){
  var pid = req.query.pid;
  Project.findById(pid, function(err, project){
    if(err){
      res.send(err);
    }else{
      if(project!= null && project.form){
        req.formLabel = project.form;
        Forms.findByProject(pid, function(err, userForms){
          if(err){
            res.send(err);
          }else{
            req.userForms = userForms;
            next();
          }
        });
      }else{
        next();
      }
    }
  });
}

exports.download = function(req, res){

  var styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: 'FF0000CD'
        }
      },
      font: {
        color: {
          rgb: 'FF000000'
        },
        sz: 14,
        bold: true,
        underline: false
      }
    },
    cellPink: {
      fill: {
        fgColor: {
          rgb: 'FFFFCCFF'
        }
      }
    }
  };
 
  var sheetArr = [];
  var userlogs = req.userlogs;
  var formLabels = req.formLabel;//表单
  var userForms = req.userForms;// 用户填的表单

  var visitSpec = {
    page: {
      displayName: 'URL',
      headerStyle: styles.headerDark,
      width: 220
    },
    ip: {
      displayName: 'IP',
      headerStyle: styles.headerDark,
      width: 130
    },
    date: {
      displayName: 'Visit Date',
      headerStyle: styles.headerDark,
      // cellStyle: styles.cellPink, // <- Cell style [todo: allow function] 
      width: 130
    }
  };

  var userDataSet = [];
  for(var i=0; i < userlogs.length; i++){
    var visitInfo = {
      page: userlogs[i].page, 
      ip: userlogs[i].ip, 
      date: userlogs[i].accesstime.Format("yyyy-MM-dd hh:mm:ss")
    }
    userDataSet.push(visitInfo);
  }

  var sheet = {
    name: '访问量',
    specification: visitSpec,
    data: userDataSet
  };
  sheetArr.push(sheet);
  
  // form sheet
  if(formLabels){
    // for(var i=0; i < formLabels.length; i++){
    //   var formlabel = formLabels[i];

      // var formKeys = Object.keys(form);
      // form sheet header
      var formSpec = {};
      var keyArr = [];
      for(var j=0; j< formLabels.length; j++){
        var labelObj = formLabels[j];
        var key = Object.keys(form)[0];
        formSpec[key]= {
          displayName: labelObj[key],
          headerStyle: styles.headerDark,
          width: 220
        }
        keyArr.push(key);
      }
      formSpec.date = {
        displayName: 'Date',
        headerStyle: styles.headerDark,
        width: 120
      }

      // form sheet content
      var formDataSet = [];
      for(var i=0; i < userForms.length; i++){
        // var formData = {value: formDataSet[i], date: formDataSet[i].inserttime};
        var userFormValue =  userForms[i].value;
        var formData = {};
        for(var j=0; j< keyArr.length; j++){
          var key = keyArr[j];
          formData[key]= userFormValue[key];
        }
        formData.date = userForms[i].inserttime;
        formDataSet.push(formData);
      }

      // create form sheet
      var sheet = {
        name: 'form',
        specification: formSpec,
        data: formDataSet
      };

      sheetArr.push(sheet);
    // }
  }

  var report = excel.buildExport(sheetArr);
 
  // You can then return this straight 
  res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers) 
  res.send(report);

}

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}