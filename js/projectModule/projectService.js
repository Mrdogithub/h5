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
        saveProject:function(pageLength,projectId,editCode,previewCode,projectName,userName){
            var deffered = $q.defer();
            $http.post(productUrl+saveProject,{
                'pageLength':pageLength,
                'userName':userName,
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
        addProject:function(projectName,previewCode,editCode,projectInfo,userName,pageLength){
           var previewCode = previewCode || '<div class="swiper-slide isEdit" data-type="page" id="right_1" style="height:100%;"> </div>';
           var editCode    = editCode    || '<i class="icon-move bgAcitve" style="position: absolute;left: 100%;top: 0px;background-color: #eee;width: 20px;height: 20px;padding: 2px;opacity:0;" ng-click="setBackground()"></i><div class="swiper-slide isEdit" data-type="page" id="right_1" style="height:100%"> </div>';
           var pageLength  = pageLength  || '1';
           var deffered    = $q.defer();

           
           $http.post(productUrl+saveProject,{
                'pageLength':pageLength,
                'projectId':'',
                'projectName':projectName,
                'userName':userName,
                'projectInfo':projectInfo,
                'pages':{'editCode':editCode,'previewCode':previewCode}
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
    	getProjectList:function(userName){
            var deffered = $q.defer();
            console.log(userName+" userName in getProjectList Function")
    		$http({method:"GET",url:productUrl+findMyProject,params:{userName:userName}}).success(function(data){
                for(var i in data){
                    console.log(i+":"+data[i])
                }
                console.log(data+"....")
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