

var dashBoardService = angular.module('dashBoardService',[]);
dashBoardService.factory('dashBoardFunctionCollection',function($http,$q,$timeout){
	var theUrlForLoadingMyProjects  = './data';
	var findMyProject  = '/findProjectByUser.json';
	var deletedProject = '/delProject';
	var copyProject    = '/copyProject'
	
    var myProjectAction = {
    	getProjectList:function(){
    		var promise = $http({method:"GET",url:theUrlForLoadingMyProjects+findMyProject});
    		promise.success(function(data,status,headers){
    			return data;
    		});
    		return promise;
    	},
    	deletedProject:function(projectId){
    		console.log('delete works')
    		var promise = $http({method:"POST",url:theUrlForLoadingMyProjects+deletedProject,params:{"pid":projectId}});
    		promise.success(function(data,status,headers){
    			return data;
    		});
    		return promise;
    	},
    	copyProject:function(projectName,projectId){
    		console.log("projectName"+projectName +"////"+projectId)
    		var promise = $http({method:"POST",url:theUrlForLoadingMyProjects+copyProject,params:{"pid":projectId,"projectname":projectName}});
    		promise.success(function(data,status,headers){
    			return data;
    		});
    		return promise;

    	}
    };
    return myProjectAction;
});