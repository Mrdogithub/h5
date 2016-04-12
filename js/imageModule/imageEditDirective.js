'use strict'

var imageEditDirective = angular.module('imageEditDirective',[]);


imageEditDirective.directive('editimage',function(
	$sce,
	$mdToast,
	$compile,
	$mdDialog,
	$document,$rootScope,
	projectFn,AuthService,SERVER_URL,loginFn,imageActionService){

	return{
		restrict:'AE',
		scope:{},
		templateUrl:'./template/edit.image.tmpl.html',
		link:function($scope){

			/*
			*@ 监听全局点击图片事件，点击同时显示图片编辑面板
			*
			****/
			$(document).on('click','.imageElementAcitve',function(){

				$('.ui-selected').removeClass('ui-selected');
				$('#text-properties').remove();
				$('.img-properties').remove();

                  console.log('image wroks')
				$('.mText').blur();
				$(this).addClass('ui-selected');
				initSelectedAndDraggable();
				showImageEditPanel($mdToast,$mdDialog,$document);
					// $('.imageElementAcitve').unbind();
			})



	 		/*
			*@全局监听点击文本元素方法，点击元素并显示文本编辑面板
			*
			***/
			// $(document).on('click','.textElementActive',function(){
			// 	$('.ui-selected').removeClass('ui-selected');
			//     $('#text-properties').remove();
			// 	$('.img-properties').remove();

		

			//     $('.mText').blur();
			// 	$(this).addClass('ui-selected');
			// 	$('.ui-selected >.mText').focus();
			// 	initSelectedAndDraggable();
			// 	showTextEditPanel($mdToast,$document);
			// 	// console.log("@editText.js line 83 Dec UPDATE"+$(this).parent().attr('class'));
			// })


			//创建新图片
			$scope.newImages = function(){
				$('.ui-selected').removeClass('ui-selected');
				$('.rotate-rightTop').css('display','none');
				 // var newImage = true;
				 // showAddImageOverLay($mdToast,$mdDialog,$document,newImage)

				 //判断用户是否登陆，只有在登陆状态才可上传图片
				 if(loginFn.islogged().status){

				 	//如果用户登录，显示上传图片对话框
	 				var newImage = true;

				 	showAddImageOverLay($mdToast,$mdDialog,$document,newImage)
				 }else{

				 	//console.log('@imageEditDirective.js DEC user not login ')

				 	//如果哟过户未登陆，显示登录对话框
		            $("#popupContainer").addClass('filter');
		            $mdDialog.show({
		                controller: function($scope,$rootScope){
		                    $scope.loginClose = function(){
		                        $mdDialog.hide();
		                        setTimeout(function(){
		                            $("#popupContainer").removeClass('filter');
		                        },250)
		                    }// end $scope.loginClose

		                    $scope.loginBtn = function(){
		                        $scope.loadingLogin = true;
		                        $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
		                        loginFn.login($scope.credentials).then(function(data){
			                        //$scope 作用于 user.login.tmpl.html
			                        //$rootScope 作用于全局
			                        // console.log(data.status+">>>>data.status")
			                        if(data.status){
		                                $rootScope.currentUser  = $rootScope.getCurrentUser();
		                                $rootScope.isAuthorized = loginFn.islogged().status;

		                                //显示添加图片overlay
	                               		var newImage = true;
			 							showAddImageOverLay($mdToast,$mdDialog,$document,newImage)
									}else{
		                            	$scope.loadingLogin = false;
		                      			$scope.userError = true;
		                            }
			                    });//end loginFn.login(....)
	                        }// end $scop.loginBtn
		                },
		                templateUrl:'./template/user.login.tmpl.html',
		                parent : $("#main"),
		                hideDelay: false
              		});// end $mdDialog.show(....);
				}

			};// end $scope.newImages


		} // end link:function(){.....}
	}
}); // end imageEditDirective.directive



