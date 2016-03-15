'use strict'

var imageEditDirective = angular.module('imageEditDirective',[]);


imageEditDirective.directive('editimage',function(
	$sce,
	$mdToast,
	$compile,
	$document,$rootScope,
	projectFn,AuthService,SERVER_URL,loginFn,imageActionService){

	return{
		restrict:'AE',
		scope:{},
		templateUrl:'./template/edit.image.tmpl.html',
		link:function($scope){
			$(document).on('click','.imageElement',function(){
				$('.ui-selected').removeClass('ui-selected');
				$('.ui-selected').removeClass('ui-selected');
				$(this).addClass('ui-selected');
				showImageEditPanel($mdToast,$document);	
			})

			$scope.newImages = function(){
				$('.ui-selected').removeClass('ui-selected');
				$('.rotate-rightTop').css('display','none');
				 var newImage = true;
				 showAddImageOverLay($mdToast,$document,newImage)
				 // showImageEditPanel($mdToast,$document);
			};

			$scope.removeImage = function(imageId){
		      	imageActionService.removeImage(imageId);
		      	$("#"+imageId).remove();
		    }

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
		}
	};

});



// function imageClickActive($mdToast,$document){
// 	$('.ui-selected >.mImage').on('click',function(event){
// 		console.log('image click');
// 		 event.stopPropagation();

// 		$('.ui-selected').removeClass('ui-selected');
// 		$(this).parent().addClass('ui-selected');
// 		initSelectedAndDraggable();
// 		$('.mText').blur();
// 		$('#text-properties').remove();
// 		showImageEditPanel($mdToast,$document);
// 	})
// }            

function imageActive(curImage){
	var reg = /\d+/g;
	var imageRadius = $(curImage).attr("style").indexOf("border-radius")
	if(imageRadius>-1) {
		var radiusSize = $(curImage).css("borderRadius").match(reg)[0];
	$('#imageRadiusid').val(radiusSize) 
	}else{$('#txtRadiusid').val("") } 	
}


function showImageEditPanel($mdToast,$document){
	$mdToast.show({
     	controller: function($scope){
     	   var activeOpacity = $('.ui-selected').data('opacity');
	       $scope.imageRadius  = {"size":$('.ui-selected').data('radius')};
	       $scope.selected     = $(".ui-selected").data('animate');
           $scope.opacity      = {"numberValue":activeOpacity};

		   $scope.getImageOpacity   = function(){
					$('.ui-selected').css('opacity',$scope.opacity.numberValue);
					$('.ui-selected').attr('data-opacity',$scope.opacity.numberValue);
			   }
			$scope.imageAnimate 	= function(){
				var speed = "1s";
				var delay = "0s";
				if($scope.AnimateSpeed){
					speed = $scope.AnimateSpeed.size + "s";
				}
				if($scope.AnimateDelay){
					delay = $scope.AnimateDelay.size + "s";
				}
		    	testAnimation($scope.selected);
	    		function imageAnimation(x){
				    $('.ui-selected').removeClass().addClass(x + ' ui-selected ui-draggable ui-resizable').css({"animation-name":x,"animation-duration":speed,"animation-delay":delay});	
				}
		   }

		   $scope.setImageRadiusSize = function(){
				$('.ui-selected').attr('data-radius',$scope.imageRadius.size);
				$(".ui-selected >.mImage").css("borderRadius",$scope.imageRadius.size+"px");
		   }
		
	
			//text animate speed
	       $scope.getImageAnimateSpeed = function(){
				var aniname = "bounceIn";
				var speed = "1s";
				var delay = "0s";
				if($scope.selected){
					aniname = $scope.selected +"";
				}
				if($scope.AnimateSpeed){
					speed = $scope.AnimateSpeed.size + "s";
				}
				if($scope.AnimateDelay){
					delay = $scope.AnimateDelay.size + "s";
				}
				$('.ui-selected').css({"animation-name":"name","animation-duration":"s","animation-delay":"s"});
				
				function test(){
					$('.ui-selected').css({"animation-name":aniname,"animation-duration":speed,"animation-delay":delay});
				}
				setTimeout(test,100);
		   }
    			
			//text animate delay
	       $scope.getImageAnimateDelay = function(){
				//$('#ani').prop('selectedIndex', -1);
				var aniname = "bounceIn";
				var speed = "1s";
				var delay = "0s";
				if($scope.selected){
					aniname = $scope.selected +"";
				}
				if($scope.AnimateSpeed){
					speed = $scope.AnimateSpeed.size + "s";
				}
				if($scope.AnimateDelay){
					delay = $scope.AnimateDelay.size + "s";
				}
				$('.ui-selected').css({"animation-name":"name","animation-duration":"s","animation-delay":"s"});
				
				function test(){
					$('.ui-selected').css({"animation-name":aniname,"animation-duration":speed,"animation-delay":delay});
				}
				setTimeout(test,100);
		   }

		   $scope.setImageLink = function(){
			
    			$mdDialog.show({
    				controller:function($scope){
    				  $scope.saveImageLinkCancel = function(){
    	    			$mdDialog.cancel();
    	    			$('.md-dialog-container').css('display','none');
    	    		  }
    				  $scope.saveImageLink = function(){
    				 
    				   $(".ui-selected").attr("onclick","window.open('"+$('#textLink').val()+"','target','param')");
    				   $mdDialog.cancel();
    				   $('.md-dialog-container').css('display','none');
    				   	$("#addBox").show();
						setTimeout(function(){$("#addBox").fadeTo(3000).hide();	},1000);
    				  }
    				},
    				templateUrl:'./template/page.addImageLink.tmpl.html',
    				parent:$document[0].querySelector("#main"),
    				hideDelay:false
    			});
    	   }
		},
        templateUrl: './template/imagePropertyPanel.html',
        parent : $document[0].querySelector('#editModulePosition'),
        hideDelay: false
	});
}



