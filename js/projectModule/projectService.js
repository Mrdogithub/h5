var project = angular.module('projectService',[]);

project.factory('projectFn',function($http,$q,$timeout,$compile,SERVER_URL){

	var productUrl                   = SERVER_URL.liveUrl;
	var copyProject                  = 'copyProject';
	var editProject                  = 'findProjectById';
    var saveProject                  = 'saveProject';
	var pagelength                   = [];
    var findMyProject                = 'findProjectByUser';
    var deletedProject               = 'delProject';
    var projectIdInDashboardService  = [];



    var myProjectAction = {

        saveProjectId:function(projectId){
            projectIdInDashboardService.length = 0;
            projectIdInDashboardService.push(projectId);
        },  
        savePageLength:function(num){
           pagelength.length = 0;
           pagelength.push(num);
        },
        saveProject:function(pageLength,projectId,editCode,previewCode,projectName){
            var deffered = $q.defer();
            $http.post(productUrl+saveProject,{
                'pageLength':pageLength,
                'projectId':projectId,
                'projectName':projectName,
                'pages':{'editCode':editCode,'previewCode':previewCode}
            }).success(function(data){
                deffered.resolve(data)
            }).error(function(data){
                deffered.reject(data)
            });
            return deffered.promise;
        },
        addProject:function(projectName){
           var deffered = $q.defer();
            $http.post(productUrl+saveProject,{
                'pageLength':'1',
                'projectId':'',
                'projectName':projectName,
                'pages':{'editCode':
                '<i class="icon-move bgAcitve" style="position: absolute;left: 100%;top: 0px;background-color: #eee;width: 20px;height: 20px;padding: 2px;opacity:0;" ng-click="setBackground()"></i><div class="swiper-slide isEdit" data-type="page" id="right_1"> </div>',
                'previewCode':
                '<div class="swiper-slide isEdit" data-type="page" id="right_1"> </div>'}
            }).success(function(data){
                deffered.resolve(data)
            }).error(function(data){
                deffered.reject(data)
            });
            return deffered.promise;
        },
        getProjectId:function(){
            return projectIdInDashboardService[0];
        },
        getPageLength:function(){

            return pagelength[0];
        },
    	getProjectList:function(){
            var deffered = $q.defer();
    		$http({method:"GET",url:productUrl+findMyProject}).success(function(data){
    			deffered.resolve(data);
    		}).error(function(data){
                deffered.reject(data)
            });
    		return deffered.promise;
    	},
        removeProjectId:function(){
            projectIdInDashboardService.length = 0;
        },
    	deletedProject:function(projectId){
            var deffered = $q.defer()
    		$http({method:"POST",url:productUrl+deletedProject,params:{pid:projectId}}).success(function(data){
                deffered.resolve(data);
    		});
    		return deffered.promise;
    	},
        loadEditPage:function(id,$scope){
            var deffered = $q.defer()
            $http({method:"GET",url:productUrl+editProject,params:{pid:id}}).success(function(data){
                deffered.resolve(data);
            }).error(function(data){
                deffered.reject(data);
            });
            return deffered.promise;
        },
    	copyProject:function(projectName,projectId){
            var deffered = $q.defer()
    	    $http.post(productUrl+copyProject,{'pid':projectId,'projectname':projectName}).success(function(data){
                deffered.resolve(data);
    		}).error(function(data){
                deffered.reject(data);
            });
    		return deffered.promise;
    	}
    };
    return myProjectAction;
});