/*
*@ imageActive
*@ 用户点击图片触发，回显属性值到编辑面板
*
********/
function imageActive(curImage){
	var reg = /\d+/g;
	var imageRadius = $(curImage).attr("style").indexOf("border-radius")
	if(imageRadius>-1) {
		var radiusSize = $(curImage).css("borderRadius").match(reg)[0];
		$('#imageRadiusid').val(radiusSize);
	}else{$('#imageRadiusid').val("") }


	var vopacity =$(curImage).attr("style").indexOf("opacity")
	 	if(vopacity>-1) {
 	 	var num = $(curImage).css("opacity");
 		$('#imageOpacityid').val(num)
	} else{$('#imageOpacityid').val("")}




	 	var animateId = $(curImage).parent().parent().attr('style').indexOf('animation-name');
	 	// console.log('animateId:'+animateId)
	 	if(animateId>-1) {
	 		setTimeout(function(){
		 		var animateName = $(curImage).parent().parent().css("animationName");
		 		//console.log('animateName:'+animateName)
		 	 	$("#js--imageAnimations option").each(function(){
				    if( $(this).val() == animateName ){
				      this.selected = true;
				      return false;
				    }
				});

	 		},100)
	 	}else{$('#js--imageAnimations').val("")}




	 	var animationDurationId =	$(curImage).parent().parent().attr("style").indexOf("animation-duration");
	 	if(animationDurationId>-1) {
	 	 	var animationDurationNum = $(curImage).parent().parent().css("animationDuration").match(reg)[0];
	 	 	console.log("fontSize:"+animationDurationNum)
	 		$('#animationImageDurationId').val(animationDurationNum)
	 	}else{$('#animationImageDurationId').val("") }



	 	var animationDelayId = $(curImage).parent().parent().attr("style").indexOf("animation-delay");
	 	if(animationDelayId>-1) {
	 	 	var animationDelayNum = $(curImage).parent().parent().css("animationDelay").match(reg)[0];
	 	 	console.log("fontSize:"+animationDelayNum)
	 		$('#animationImageDelayId').val(animationDelayNum)
	 	}else{$('#animationImageDelayId').val("") }
}