function showAddImageOverLay($mdToast,$document,newImage){

	$mdToast.show({
      	controller: function($scope,$mdDialog){
		   if(newImage){
			   	 $mdDialog.show({
			      controller: function($scope,$compile,getImageList,imageActionService){
			      		   $scope.imageList = getImageList.data;	

					       $scope.imageOverlayClose = function(){
					       		$('.md-dialog-backdrop').remove();
								$('.md-scroll-mask').remove();
								$('.md-scroll-mask-bar').remove();
								$('.md-dialog-container').remove();
					       		$("#imageOverlay").css('display','none')
					       } 

						   $scope.imageSelected = function(target){
								//$compile($('<div class="ui-selected" data-type="image" style="width:200px;height:200px;position:absolute;"><div class="rotate-location rotate-rightTop"><i class="icon-undo"></i></div><div class="mImage" ng-click="imageActive()" style="position: absolute; width: 100%; height:100%;overflow: hidden; border: 0px none rgb(0, 0, 0); border-radius: 0px;background-image: url('+target+');background-size:100% 100%;"></div></div>').appendTo($('.isEdit')))($scope);
							    $compile($('<div class="ui-selected imageElement" data-type="image" style="width:100%;height:100%;position:absolute"><div class="mImage" onclick="imageActive(this)" style="position:absolute;background-image: url('+target+');width:100%;height:100%;background-size:100% 100%;background-repeat:no-repeat"></div></div>').appendTo($('.isEdit')))($scope);
							    //initElement('.mImage','image',$mdToast,$document);
							    showImageEditPanel($mdToast,$document);
							    initSelectedAndDraggable();
							  	
							    $("#imgpop").animate({left:"-99999px"},200);
							    $('.md-dialog-backdrop').remove();
								$('.md-scroll-mask').remove();
								$('.md-scroll-mask-bar').remove();
								$('.md-dialog-container').remove();
						   }
	
				  },
			      resolve:{
				      	getImageList :function(imageActionService){ return imageActionService.loadImage();}
				  },
	    		  templateUrl: './template/addImage.tmpl.html',
	              parent: $document[0].querySelector('#main')
				});
			}
		}//end of showImageEditPanel  controller
	});

}
	    



function initSelectedAndDraggable(){
	$('.rotate-rightTop').on('mouseover',function(){ $(this).css('display','block');});
		var selected = $([]), offset = {top:0, left:0}; 
		$( ".isEdit > div" ).draggable({
			stop:function (){
			     var l = ( 100 * parseFloat($(this).css("left")) / parseFloat($(this).parent().css("width")) )+ "%" ;
			     var t = ( 100 * parseFloat($(this).css("top")) / parseFloat($(this).parent().css("height")) )+ "%" ;
			     $(this).css("left" , l);
			     $(this).css("top" , t);
			}
		}).resizable({ handles: 'n, e, s, w,se,sw,ne,nw',stop:function (){
		    var l = ( 100 * parseFloat($(this).css("left")) / parseFloat($(this).parent().css("width")) )+ "%" ;
			     var t = ( 100 * parseFloat($(this).css("top")) / parseFloat($(this).parent().css("height")) )+ "%" ;
			     $(this).css("left" , l);
			     $(this).css("top" , t);

			      var w = ( 100 * parseFloat($(this).css("width")) / parseFloat($(this).parent().css("width")) )+ "%" ;
			     var h = ( 100 * parseFloat($(this).css("height")) / parseFloat($(this).parent().css("height")) )+ "%" ;
			     $(this).css("width" , w);
			     $(this).css("height" , h);

    	}});


		$( ".isEdit " ).selectable();

		//rotate function
		applyRotation();
		function applyRotation() {
		    $('.rotate-rightTop').draggable({
		        opacity: 0.01,
		        helper: 'clone',
		        drag: function (event, ui) {
		            var rotateCSS = 'rotate(' + ui.position.left + 'deg)';
		            $(this).parent().css({
		                '-moz-transform': rotateCSS,
		                    '-webkit-transform': rotateCSS
		            });
		        }
		    });
		}//end of applyRotation
}
