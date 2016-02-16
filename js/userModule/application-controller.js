"use strict";

angular.module('applicationController',[])
	.controller('applicationController',function($scope,$rootScope,USER_ROLES,AuthService){

	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	
	$rootScope.$broadcast('')	

	$rootScope.setCurrentUser = function(user){
		$rootScope.currentUser = user;
		console.log(user.userName+"//// user")
		console.log(user.userPhoto+"//// user")
	}
})
