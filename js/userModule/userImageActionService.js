var userImageActionService = angular.module('userImageActionService',[]);
userImageActionService.factory('userPostAction',function($http){
	var serverUrl   = 'http://192.168.1.102:3000';
	var uploadImage = '/uploadImage';
	var delImage    = '/delImage';
    var loadImage   = '/findImageByUser';
	var myImageAction = {
		loadImageFn   : function(){},
		uploadImageFn : function(){
			var fd = new FormData();
			fd.append('file',file);
			$http.post(serverUrl+uploadImage,fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}})
	        .success(function(data){
	        	console.log(data+"image upload");
	        })
	        .error(function(){
	        });

		}
	}


	return myImageAction;

});