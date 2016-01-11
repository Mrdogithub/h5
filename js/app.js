var rmtModule = angular.module('mainApp',['toolBar','editText','ui.router','ngMaterial','loginController','homeController',"kendo.directives",'dragDirective','dashboardController','dashBoardService']);
rmtModule.config(function($stateProvider,$urlRouterProvider){
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
