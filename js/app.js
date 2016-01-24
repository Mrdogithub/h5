angular.module('mainApp',['toolBar','editText','ui.router','ngMaterial','loginController','homeController',"kendo.directives",'dragDirective','dashboardController','dashBoardService','imageService','userImageActionService','AuthService'],function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
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
}).controller('applicationController',function($scope,USER_ROLES,AuthService){
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	
	$scope.setCurrentUser = function(user){
		$scope.currentUser = user;
	}
	console.log('applicationController')
	
}).constant('SERVER_URL',{
  testUrl:"",
  liveUrl:"http://9.115.24.168:3000/"
}).constant('USER_ROLES',{}).config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('homePage',{
		url:'/',
		views:{
			'':{templateUrl:'./template/home.html',
		 		controller:'homeController'}
		}
	}).state('homePage.dashboard',{
		url:'/dashboard',
		views:{
			'editPanel':{templateUrl:'./template/page.dashboard.tmpl.html',
						 controller:'dashboardController',
						 resolve:{
						 		getMyProjectsList:function(dashBoardFunctionCollection){
						 			return dashBoardFunctionCollection.getProjectList();
						 		}
						 	}
						}

		}
	})
});
