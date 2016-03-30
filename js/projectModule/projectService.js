var project = angular.module('projectService',[]);

project.factory('projectFn',function($http,$q,$timeout,$compile,SERVER_URL,loginFn){

	var productUrl                   = SERVER_URL.liveUrl;
	var copyProject                  = 'copyProject';
	var editProject                  = 'findProjectById';
    var saveProject                  = 'saveProject';
	var pageLeftNavObj               = [];
    var findMyProject                = 'findProjectByUser';
    var deletedProject               = 'delProject';
    var projectIdInDashboardService  = [];


    var myProjectAction = {

        saveProjectId:function(projectId){
            projectIdInDashboardService.length = 0;
            projectIdInDashboardService.push(projectId);
        },  
        savePageLength:function(num){
           /*
           *@ 描    述：添加新页面同时调用savePageLength，更新页面存储长度
           *@ 调用位置：homeController.js
           **/
           pageLeftNavObj.length = 0;

            for(var i in num){
                pageLeftNavObj.push({'type':num[i].type,'thumbId':num[i].thumbId});
            }

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
        addProject:function(projectName,previewCode,editCode,projectInfo,userName,pageLengthObj){

          //生成hash
            function makeid(){
                  var text = "";
                  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                  for( var i=0; i < 10; i++ )
                      text += possible.charAt(Math.floor(Math.random() * possible.length));
                  return text;
            } 

          // console.log('pageLengthObj:'+ !pageLengthObj.length)
           for(var i in pageLengthObj){
            //console.log(i+":"+pageLengthObj[i])
           }
           var pageLeftNavObj=[];
           var defaultThumb = makeid();
           var previewCode  = previewCode    || '<div class="swiper-slide isEdit" data-type="page" id="right_1" style="height:100%;"> </div>';
           var editCode     = editCode       || '<i class="icon-move bgAcitve" style="position: absolute;left: 100%;top: 0px;background-color: #eee;width: 20px;height: 20px;padding: 2px;opacity:0;" ng-click="setBackground()"></i><div class="swiper-slide isEdit" data-pageid="'+defaultThumb+'" data-type="page" id="right_1" style="height:100%;direction: ltr;"> </div>';
           var deffered     = $q.defer();
           var userName     = loginFn.islogged().email;
           // console.log('@projectService.js add project Fn  pageLength:'+pageLengthObj)
           // console.log('@projectService.js add project Fn  previewCode:'+previewCode)
           // console.log('@projectService.js add project Fn  userName:'+userName)
           // console.log('@projectService.js add project Fn  projectInfo:'+projectInfo)
           //从dashboard中添加项目需要生成默认thumb id
           if(!pageLengthObj){
             
              pageLeftNavObj.push({'type': '1','thumbId':defaultThumb});
           }else if(!pageLengthObj.length){
           // console.log('activeid:'+$('.box').data('activeid'));
             pageLeftNavObj.push({'type': '1','thumbId':$('.box').data('activeid')})
           }else if(pageLengthObj){

            //描    述：重新处理pageLengthObj结构,默认数据结构在mongodb中报错
            //默认结构：pageLengthObj =  $scope.feedback.leftpages
               for(var i in pageLengthObj){
                   pageLeftNavObj.push({'type':pageLengthObj[i].type,'thumbId':pageLengthObj[i].thumbId});
                }


           }

           //console.log('@projectService.js pageLeftNavObj is:'+pageLeftNavObj.length)

           $http.post(productUrl+saveProject,{
                'projectName': projectName,
                'projectInfo': projectInfo,
                'pageLength' : pageLeftNavObj,
                'projectId'  : '',
                'userName'   : userName,
                'pages'      : {'editCode':editCode,'previewCode':previewCode}
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

            return pageLeftNavObj;
        },
    	getProjectList:function(userName){
            var deffered = $q.defer();
            // console.log('@projectService dec:userName is:'+userName);
            // console.log('@projectService dec:url is:'+productUrl+findMyProject);
    		$http({method:"GET",url:productUrl+findMyProject,params:{userName:userName}}).success(function(data){
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
            console.log('@projectService.js DEC: projectName:'+projectName+"projectId:"+projectId)
            var deffered = $q.defer()
    	    $http({method:"POST",url:productUrl+copyProject,params:{'pid':projectId,'projectname':projectName}}).success(function(data){
                for(var i in data){
                    console.log(i+":"+data[i])
                    for(var j  in data[i]){
                        console.log(j+":"+data[j])
                    }
                }
                deffered.resolve(data);
    		}).error(function(data){
                deffered.reject(data);
            });
    		return deffered.promise;
    	}
    };
    return myProjectAction;
});