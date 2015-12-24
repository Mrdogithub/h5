var userLoginController = angular.module('loginController', []);

userLoginController.controller('loginController',function($scope,$location){
	$scope.loginBtn = function(){
		$location.path("/home");
	}
});