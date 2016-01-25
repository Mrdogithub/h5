var authService = angular.module('AuthService',['session']);
authService.factory('AuthService',function($http,Session,SERVER_URL){
	var authService = {};
	authService.login = function(credentials){
		return $http
				.post(SERVER_URL.liveUrl+'login',credentials)
				.then(function(res){
					Session.create(res.data.userName);
					return res.data.userName;
				});
	};
	authService.isAuthenticated = function(){
		return !!Session.userName;
	};
	authService.isAuthorized = function(authorizedRoles){
		if(!angular.isArray(authorizedRoles)){
			authorizedRoles = [authorizedRoles];
		}
		return(authService.isAuthenticated() &&
			authorizedRoles.indexOf(Session.userRole)!== -1);
	}
	return authService;
});