/*
* @showImageEditPanel
* @ 用户点击图片显示图片编辑面板
*
*
********/
function showImageEditPanel($mdToast,$mdDialog,$document){
	$mdToast.show({
     	controller: function($scope){

     	   //设置默认值
     	   // console.log($('.ui-selected').data('opacity')+"...$('.ui-selected').data('opacity')")
     	   var activeOpacity = !$('.ui-selected').data('opacity')? 1:$('.ui-selected').data('opacity') ;
     	   var activeRaius   = !$('.ui-selected').data('radius') ? 0:$('.ui-selected').data('radius') ;
	       $scope.imageRadius  = {"size":activeRaius};
	       $scope.selected     = $(".ui-selected").data('animate');
           $scope.opacity      = {"numberValue":activeOpacity};

           //设置动画透明度
		   $scope.getImageOpacity   = function(){
		   	        console.log('$scope.opacity.numberValue'+$scope.opacity.numberValue)
					$('.ui-selected .mImage').css('opacity',$scope.opacity.numberValue);
					$('.ui-selected .mImage').attr('data-opacity',$scope.opacity.numberValue);
			   }

			//选择动画效果
			$scope.imageAnimate 	= function(){

		    	imageAnimation($scope.selected);
	    		function imageAnimation(x){

	    			$('.ui-selected').attr('swiper-animate-effect',x);
					var speed = $('.ui-selected').attr('swiper-animate-duration');
					var delay = $('.ui-selected').attr('swiper-animate-delay');

					/*
					*@ $('.ui-selected').removeClass() ..........
					*@ 这段代码满足两种情况
					*@ a.用户先选择延时及时长后，再切换画效果的情况下，选中的动画效果会基于已设定的参数运行
					*@ b.用户未选择延时及时长后，选中的动画效果会运行
 					***********/
				    $('.ui-selected').removeClass()
				    				 .addClass(x + ' animated ui-selected ui-draggable ui-resizable imageElement imageElementAcitve')
				    				 .css({"animation-name":x,"animation-duration":speed,"animation-delay":delay})
				    				 .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

				    });

				}
		    }

		   //设置图片圆角
		   $scope.setImageRadiusSize = function(){

				$('.ui-selected').attr('data-radius',$scope.imageRadius.size);
				$(".ui-selected .imageContainer .mImage").css("borderRadius",$scope.imageRadius.size+"px");
		    }




		   //设置动画延时 / 时长
	       $scope.getImageAnimateSpeed = function(){
                /*
                *@ var animate = = "bounceInLeft"
                *@ 当用户未选择动画效果的情况下，选择延时或时长，元素会根据默认动画效果执行
                */
				var aniname = "bounceInLeft";
				var speed = "1s";
				var delay = "0s";

				if($scope.AnimateSpeed){
					speed = $scope.AnimateSpeed.size + "s";
				}
				if($scope.AnimateDelay){
					delay = $scope.AnimateDelay.size + "s";
				}
				if($scope.selected){
					aniname = $scope.selected +"";
				}

				$('.ui-selected').css({"animation-name":"name","animation-duration":"s","animation-delay":"s"});

				function test(){
					$('.ui-selected').css({"animation-name":aniname,"animation-duration":speed,"animation-delay":delay}).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					 	//$('.ui-selected').css("opacity",1);
					});

					$('.ui-selected').attr('swiper-animate-duration',speed);
					$('.ui-selected').attr('swiper-animate-delay',delay);
				}
				setTimeout(test,100);
		   }

		   $scope.setImageLink = function(){
				$("#popupContainer").addClass('filter');
    			$mdDialog.show({
    				controller:function($scope){
    				  //再次点击添加链接,显示之前的value
    				  $scope.textlink="";

				      $scope.textlink = $('.ui-selected').attr('data-link');
				      // console.log('update link twice:'+$('.ui-selected').attr('data-link'))
    				  $scope.linkClose = function(){
		    			 $mdDialog.hide();
	               		 setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
	    		  	  }

    				  $scope.saveLink = function(){

    				  	$scope.loadingAdd = true;

    				  	var linkText = $.trim($scope.textlink);
    				  	if(linkText==""){
    				  		$(".ui-selected").removeAttr('onclick');
    				  	}else{
    				  		$(".ui-selected").attr("onclick","window.open('"+$scope.textlink+"','target','param')");
    				  	}

    				  	$scope.loadingAdd = false;
    				 	$mdDialog.hide();
               		 	setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
    				   	$("#addBox").show();
    				   	$('.ui-selected').attr('data-link',$scope.textlink);
						setTimeout(function(){$("#addBox").fadeTo(3000).hide();	},1000);
    				  }
    				},
    				templateUrl:'./template/page.addLink.tmpl.html',
    				parent:$("#main"),
    				hideDelay:false
    			});
    	   }
		},
        templateUrl: './template/imagePropertyPanel.html',
        parent : $document[0].querySelector('#editModulePosition'),
        hideDelay: false
	});
}


