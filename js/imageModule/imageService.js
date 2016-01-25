var imageService = angular.module('imageService',[]);

imageService.factory('imageActionService',function($http,$q,$compile,SERVER_URL){
	var serverUrl    = SERVER_URL.liveUrl;
	// var serverUrl    = 'data/images';
	var removeImage  = 'delImage';
	var loadImage    = 'findImageByUser';	
	var addImage	 = 'uploadImage';

	var imageActionService = {
		loadImage	:function(){
			console.log('loadImage works')
			var promise = $http({method:"GET",url:serverUrl+loadImage});
	    		promise.success(function(data,status,headers){
	    			return data;
	    		});
    			
    			return promise;
		},
		addImage 	:function(imageUrl,$scope){
			// console.log('imageUrl'+imageUrl);
			// var promise = $http({method:"POST",url:serverUrl+addImage,params:{data:imageUrl},headers: {'Content-Type': undefined}});
   //  		promise.success(function(data,status,headers){
   //  			console.log('image upload');
   //  			return data;
   //  		});
			
			// return promise;


$.ajax({
        beforeSend : function (){
          var newUpload = $('<li class="myImg imageInProgress"><img src="images/imageplacholder.jpg" style="width:140px;"/><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:0%;height:10px;"><span class="sr-only">60% Complete</span></div></li>');
             newUpload.insertAfter($("#newImageTarget"));
      },
     xhrFields: {
            onprogress: function (evt) {
               if (evt.lengthComputable) {
                 var percentComplete = Math.floor(evt.loaded / evt.total) * 100 + '%';
                 $('.progress-bar').css({width : percentComplete});
               }
            }
         },
        url: SERVER_URL.liveUrl+"uploadImage",
        type: "POST",
        data: new FormData($('#uploadImageForm')[0]), 

        success : function(data){
            // Show success message
            $('.imageInProgress').empty();
            
                    console.log(data.image.url+"||"+data.image.name+"||"+data.image._id+"data.image._id");
            $compile($('.imageInProgress').attr('id',data.image._id).html('<img class="myImageActive" src="'+data.image.url+'" ><div style="height:20px;width:100%;background-color:rgba(0,0,0,0.8);margin-top:-1px;"><span style="font-size:6px;color:#fff;float:left; padding:2px;">'+data.image.name+'</span></div><div style="position:absolute;top:0px;left:0px;background-color:rgba(0,0,0,0.8);width:140px;height:120px;opacity:0;text-align:center;" class="imageOption"><a style="z-index:9999;color:#fff; margin-right:20px;display:inline-block;line-height:120px;" class="removeImageHover" ng-click="removeImage($event,'+"'"+data.image._id+"'"+')"><i class=" icon-trash icon-2x" ></i></a><a style="z-index:9999;color:#fff;display:inline-block;line-height: 120px;" class="selectedImageHover" ng-click="imageSelected('+"'"+data.image.url+"'"+')"><i class="icon-ok-sign icon-2x" ></i></a></div>'))($scope)
             $('.imageInProgress').removeClass('imageInProgress');
        },
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false
    });



		},
		removeImage	:function(imageId){
		    console.log('delete works'+imageId)
    		var promise = $http({method:"GET",url:serverUrl+removeImage,params:{id:imageId}});
    		promise.success(function(data,status,headers){
    			return data;
    		});
    		return promise;
		}
	};

	return imageActionService;
});