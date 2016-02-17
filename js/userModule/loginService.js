'use strict';

angular.module('loginService',[])
	.factory('loginFn',function($http,$q,$rootScope,sessionFn,SERVER_URL){
		return {
			login:function(credentials){
				var deffered = $q.defer();
				$http.post(SERVER_URL.liveUrl+'login',credentials)
					.success(function(data){
						if(data){
							sessionFn.set('user',JSON.stringify(data));
							deffered.resolve(data);
							$rootScope.setCurrentUser(data);
							$("#loginOverLay").css('display','none');
						}else{
							$scope.error ="用户名或密码错误";
						}
					})
					.error(function(data){
						deffered.reject(data);
					});

					 return deffered.promise;

			},
			logout:function(){
				sessionFn.destroy('user')
			},
			islogged:function(){
				if(sessionFn.get('user')){
					var objN = JSON.parse(sessionFn.get('user'));
					return objN;
				}else {
					return false
				};
			}
		}
	})