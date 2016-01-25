var dashBoardService = angular.module('dashBoardService',[]);
dashBoardService.factory('dashBoardFunctionCollection',function($http,$q,$timeout,$compile,SERVER_URL){
	var theUrlForLoadingMyProjects  = SERVER_URL.liveUrl;
	var findMyProject  = 'findProjectByUser';
	var deletedProject = 'delProject';
	var copyProject    = 'copyProject';
	var editProject    = 'findProjectById';
	
    var myProjectAction = {
    	loadEditPage:function(id,$scope){
    	    var promise = $http({method:"GET",url:theUrlForLoadingMyProjects+editProject,params:{pid:id}});
    		promise.success(function(data,status,headers){

    			return data;
    		});
    		return promise;
    	},
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
    	copyProject:function(projectName,projectId,$scope){
    		console.log("projectName"+projectName +"////"+projectId);
    		var promise = $http.post(theUrlForLoadingMyProjects+copyProject,{pid:projectId,projectname:projectName});
    		promise.success(function(data,status,headers){
    $compile($('<div class="col-sm-6 col-md-4 col-lg-3 modmore" id="'+data.project._id+'"><div class="thumbnail"  style="height: 334px;" ><div class="projectInfo-projectName" style="position:absolute;width:98%;opacity:1;"><img  style="width:100%;height:325px;"  src="'+data.project.cover+'"><div style="width:100%;position:absolute;bottom:0px;text-align:center;height:40px;background:#fff;padding:10px 0px 10px 0px;">'+data.project.projectname+'</p></div></div><div class="dask" style="position:absolute;width:98%;opacity:0;"><p class="showMoreIcons"><span ng-click="deletePage($event,'+"'"+data.project._id+"'"+')" class="projectInfoShowMoreIcons-remove" style="width:0px;opacity:0;"></span><span ng-click="copyProject($event,'+"'"+data.project._id+"',"+"'"+data.project.projectname+"'"+')" class="projectInfoShowMoreIcons-copy" style="width:0px;opacity:0;"></span><span href="javascript:;" class="projectInfoShowMoreIcons"></span></p><img src="'+data.project.qrcode+'" style="width:100%;"><p class="projectInfoDownloadQRCode">下载二维码</p><p class="showMoreIconsBottom"><a ng-click="previewPage($event,'+"'"+data.project.url+"',"+"'"+data.project.qrcode+"'"+')" class="projectInfoShowMoreIcons-preview"></a><a href="javascript:;" class="projectInfoShowMoreIcons-edit"></a><a href="javascript:;" class="projectInfoShowMoreIcons-report"></a></p></div></div></div></div></div>').prependTo($('.modlist')))($scope)
        
                    $('#saveProjectOverLay').css('display','none');
                    $("#addBox").show();
                     setTimeout(function(){$("#addBox").fadeTo(3000).hide();},1000);
                    $('.modlist').css('display','block')
    		});
    		return promise;

    	}
    };
    return myProjectAction;
});