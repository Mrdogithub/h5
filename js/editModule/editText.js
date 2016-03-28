"use strict";

var editText = angular.module('editText',[]);

editText.directive('edittext',function(
	$sce,
	$mdToast,
	$compile,
	$document,$rootScope,
	projectFn,AuthService,SERVER_URL,loginFn){
	return {
		restrict:'AE',
		templateUrl:'./template/edit.text.tmpl.html',
		scope:{},
		link:function($scope){

			/*
			*@全局监听点击文本元素方法，点击元素并显示文本编辑面板
			*
			***/
			$(document).on('click','.textElementActive',function(){
				$('.ui-selected').removeClass('ui-selected');
			    $('#text-properties').remove();
				$('.img-properties').remove();
			    

			    $('.mText').blur();
				$(this).addClass('ui-selected');				
				$('.ui-selected >.mText').focus();
				initSelectedAndDraggable();
				showTextEditPanel($mdToast,$document);
				// console.log("@editText.js line 83 Dec UPDATE"+$(this).parent().attr('class'));	
			})


            /*
            *@ 读取已保存的项目到编辑页面
            *
            ****/
            var loadingProjectById = projectFn.getProjectId();
			if(loadingProjectById){
				projectFn.loadEditPage(loadingProjectById).then(function(data){
					$compile($("#pagesList").attr('ng-bind-html','page.editCode'))($scope)
					$scope.page = { "editCode":""};
					$scope.page.editCode = $sce.trustAsHtml(data.pages.editCode);
					$scope.editcode = data.pages.editCode;
					$("#pagesList").attr('data-projectid',loadingProjectById);

				//设置第一页面为显示状态，其他页面暂时隐藏

			    //console.log('$("#pagesList").children()[0].html();'+$("#pagesList").children()[0].html())


                //监听重新编辑后的文本点击事件
				$(document).on('click','.textElementActive',function(){
					$('.ui-selected').removeClass('ui-selected');
				    $('#text-properties').remove();
					$('.img-properties').remove();
				    
					$("#right_1").addClass('isEdit');
				    $('.mText').blur();
					$(this).addClass('ui-selected');				
					$('.ui-selected >.mText').focus();
					initSelectedAndDraggable();
					showTextEditPanel($mdToast,$document);
					// console.log("@editText.js line 83 Dec UPDATE"+$(this).parent().attr('class'));	
				});
				
				//监听重新编辑后的图片点击事件
				$(document).on('click','.imageElement',function(){

					$('.ui-selected').removeClass('ui-selected');
					$('#text-properties').remove();
					$('.img-properties').remove();

					$("#right_1").addClass('isEdit');
					$('.mText').blur();
					$(this).addClass('ui-selected');
					initSelectedAndDraggable();
					showImageEditPanel($mdToast,$mdDialog,$document);	
				});


	           },function(){})
			}


			//创建新文本
			$scope.newText = function(){
                createNewText($mdToast,$document);
			};
		}
	}
})


//判断当前是否存在项目
function projectIsNull(){
	var status = typeof($("#pagesList").data('projectid')) == "undefined"?true:false;
	return status;
}

//创建文本
function createNewText($mdToast,$document){
	$('.img-properties').remove();
	$('.ui-selected').removeClass('ui-selected');
	$('.rotate-rightTop').css('display','none');
	//<div class="rotate-location rotate-rightTop" style="display:block;"><i class="icon-undo"></i></div>
    //var iText = $('<div class="ui-selected" data-type="text" style="width:auto;height:auto;position:absolute;"><textarea  class="mText"  style=" width:100%;height:auto;position:relative;overflow-y:hidden;resize:none" onclick="textActive(this)">text placeholder</textarea></div>');
    // var iText = $('<div class="ui-selected" data-type="text" style="width:200px;height:60px;position:absolute;"><div class="mText" contentEditable="true" style="overflow: hidden; border: 0px none rgb(0, 0, 0); border-radius: 0px;">text placeholder</div></div>');
    
var iText = $('<div class="ui-selected textElement textElementActive" data-type="text" style="position:absolute;"><div  class="mText"  style="font-size:14px;" contenteditable="true" onclick="textActive(this)">请输入文本</div></div>');
    var currentPage = $('.isEdit');
    iText.appendTo(currentPage);
    showTextEditPanel($mdToast,$document);
    initSelectedAndDraggable();
}



