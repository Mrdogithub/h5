angular.module('mainApp',['toolBar','editText','ui.router','ngMaterial','loginController','homeController','applicationController',"kendo.directives",'dragDirective','dashboardController','dashBoardService','imageService','userImageActionService','AuthService'],function($httpProvider) {
$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        console.log(value+"///value")
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
       console.log(query+"/// query")
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}).constant('Auth_EVENTS',{
	loginSuccess:'auth-login-success',
	loginFailed:'auth-login-failed',
	loginOutSuccess:'auth-loginout-success',
	sessionTimeout:'auth-session-timeout',
	notAuthenticated:'auth-not-authenticated',
	notAuthorized:'auth-not-authorized'
}).constant('SERVER_URL',{
  testUrl:"",
  liveUrl:"http://192.168.1.102:3000/"
}).constant('USER_ROLES',{}).config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('homePage',{
		url:'/:projectId',
		views:{
			'':{templateUrl:'./template/home.html',
		 		controller:'homeController',
		 		resolve:{
		 			editPage:function($stateParams,dashBoardFunctionCollection){
		 	
		 				return dashBoardFunctionCollection.loadEditPage($stateParams.projectId);
	
		 			}
		 		}
			}
		}
	}).state('homePage.dashboard',{
		url:'/dashboard',
		views:{
			'editPanel':{templateUrl:'./template/page.dashboard.tmpl.html',
						 controller:'dashboardController',
						 resolve:{
						 		getMyProjectsList:function(dashBoardFunctionCollection){
						 			   
						 			   $("#uNameDashboard").html($("#uName").html());
						 			   return dashBoardFunctionCollection.getProjectList();
						 		}
						 	}
						}

		}
	})
});
