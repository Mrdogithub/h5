

var dashBoardService = angular.module('dashBoardService',[]);
dashBoardService.factory('dashBoardFunctionCollection',function($http,$q,$timeout){
	var theUrlForLoadingMyProjects  = 'http://9.112.71.102:3000';
	var findMyProject  = '/findProjectByUser';
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
    		var promise = $http({method:"POST",url:theUrlForLoadingMyProjects+deletedProject,params:{pid:projectId}});
    		promise.success(function(data,status,headers){
    			return data;
    		});
    		return promise;
    	},
    	copyProject:function(projectName,projectId){
    		console.log("projectName"+projectName +"////"+projectId);
    		var promise = $http.post(theUrlForLoadingMyProjects+copyProject,{pid:projectId,projectname:projectName});
    		promise.success(function(data,status,headers){
    			console.log(data+"//"+status)
    			for(var i in data){
    				console.log(i+"")
    			}
    			return data;
    		});
    		return promise;

    	}
    };
    return myProjectAction;
});