/*
* @ showAddImageOverlay
* @ 用户创建新图片触发此方法
*
*****/
function showAddImageOverLay($mdToast,$mdDialog,$document,newImage){
	$("#popupContainer").addClass('filter');

 	$mdDialog.show({
		controller: function($scope,$compile,getImageList,imageActionService,loginFn){
  	       // getImageList 从app.js 传入 用来获取已上传数据，并渲染到添加图片页面
  		   $scope.imageList = getImageList.data;

  		   $scope.userName  = loginFn.islogged().email;

  		   console.log('userName:'+$scope.userName)

	       $scope.imageOverlayClose = function(){
		   		$mdDialog.hide();
       			setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
	       }


	       //从已上传列表中，选择图片
		   $scope.imageSelected = function(target){
			    $compile($('<div class="ui-selected imageElement imageElementAcitve" style="" data-type="image"> '+
			    				'<div class="imageContainer" style="overflow:hidden;">'+
			    					'<img src="'+target+'" class="mImage" onclick="imageActive(this)"/>'+
			    				'<div>'+
			    			'</div>').appendTo($('.isEdit')))($scope);


			    showImageEditPanel($mdToast,$mdDialog,$document);
			    initSelectedAndDraggable();
			    // console.log($('.ui-selected imageElement').filter('.mImage').width()+"xxxx")
			    // $('ui-selected imageElement').css({'width':})
				$mdDialog.hide();
	       		setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
		   }

            //上传图片
		    $scope.uploadImage = function(element){
		    	//console.log('@ imageEditDirective.js DEC: uploadImage Fn works')
		    	 $scope.$apply(function(scope) {
			         var photofile = element.files[0];
			         var reader = new FileReader();
			         imageActionService.addImage(photofile,$scope);
			         reader.onload = function(e) {
			           $scope.prev_img = e.target.result;
			           imageActionService.addImage(photofile,$scope);
			         };
			     });
		    }


		    //删除已上传图片
		    $scope.removeImage = function(imageId){

		    	if(confirm("确定删除吗")){
			      	imageActionService.removeImage(imageId);
			      	$("#"+imageId).remove();
			      	 return true;
			      }
			      else{
			      	  return false;
		     	 }
		      	// imageActionService.removeImage(imageId);
		      	// $("#"+imageId).remove();
		    }

		},
	    resolve:{
		      	getImageList :function(imageActionService){   return imageActionService.loadImage();}
		},
		templateUrl: './template/addImage.tmpl.html',
	    parent: $('#main')
	});
}



/*
*@initSelectedAndDraggable
*@初始化元素选中及拖拽功能
*
********/
// function initSelectedAndDraggable(){
// 	$('.rotate-rightTop').on('mouseover',function(){ $(this).css('display','block');});
// 		var selected = $([]), offset = {top:0, left:0};
// 		$( ".isEdit div.ui-selected" ).draggable({
// 			// start:function (){
// 			// 		 var l = ( 100 * parseFloat($(this).css("left")) / parseFloat($(this).parent().css("width")) )+ "%" ;
// 			// 		 var t = ( 100 * parseFloat($(this).css("top")) / parseFloat($(this).parent().css("height")) )+ "%" ;
// 			// 		 $(this).css("left" , l);
// 			// 		 $(this).css("top" , t);
// 			// },
// 			// stop:function (){
// 			// 		 var l = ( 100 * parseFloat($(this).css("left")) / parseFloat($(this).parent().css("width")) )+ "%" ;
// 			// 		 var t = ( 100 * parseFloat($(this).css("top")) / parseFloat($(this).parent().css("height")) )+ "%" ;
// 			// 		 $(this).css("left" , l);
// 			// 		 $(this).css("top" , t);
// 			// }
// 		}).resizable({ handles: 'n, e, s, w,se,sw,ne,nw',stop:function (){
// 		    // var l = ( 100 * parseFloat($(this).css("left")) / parseFloat($(this).parent().css("width")) )+ "%" ;
// 			  //    var t = ( 100 * parseFloat($(this).css("top")) / parseFloat($(this).parent().css("height")) )+ "%" ;
// 			  //    $(this).css("left" , l);
// 			  //    $(this).css("top" , t);
// 				//
// 			  //     var w = ( 100 * parseFloat($(this).css("width")) / parseFloat($(this).parent().css("width")) )+ "%" ;
// 			  //    var h = ( 100 * parseFloat($(this).css("height")) / parseFloat($(this).parent().css("height")) )+ "%" ;
// 			  //    $(this).css("width" , w);
// 			  //    $(this).css("height" , h);

//     	}

// 		});


// 		$( ".isEdit " ).selectable();

// 		//rotate function
// 		applyRotation();
// 		function applyRotation() {
// 		    $('.rotate-rightTop').draggable({
// 		        opacity: 0.01,
// 		        helper: 'clone',
// 		        drag: function (event, ui) {
// 		            var rotateCSS = 'rotate(' + ui.position.left + 'deg)';
// 		            $(this).parent().css({
// 		                '-moz-transform': rotateCSS,
// 		                    '-webkit-transform': rotateCSS
// 		            });
// 		        }
// 		    });
// 		}//end of applyRotation
// }
