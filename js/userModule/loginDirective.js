  "use strict";

  angular.module('loginDirectiveModule',[])
  	.directive('loginDirective',function($q,AUTH_EVENTS){
  		return{
  			restrict:"AE",
  			scope:{},
  			templateUrl:"./template/user.login.tmpl.html",
  			controller:function($scope){
  				$scope.loginClose = function(){
	      			$('#loginOverLay').css('display','none');
	      		}

	      		$scope.loginBtn = function(){
      			$scope.loading = true;
    		 	$scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
  		     	AuthService.login($scope.credentials).then(function(user){
  		     		console.log(user.userName+"////////////user.userName")
  		     		if(typeof(user.userName)!=="undefined"){
  		     			$scope.loading = false;
	  		     			$rootScope.userName = user.userName;
		  		     		$rootScope.userPhoto = user.userPhoto;
		                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		                    // _parentScope.setCurrentUser(user);

		                    $scope.$emit('setCurrentUser',user)

							$('<span class="userImage"><img id="uImage" src="'+user.userPhoto+'"></span><span class="userName ng-binding" role="button" tabindex="0"> '+user.userName+' </span>').prependTo("#userProfile")
        			 		$("#welcome").css('display','none')
							$("#loginOverLay").css('display','none');
							$("#pagesList").css('display','block');
							AuthService.setUserInfo(user.userName,user.userPhoto);
	  		     		}else{
	  		     			$scope.error ="用户名或密码错误";
	  		     		}
  		     		},function(){
  		     	});
			}


  			},
  			link:function(){
  			
      	

  			}
  		}
  	})