//显示文本编辑面板
function showTextEditPanel($mdToast,$document){

	$mdToast.show({
      controller: function($scope,$mdDialog){ 
         
        /*
        *@ var activeFontSize = ............
        *@ 用于用户第一次创建元素时，设置属性面板中的各项默认值
        *@ 默认值通过 $('.ui-selected > .mText').data('xxxx')获取
        ********/
        var activeFontSize		= !$('.ui-selected > .mText').data('fontSize')?14:$('.ui-selected > .mText').data('fontSize');
        var activelineHeight	= !$('.ui-selected > .mText').data('lineHeight')?0:$('.ui-selected > .mText').data('lineHeight');
        var activeBorderRadius  = !$('.ui-selected > .mText').data('borderRadius')?0:$('.ui-selected > .mText').data('borderRadius');
        var activeOpacity       = !$('.ui-selected > .mText').data('opacity')?1:$('.ui-selected > .mText').data('opacity');
       
        //初始化新建元素的属性值  
        $scope.radius 	  = {"size" : activeBorderRadius}
        $scope.opacity 	  = {"numberValue": activeOpacity}
        $scope.fontSize   = {"size" : activeFontSize}
        $scope.lineHeight = {"size" : activelineHeight}


      	//设置字体大小
      	$scope.getFontSize = function(){
			$('.ui-selected > .mText').css('fontSize',$scope.fontSize.size);

			//通过读取data-xxx 属性 设定创建元素时的默认值
			$('.ui-selected > .mText').attr('data-fontSize',$scope.fontSize.size)
		}

	

		//设置行高
      	$scope.getLineHeight = function(){
      		var lineHeightValue = $scope.lineHeight.size+"em";
			$('.ui-selected > .mText').css('lineHeight',lineHeightValue);

			//通过读取data-xxx 属性 设定创建元素时的默认值
			$('.ui-selected > .mText').attr('data-lineHeight',$scope.lineHeight.size)
		}

		//设置字体
		$scope.fontFamily = [{"name":"Helvetica","value":"Helvetica"},{"name":"Arial","value":"Arial"},{"name":"Verdana","value":"Verdana"},{"name":"Tahoma","value":"Tahoma"},{"name":"Georgia","value":"Georgia"},{"name":"sans-serif","value":"sans-serif"},{"name":"monospace","value":"monospace"},{"name":"fantasy","value":"fantasy"},{"name":"cuisive","value":"cuisive"},{"name":"Helvetica, sans-serif","value":"Helvetica, sans-serif"},{"name":"Arial, sans-serif","value":"Arial, sans-serif"},{"name":"Lucida Grande', sans-serif","value":"Lucida Grande', sans-serif"},{"name":"Verdana,sans-serif","value":"Verdana,sans-serif"},{"name":" Tahoma, sans-serif","value":" Tahoma, sans-serif"},{"name":"'Trebuchet MS', sans-serif","value":"'Trebuchet MS', sans-serif"},{"name":"Georgia, serif","value":"Georgia, serif"},{"name":"Times, serif","value":"Times, serif"}];
		$scope.setFontFamily = function(){
			$('.ui-selected > .mText').css('fontFamily','"'+$scope.selected+'"');
		}

		//设置字体颜色
		$scope.$watch("setFontColor",function(newColor,oldColor){
			$('.ui-selected > .mText').css('color',newColor);
		});

		//设置加粗
		$scope.setFontBold = function(){
			if($('.ui-selected  > .mText').css("fontWeight") != "bold"){
				$('.ui-selected > .mText').css("fontWeight","bold");
				$("#fontBlodId").addClass("fontItemActive");
			}else if($('.ui-selected > .mText').css("fontWeight") == "bold"){
				$('.ui-selected > .mText').css("fontWeight","");
				$("#fontBlodId").removeClass("fontItemActive");
			}
		};

		//设置斜体
		$scope.setFontItalic = function(){
			if($('.ui-selected  > .mText').css("fontStyle") != "italic"){
				$('.ui-selected > .mText').css("fontStyle","italic");
				$("#fontItalicId").addClass("fontItemActive");
			}else if($('.ui-selected > .mText').css("fontStyle") == "italic"){
				$('.ui-selected > .mText').css("fontStyle","");
				$("#fontItalicId").removeClass("fontItemActive");
			}
		}
		
		//设置下划线
		$scope.setTextDecoration = function(){
			if($('.ui-selected  > .mText').css("textDecoration") != "underline"){
				$('.ui-selected > .mText').css("textDecoration","underline");
				$("#textDecorationId").addClass("fontItemActive");
			}else if($('.ui-selected > .mText').css("textDecoration") == "underline"){
				$('.ui-selected > .mText').css("textDecoration","");
				$("#textDecorationId").removeClass("fontItemActive");
			}
		}

		//设置元素对齐
		$scope.setTextAlign = function(textPos){
			if($('.ui-selected  > .mText').css("textAlign") != textPos){
				$('.ui-selected > .mText').css("textAlign",textPos);
				$('.textAlign').removeClass("fontItemActive");
				$(".textAlign"+textPos+"Id").addClass("fontItemActive");
			}else if($('.ui-selected > .mText').css("textAlign") == textPos){
				$('.ui-selected > .mText').css("textAlign","");
				$(".textAlign"+textPos+"Id").removeClass("fontItemActive");
			}
		}

		//设置圆角
		$scope.getRadiusSize = function(){
			$('.ui-selected').css("borderRadius",$scope.radius.size+"px");

			//通过读取data-xxx 属性 设定创建元素时的默认值
			$('.ui-selected > .mText').attr('data-borderRadius',$scope.radius.size)
		}

		//设置文本背景
		$scope.$watch("setFontBackgroundColor",function(newValue,oldValue){
			$('.ui-selected').css("backgroundColor",newValue);
		});

		//设置透明度
		$scope.getFontOpacity  = function(){
			$('.ui-selected > .mText').css("opacity",$scope.opacity.numberValue);

			//通过读取data-xxx 属性 设定创建元素时的默认值
			$('.ui-selected > .mText').attr('data-opacity',$scope.opacity.numberValue)
		};

		
		//监听文本链接是否有变化，有变化更新之
		$scope.$watch("setFontLink",function(newValue,oldValue){
			$('.ui-selected > .mText').attr("data-link",newValue);		    			
		})


		//选择动画效果
		$scope.textAnimate = function(){
			 testAnimation($scope.selected);
    		 function testAnimation(x){
			    // $('.ui-selected').removeClass().addClass(x + ' animated ui-selected ui-draggable ui-resizable').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			    // });

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
				    				 .addClass(x + ' animated ui-selected ui-draggable ui-resizable textElement textElementActive')
				    				 .css({"animation-name":x,"animation-duration":speed,"animation-delay":delay})
				    				 .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

				    });
			  }
		}
		

		//设置动画延时 / 时长
      	$scope.getAnimateSpeed = function(){

      		 /*
                *@ var animate = = "bounceInLeft"
                *@ 当用户未选择动画效果时，选择延时或时长，元素会根据默认动画效果执行
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
	

		//添加文本链接
		$scope.setTextLink = function(){
			$("#popupContainer").addClass('filter');
			$mdDialog.show({
				controller:function($scope,items){
				  $scope.textlink="";
				  $scope.textlink = $('.ui-selected').attr('data-link');
				  $scope.linkClose = function(){
	    			 $mdDialog.hide();
               		 setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
	    		  }
				  $scope.saveLink = function(){
				   $scope.loadingAdd = true;
				   $('.ui-selected').attr('data-link','');
				   $('.ui-selected').attr('data-link',$scope.textlink);

				   $(".ui-selected").attr("onclick","window.open('"+$scope.textlink+"','target','param')");
				  $scope.loadingAdd = false;
				   $mdDialog.hide();
               		setTimeout(function(){$("#popupContainer").removeClass('filter');},250)

				   	$("#addBox").show();
					setTimeout(function(){$("#addBox").fadeTo(3000).hide();	},1000);
				  }
				},
				templateUrl:'./template/page.addLink.tmpl.html',
				locals:{
					    items:$('.ui-selected').data('link')     
				},
				parent:$("#main"),
				hideDelay:false
			});
		}
	},
      templateUrl: './template/fontPropertyPanel.html',
      parent :$('#editModulePosition'),
      hideDelay: false
      // position: $scope.getToastPosition()
    });
}//end of showTextEditPanel function




// show radiobox edit panel if radiobox active
function showBackgroundEditPanel($mdToast,$document){
	$mdToast.show({
      controller:function($scope){
		//set FontColor
		$scope.$watch("setPageBackgroundColor",function(newColor,oldColor){
			$('.isEdit').css('backgroundColor',newColor);
		});
	
		$(this).parent().attr('id','selectedFormItem');
		$(this).parent().css({'border':'#dedede 3px dashed','overflow':'hidden'});

 
	    $(function() {
		    $( "#formContent" ).sortable({
		      revert: true
		    });
		});

      },
      templateUrl: './template/page.background.tmpl.html',
      parent : $document[0].querySelector('#editModulePosition'),
       hideDelay: false
      // position: $scope.getToastPosition()
	});	
}


function textActive(curText){

  	  	var reg = /\d+/g;
	  	var fontSize =	$(curText).attr("style").indexOf("font-size");
	 	if(fontSize>-1) {
	 	 	var numFontSize = $(curText).css("fontSize").match(reg)[0];
	 		setValue('#txtNumid',numFontSize)
	 	}else{$('#txtNumid').html("") } 

		var lineheight =$(curText).attr("style").indexOf("line-height");
		 	if(lineheight>-1) {
	 	 	var numLineHeight = $(curText).css("lineHeight").match(reg)[0];
	 	 	var numFontSize   = $(curText).css("fontSize").match(reg)[0];
	 		setValue('#txtHeightid',numLineHeight/numFontSize)
	 	} else{$('#txtHeightid').val("")}


	 	var vopacity =$(curText).attr("style").indexOf("opacity")
		 	if(vopacity>-1) {
	 	 	var num = $(curText).css("opacity");
	 		setValue('#txtOpacityid',num)
	 	} else{$('#txtOpacityid').val("")}
	 	//border-radius
	 	
 		var borderradius =$(curText).parent().attr("style").indexOf("border-radius")
	 	if(borderradius>-1) {
 	 	var num = $(curText).parent().css("borderRadius").match(reg)[0];
 	 		setValue('#txtRadiusid',num)
	 	}else{$('#txtRadiusid').val("")}

	 	var fontFamily =$(curText).attr("style").indexOf("font-family")
	 	if(fontFamily>-1) {
	 		setTimeout(function(){
	 			var lista = $(curText).css("fontFamily");
		 	 	$("#fontFamilyid option").each(function(){
				    if( $(this).val() == lista ){
				      this.selected = true;
				      return false;
				    }
				});
	 		},100)
	 	}else{$('#fontFamilyid').val("")}


	 	var fontBlod =$(curText).attr("style").indexOf("font-weight")
	 	if(fontBlod>-1) {
       
	 		setTimeout(function(){
	 			$("#fontBlodId").addClass('fontItemActive')
	 		},100)
	 
	 	}else{$("#fontBlodId").removeClass('fontItemActive')}


	 	var textDecorationId =$(curText).attr("style").indexOf("text-decoration")
	 	if(textDecorationId>-1) {
       		setTimeout(function(){
	 			$("#textDecorationId").addClass('fontItemActive')
	 		},100)
	 	}else{$("#textDecorationId").removeClass('fontItemActive')}



	 	var fontItalicId =$(curText).attr("style").indexOf("font-style")
	 	if(fontItalicId>-1) {       
	 		setTimeout(function(){
	 			$("#fontItalicId").addClass('fontItemActive')
	 		},100)	 
	 	}else{$("#fontItalicId").removeClass('fontItemActive')}


	 	var fontAlign =$(curText).attr("style").indexOf("text-align")
	 	if(fontAlign>-1) {
	 		setTimeout(function(){
		 		$(".textAlign").removeClass('fontItemActive')
		 	    var pos = $(curText).css('textAlign');
		 	    // console.log(pos+":post")
		 		$(".textAlign"+pos+"Id").addClass('fontItemActive')	 
	 		},100)
	 	
	 	}else{$(".textAlign").removeClass('fontItemActive')}


	 	var animateId = $(curText).parent().attr('style').indexOf('animation-name');
	 	// console.log('animateId:'+animateId)
	 	if(animateId>-1) {
	 		setTimeout(function(){
		 		var animateName = $(curText).parent().css("animationName");
		 		// console.log('animateName:'+animateName)
		 	 	$("#animateTextId option").each(function(){
				    if( $(this).val() == animateName ){
				      this.selected = true;
				      return false;
				    }
				});

	 		},100)
	 	}else{$('#animateTextId').val("")}

	 	
			

	 	var animationDurationId =	$(curText).parent().attr("style").indexOf("animation-duration");
	 	if(animationDurationId>-1) {
	 	 	var animationDurationNum = $(curText).parent().css("animationDuration").match(reg)[0];
	 	 	// console.log("fontSize:"+animationDurationNum)
	 		$('#animationDurationId').val(animationDurationNum) 
	 	}else{$('#animationDurationId').val("") }  	



	 	var animationDelayId = $(curText).parent().attr("style").indexOf("animation-delay");
	 	if(animationDelayId>-1) {
	 	 	var animationDelayNum = $(curText).parent().css("animationDelay").match(reg)[0];
	 	 	// console.log("fontSize:"+animationDelayNum)
	 		$('#animationDelayId').val(animationDelayNum) 
	 	}else{$('#animationDelayId').val("") }  		
}


function setValue(elementId,value){
	var ele = elementId;
	var eleVal = value;
	setTimeout(function(){
		$(ele).val(eleVal)
	},100);
}

/*
*Description:
*****/

function initSelectedAndDraggable(){
	//$('.rotate-rightTop').on('mouseover',function(){ $(this).css('display','block');});
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


		$( ".isEdit >div" ).selectable();

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