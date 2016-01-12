var editText = angular.module('editText',['toolBar']);
     
editText.directive('pageleft',function($mdToast,$document){
	return{
		restrict:"AE",
		templateUrl:"./template/page.left.tmpl.html",
		scope:{},
		link:function($scope){
            var indexArray=10;
			$scope.createNewPage = function(){
				//第一个页面必须有 swiper-slide-active
			    $('.swiper-slide').hasClass('isEdit')?$('.swiper-slide').removeClass('isEdit').css("display","none"):'';
				var newSlide = $('<div class="swiper-slide isEdit"></div>');
				$(".isEdit").css('display','block');
                newSlide.appendTo($('#pagesList'));
                showBackgroundEditPanel($mdToast,$document);
			}
		}
	}
});


//init edit bar
editText.directive('edittool1',function($mdToast,$document,$rootScope){
	return {
		restrict:'AE',
		templateUrl:'./template/editbar.html',
		scope:{},
		link:function($scope){
			$scope.userLogin = function(){
				$("#pagesList").css('display','none');
				$mdToast.show({
				      controller: function($scope,$mdDialog,$rootScope){
				      	$scope.loginBtn = function(){
				    
				      		var userInfo = {"username":$scope.user.firstName,"password":$scope.user.passWord}
			  				var aj = $.ajax( {  
					 	     url:'http://9.112.71.102:3000/login',// 跳转到 action
					  	     data:userInfo,
					 		 type:'post',  
						     cache:false,  
					 	     dataType:'json',  
					 		 success:function(data) {  
			      		     
			      			 $("#uName").html(data.userName);
			      			 $("<span class='userImage'><img id='uImage' src='"+data.userPhoto+"'/></span>").prependTo($("#userProfile"));
				 	         $("#userLogin").remove();
				 	         $("#pagesList").css('display','block');


				 	         console.log("$rootScope.userStatus = true;"+$rootScope.userStatus);
				 	         $rootScope.userStatus = true;
				 		      },  
				 		      error : function() {  
					 		      	console.log("error");
				 			           // view("异常！");  
					 		           alert("异常！");  
				 	      		}  
				 		 	});
				 		 }
				      },
				      templateUrl:'./template/user.login.tmpl.html',
				      parent : $document[0].querySelector('#editModulePosition'),
				      hideDelay: false
				      // position: $scope.getToastPosition()
				    });




	 			
			}
			$scope.newText = function(){
                createNewText($mdToast,$document);
				showTextEditPanel($mdToast,$document);
				var editPanelIsShow = true;
				initText($mdToast,$document,editPanelIsShow);
			};

			$scope.newImages = function(){
				console.log('works');
				 console.log(+"loadingImagesFromServer()");
				showImageEditPanel($mdToast,$document);
				initImage($mdToast,$document);
			};

			$scope.newGraph = function(){
				$mdToast.show({
			      // controller: 'ToastCtrl',
			      templateUrl: './template/graphPropertyPanel.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });
			};



			$scope.newInput = function(){
				$mdToast.show({
			      controller:function($mdToast,$document){
			      	createInput($mdToast,$document);
			      		 
			      },
			      templateUrl: './template/form.input.tmpl.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });	
			}



			$scope.newTextarea = function(){
				$mdToast.show({
			      controller:function($mdToast,$document){
			      	createTextarea($mdToast,$document);
			      },
			      templateUrl: './template/form.textarea.tmpl.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });	
				
			}



			$scope.newCheckbox = function(){
				$mdToast.show({
			      controller:function($mdToast,$document){
			      	createCheckBox($mdToast,$document);
			      },
			      templateUrl: './template/form.checkbox.tmpl.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });	
			}



			$scope.newRadiobox = function(){
				$mdToast.show({
			      controller:function($mdToast,$document){
			      	createRadioBox($mdToast,$document);
			      },
			      templateUrl: './template/form.radiobox.tmpl.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });					
			}



			$scope.newButton = function(){

				$mdToast.show({
			      controller:function($mdToast,$document,$rootScope){
			      	createButton($mdToast,$document,$rootScope);
			      },
			      templateUrl: './template/form.button.tmpl.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });		
			}




			$scope.newForm = function(){
				console.log($('#formContent').is(":empty")+"/////");
				if($('#formContent').length == 0){
					createNewForm($mdToast,$document);
					$mdToast.show({
					      controller: function($scope){

					      		//common function
					      		initFormDraggable($mdToast,$document);
							

						  		$scope.$watch("setFormBackgroundColor",function(newValue,oldColor){
									$('#myForm').css('backgroundColor',newValue);	
								});

		    					//set form Radius 
			    				$scope.setFormRadiusSize   = function(){
			    					console.log('image radius size works');
			    					$("#myForm").css("borderRadius",$scope.formRadius.size+"px");
			    				}



			    				//set form border
			    				$scope.setFormBorderWidthSize = function(){
    								$('#myForm').css('borderWidth',$scope.formBorderWidth.size+"px");
    							}


    							//set form border style
    							$scope.formBorderStyle = [{"formBorderStyle":"none"},{"formBorderStyle":"solid"},{"formBorderStyle":"dotted"},{"formBorderStyle":"double"},{"formBorderStyle":"dashed"}];
			    				//set FontFamily
			    				$scope.setFormBorderStyle = function(newStyle){
			    					console.log('set form style works'+newStyle);
			    					// $('#myForm').css('border','"1px red '+newStyle+'"');
			    					$('#myForm').css('border','1px #eeeeee '+newStyle);
			    					$('#formBorderStyle').html(newStyle);
			    				}



			    				//set form border color
			    				$scope.$watch("setFormBorderColor",function(newColor,oldColor){
			    					$('#myForm').css('borderColor',newColor);
			    				});

    							

    							//set form animate
			    				$scope.formAnimate = function(){
			    					console.log('form works');
			    					function testAnimation(x){
									    $('#myForm').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									      // $(this).removeClass();
									    });
									  }
									  $('#js--formAnimations').change(function(){
									    var anim = $(this).val()
									    testAnimation(anim);
									  }); 
			    				}
					      },
					      templateUrl: './template/formPropertyPanel.html',
					      parent : $document[0].querySelector('#editModulePosition'),
					       hideDelay: false
					      // position: $scope.getToastPosition()
			    	});
				}else{
					$mdToast.show({
				      controller: function($scope){

				      			initFormDraggable($mdToast,$document);
				      			$scope.$watch("setFormBackgroundColor",function(newValue,oldColor){
		    						$('#myForm').css('backgroundColor',newValue);	
		    					});


		    					//set form Radius 
			    				$scope.setFormRadiusSize   = function(){
			    					console.log('image radius size works');
			    					$("#myForm").css("borderRadius",$scope.formRadius.size+"px");
			    				}



			    				//set form border
			    				$scope.setFormBorderWidthSize = function(){
    								$('#myForm').css('borderWidth',$scope.formBorderWidth.size+"px");
    							}


    							//set form border style
    							$scope.formBorderStyle = [{"formBorderStyle":"none"},{"formBorderStyle":"solid"},{"formBorderStyle":"dotted"},{"formBorderStyle":"double"},{"formBorderStyle":"dashed"}];
			    				//set FontFamily
			    				$scope.setFormBorderStyle = function(newStyle){
			    					console.log('set form style works'+newStyle);
			    					// $('#myForm').css('border','"1px red '+newStyle+'"');
			    					$('#myForm').css('border','1px #eeeeee '+newStyle);
			    					$('#formBorderStyle').html(newStyle);
			    				}



			    				//set form border color
			    				$scope.$watch("setFormBorderColor",function(newColor,oldColor){
			    					$('#myForm').css('borderColor',newColor);
			    				});

    							

    							//set form animate
			    				$scope.formAnimate = function(){
			    					console.log('form works');
			    					function testAnimation(x){
									    $('#myForm').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									      // $(this).removeClass();
									    });
									  }
									  $('#js--formAnimations').change(function(){
									    var anim = $(this).val()
									    testAnimation(anim);
									  }); 
			    				}
				      },
				      templateUrl: './template/formPropertyPanel.html',
				      parent : $document[0].querySelector('#editModulePosition'),
				       hideDelay: false
				      // position: $scope.getToastPosition()
			    		});
			   }};

		}
	}
})





//Create new text
function createNewText($mdToast,$document){
	var textDiv = $("<div  id='textSelected' data-cssJson='' data-link='' data-type='text'  contentEditable='true' style=' position: absolute; top: 50%; left: 50%;  margin-left: -80px; margin-top: -120px;overflow:hidden; min-width:100px; padding:5px;min-height:40px;'>Text Placeholder</div>");
    var currentPage = $('.isEdit');
    textDiv.appendTo(currentPage);
}

//initText
function initText($mdToast,$document,editPanelIsShow){
	  $('div.isEdit div').on('click',function(event){
            event.stopPropagation();            
            $('#textSelected').attr('id','');
            if($(this).data('type') == 'text'){
            	$(".isEdit").css("border","");
            	$("#imageSelected").css("border","");
            	$('div.isEdit div').css({'border':'','resize':'','overflow':''});
            	$(this).attr('id','textSelected').css({'border':'#dedede 2px dashed','resize':'','overflow':'hidden'});
            	$(this).focus();
            	$('#textSelected').draggable({'position':'absolute'});
            	editPanelIsShow? "" :showTextEditPanel($mdToast,$document);
            }else if($(this).data('type') =='image'){
            	//initImage($mdToast,$document);
            }
     });
}



//initImage
function initImage($mdToast,$document){
	  $('div.isEdit div').on('click',function(event){
	  	console.log('image works ----------------------')
            event.stopPropagation();            
           if($(this).data("type") == "image"){
           		$(".isEdit").css("border","");
           	    $("#textSelected").css("border","");   
           	    $('#imageSelected').css("border","");
        		$('div.isEdit div').css('border','');
        		
        		$('#imageSelected').attr('id','');
        		$(this).find('img').attr('id','imageSelected').css('border','#dedede 2px dashed');
        		$('#imageSelected').draggable({'position':'absolute'});
        		showImageEditPanelOnly($mdToast,$document);
           }
           
         
     });
}

function createNewForm($mdToast,$document){
	var formDiv = $('<form id="formContent"></form>');
	//var formDefaultContent = $('<div class="form-group"><input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"></div><div class="form-group"><input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></div><div class="checkbox"><label><input type="checkbox"> Check me out</label></div>');
	var oDiv = $("<div id='myForm'></div>");
	//formDefaultContent.appendTo(formDiv)
	formDiv.appendTo(oDiv);
	oDiv.appendTo($('.isEdit'));
	initFormDraggable($mdToast,$document);
}


function createInput($mdToast,$document){
	// var inputName = 
	var formInput=$('<div class="form-group ui-state-default" data-type="input"><input type="text"  name="text1" class="form-control"  placeholder="textPlaceholder"></div>');
	formInput.appendTo($('#formContent'));
	initFormDraggable($mdToast,$document);
}

function createTextarea(){
	var formTextarea=$('<div class="form-group ui-state-default" data-type="textarea" ><textarea class="form-control" rows="3"></textarea></div>');
	formTextarea.appendTo($('#formContent'));
}

function createCheckBox(){
	var formCheckbox=$(' <div class="checkbox ui-state-default"  data-type="checkbox"><label><input type="checkbox"> Remember me</label></div>');
	formCheckbox.appendTo($('#formContent'));
}

function createRadioBox(){
	var formRadioBox = $('<div class="radio ui-state-default" data-type="radio" ><label><input type="radio"  checked><span>text placeholder</span></label></div>');
	formRadioBox.appendTo($('#formContent'));
}

function createButton($rootScope){
	var projectIdForMyForm = $('#pagesList').attr('class') == ''? 'projectIdIsActive' : $('#pagesList').attr('class');
	var formButton = $('<div class="form-group ui-state-default" data-type="input"><input id="projectId" type="hidden"  name="projectId" value="'+projectIdForMyForm+'" class="form-control"  placeholder="textPlaceholder"></div>'+'<div class="form-group ui-state-default"  data-type="button"><button type="button" class="btn btn-info" id="formSubmit"><span>text placeholder</span></button></div>');
	formButton.appendTo($('#formContent'));
}
//Text property

//



var showTextEditPanel = function($mdToast,$document)	{
				$mdToast.show({
			      controller: function($scope){ 
			      	setFontSize();
			      	//init FontSize
			      	$scope.fontSize = [{"px":"6px"},{"px":"7px"},{"px":"8px"},{"px":"10px"},{"px":"12px"},{"px":"14px"},{"px":"16px"},{"px":"18px"},{"px":"20px"},{"px":"24px"}];
			      	//get  FonttSize
			      	$scope.getFontSize = function(fontSize){
    					$('#textSelected').css('fontSize',fontSize);
    					$('#fontSize').html(fontSize); 
    				}
    				function setFontSize(){
    					
            		$('#fontSize').html($("#textSelected").css('fontSize'));
						    				

    				}

    				//init FontFamily
    				$scope.fontFamily = [{"fontFamily":"黑体"},{"fontFamily":"微软雅黑"},{"fontFamily":"宋体"}];
    				//set FontFamily
    				$scope.setFontFamily = function(newFont){
    					$('#textSelected').css('fontFamily','"'+newFont+'"');
    					$('#fontFamily').html(newFont);
    				}

    				//set FontColor
    				$scope.$watch("setFontColor",function(newColor,oldColor){
    					$('#textSelected').css('color',newColor);
    				});

    				//init line height
    				$scope.lineHeight = [{"lineHeight":"1"},{"lineHeight":"1.15"},{"lineHeight":"1.5"},{"lineHeight":"2"},{"lineHeight":"2.5"},{"lineHeight":"3"}];
    				//set line height
    				$scope.setLineHeight = function(){
    					$('#textSelected').css('lineHeight',$scope.selected.lineHeight*100+"%");
    				}

    				//setFontBold
    				$scope.setFontBold = function(){
    					if($("#textSelected").css("fontWeight") != "bold"){
    						$("#textSelected").css("fontWeight","bold");
    						$(".bold-active").css("background","#eeeeee");
    					}else if($("#textSelected").css("fontWeight") == "bold"){
    						$("#textSelected").css("fontWeight","");
    						$(".bold-active").css("background","");
    					}
    				};

    				//set Italic
    				$scope.setFontItalic = function(){
    					if($("#textSelected").css("fontStyle") != "italic"){
    						$("#textSelected").css("fontStyle","italic");
    						$(".italic-active").css("background","#eeeeee");
    					}else if($("#textSelected").css("fontStyle") == "italic"){
    						$("#textSelected").css("fontStyle","");
    						$(".italic-active").css("background","");
    					}
    				}
    				
    				//set Text Decoration
    				$scope.setTextDecoration = function(){
    					if($("#textSelected").css("textDecoration") != "underline"){
    						$("#textSelected").css("textDecoration","underline");
    						$(".textDecoration-active").css("background","#eeeeee");
    					}else if($("#textSelected").css("textDecoration") == "underline"){
    						$("#textSelected").css("textDecoration","");
    						$(".textDecoration-active").css("background","");
    					}
    				}

    				//set TextAlignLeft
    				$scope.setTextAlign = function(textPos){
    					if($("#textSelected").css("textAlign") != textPos){
    						$("#textSelected").css("textAlign",textPos);
    						$(".text"+textPos+"-active").css("background","#eeeeee");
    					}else if($("#textSelected").css("textAlign") == textPos){
    						$("#textSelected").css("textAlign","");
    						$(".text"+textPos+"-active").css("background","");
    					}
    				}

    				//set Radius 
    				$scope.setRadiusSize   = function(){
    					$("#textSelected").css("borderRadius",$scope.radius.size+"px");
    				}

    				//set FontBackgroundColor
    				$scope.$watch("setFontBackgroundColor",function(newValue,oldValue){
    					$("#textSelected").css("backgroundColor",newValue);
    				});

    				//set FontOpacity
    				$scope.setFontOpacity  = function(){
    					$("#textSelected").css("opacity",$scope.opacity.numberValue);
    				};

    				//set setFontTransform
    				$scope.setFontTransform = function(){
    					$('#textSelected').css('transform','rotate('+$scope.transform.numberValue+'deg)');
    				}

    				//init border style
		    		$scope.borderStyle = [{"borderStyle":"none"},{"borderStyle":"dotted"},{"borderStyle":"dashed"},{"borderStyle":"solid"},{"borderStyle":"double"},{"borderStyle":"groove"},{"borderStyle":"ridge"},{"borderStyle":"inset"},{"borderStyle":"outset"},{"borderStyle":"inherit"}]
		    		//set  border style
		    		$scope.setBorderStyle = function(){
		    			$('#textSelected').css('borderStyle',$scope.selected.borderStyle);	
		    		};
		    		
		    		//set font link
		    		$scope.$watch("setFontLink",function(newValue,oldValue){
						$("#textSelected").attr("data-link",newValue);		    			
		    		})

		    		//set border color
		    		$scope.$watch("setBorderColor",function(newValue,oldColor){
		    			$('#textSelected').css('borderColor',newValue);	
		    		});

		    		//text animate
		    		$scope.textAnimate = function(){
					    testAnimation($scope.selected);
		    		 function testAnimation(x){
					    $('#textSelected').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					      // $(this).removeClass();
					    });
					  }
		    		}
		    		
		    		//text link
		    		$scope.setTextLink = function(){
		    			if($("#linkValue").val() !=''){
		    				
		    			}
		    		}
    			},
			      templateUrl: './template/fontPropertyPanel.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			      hideDelay: false
			      // position: $scope.getToastPosition()
			    });
			}//end of showTextEditPanel function


function initSelectedStyleToJson(jsonObj,propertyName,propertyValue){
	for(var i in jsonObj){
		console.log(i+"////////////");
	}		
}



function initFormDraggable($mdToast,$document){
	
	$('#formContent div').on('click',function(event){
         event.stopPropagation();  
        $(".isEdit").css("border","");
        $("#imageSelected").css("border","");
        $("#textSelected").css("border","");              
        $('#selectedFormItem').attr('id','');
        $(this).attr('id','selectedFormItem');
        $(this).css({'border':'#dedede 2px dashed','overflow':'hidden'});

       var theTypeOfSelectedItem = $(this).data('type');
       console.log(theTypeOfSelectedItem+"///"+$(this).attr('type'));
       switch(theTypeOfSelectedItem){
            case "input" :  showInputEditPanel($mdToast,$document);
            break;
            case "textarea": showTextareaEditPanel($mdToast,$document);
            break;
            case "radio":    showRadioEditPanel($mdToast,$document);
            break;
            case "checkbox": showCheckboxEditPanel($mdToast,$document);
            break;
            case "button":   showButtonEditPanel($mdToast,$document);
            break;
       }

	});


	$('#myForm').draggable({'position':'absolute'});
	$("#myForm").css({'resize':'both','overflow':'hidden','width':'80%','min-height':'350px','padding':'2%'});
    $('#myForm').on("mouseover",function(){
    	$(this).css('opacity','0.5');
    })
    $('#myForm').on("mouseout",function(){
    	$(this).css('opacity','1');
    })

}



//loading Images from Server

function loadingImagesFromServer(){
	console.log('loading images works');
	$.ajax({
	    url: 'http://9.112.71.102:3000/findImageByUser',
	    type: 'GET',
	    cache: false,
	    // data:new FormData($('#uploadImageForm')[0]),
	    processData: false,
	    contentType: 	false
	}).done(function(res) {
		console.log('works'+res)
		//var oLi = $('<li class="myImg"><img src="./images/1.jpg" ng-click="selectImage('./images/1.jpg')"></li>');
		console.log(res.length+"////");
		
		for(var i=0;i<res.length;i++){
			$('<li class="myImg"><img class="myImageActive" src="'+res[i].url+'" ng-click="selectImage('+res[i].url+')"></li>').appendTo($("#imageList"));
			//console.log(res[i].url+"/// image ")
		}
	}).fail(function(res) {
		console.log('fail');
	});
	
}



// show input edit panel if input active
function showInputEditPanel($mdToast,$document){
		$mdToast.show({
	      controller:function(){
	      	//createInput();
	      	if($('#selectedFormItem').length >0){
			$('#selectedFormItem').removeAttr('style');
			$('#selectedFormItem').removeAttr('id');
		}
		$(this).parent().attr('id','selectedFormItem');
		$(this).parent().css({'border':'#dedede 3px dashed','overflow':'hidden'});

 
	    $(function() {
		    $( "#formContent" ).sortable({
		      revert: true
		    });
		});

	      },
	      templateUrl: './template/form.input.tmpl.html',
	      parent : $document[0].querySelector('#editModulePosition'),
	       hideDelay: false
	      // position: $scope.getToastPosition()
		});	
}

// show textarea edit panel if textarea active
function showTextareaEditPanel($mdToast,$document){
		$mdToast.show({
	      controller:function(){
	      	//createInput();
	      	if($('#selectedFormItem').length >0){
			$('#selectedFormItem').removeAttr('style');
			$('#selectedFormItem').removeAttr('id');
		}
		$(this).parent().attr('id','selectedFormItem');
		$(this).parent().css({'border':'#dedede 3px dashed','overflow':'hidden'});

 
	    $(function() {
		    $( "#formContent" ).sortable({
		      revert: true
		    });
		});

	      },
	      templateUrl: './template/form.textarea.tmpl.html',
	      parent : $document[0].querySelector('#editModulePosition'),
	       hideDelay: false
	      // position: $scope.getToastPosition()
		});	
}

// show button edit panel if button active
function showButtonEditPanel($mdToast,$document){
		$mdToast.show({
	      controller:function(){
	      	//createInput();
	      	if($('#selectedFormItem').length >0){
			$('#selectedFormItem').removeAttr('style');
			$('#selectedFormItem').removeAttr('id');
		}
		$(this).parent().attr('id','selectedFormItem');
		$(this).parent().css({'border':'#dedede 3px dashed','overflow':'hidden'});

 
	    $(function() {
		    $( "#formContent" ).sortable({
		      revert: true
		    });
		});

	      },
	      templateUrl: './template/form.button.tmpl.html',
	      parent : $document[0].querySelector('#editModulePosition'),
	       hideDelay: false
	      // position: $scope.getToastPosition()
		});	
}

// show checkbox edit panel if checkbox active
function showCheckboxEditPanel($mdToast,$document){
		$mdToast.show({
	      controller:function(){
	      	//createInput();
	      	if($('#selectedFormItem').length >0){
			$('#selectedFormItem').removeAttr('style');
			$('#selectedFormItem').removeAttr('id');
		}
		$(this).parent().attr('id','selectedFormItem');
		$(this).parent().css({'border':'#dedede 3px dashed','overflow':'hidden'});

 
	    $(function() {
		    $( "#formContent" ).sortable({
		      revert: true
		    });
		});

	      },
	      templateUrl: './template/form.checkbox.tmpl.html',
	      parent : $document[0].querySelector('#editModulePosition'),
	       hideDelay: false
	      // position: $scope.getToastPosition()
		});	
}


// show radiobox edit panel if radiobox active
function showRadioEditPanel($mdToast,$document){
		$mdToast.show({
	      controller:function(){
	      	//createInput();
	      	if($('#selectedFormItem').length >0){
			$('#selectedFormItem').removeAttr('style');
			$('#selectedFormItem').removeAttr('id');
		}
		$(this).parent().attr('id','selectedFormItem');
		$(this).parent().css({'border':'#dedede 3px dashed','overflow':'hidden'});

 
	    $(function() {
		    $( "#formContent" ).sortable({
		      revert: true
		    });
		});

	      },
	      templateUrl: './template/form.radiobox.tmpl.html',
	      parent : $document[0].querySelector('#editModulePosition'),
	       hideDelay: false
	      // position: $scope.getToastPosition()
		});	
}

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



function showImageEditPanel($mdToast,$document){
	$mdToast.show({
			      controller: function($scope,$mdDialog){
 						
			      	loadingImagesFromServer();
				    $mdDialog.show({
				      controller: function($scope){
					  var selectedImage = [];

					   $(document).on("click",".myImageActive",function(){
					   		  $(".myImageActive").attr('style','');
					   		  $(this).css({"border":"1px solid #eeeeee","borderRadius":"2px"});
					   	 	  selectedImage = [];
						      selectedImage.push($(this).attr('src'));
					   });
					   $scope.selectImage = function(target){
						   	console.log('select image works'+target);
						  
					    }
					
					   $scope.addImage = function(){
					   	      
							  $('#imageSelected').attr('id','')
						      var oImage = $('<div data-type="image" data-link=""  id="imageSelected"><img src="'+selectedImage[0]+'" style="position: absolute;resize:none; top: 50%; left: 50%;  margin-left: -80px; margin-top: -120px; overflow:hidden; min-width:300px; min-height:200px;width:100%;height:100%"><div>')
						      var currentPage = $('.isEdit');
						      oImage.appendTo(currentPage);
						 	  $('#imageSelected').draggable();
						      initImage($mdToast,$document);
						      
						      $("#imgpop").animate({left:"-99999px"},200);
						      	$('.md-dialog-backdrop').remove();
								$('.md-scroll-mask').remove();
								$('.md-scroll-mask-bar').remove();
								$('.md-dialog-container').remove();
					   }
				      },
				      templateUrl: './template/addImage.tmpl.html',
			          parent: $document[0].querySelector('#main')
			    });


				 	$scope.setImageWidthSize = function(){
						$('#imageSelected > img').css({'width':$scope.imageWidth.size+'px','height':'auto'});
			      	}

    		    //roate Image 
				 	$scope.setImageTransform = function(){
				 		console.log('image transform works');
    					$('#imageSelected').css('transform','rotate('+$scope.transform.numberValue+'deg)');
    				}
    			  $scope.getImageOpacity = function(){
      					$('#imageSelected').css('opacity',$scope.opacity.numberValue);
  					}

				
				//set image Radius 
    				$scope.setImageRadiusSize   = function(){
    					console.log('image radius size works');
    					$("#imageSelected >img").css("borderRadius",$scope.imageRadius.size+"px");
    				}
				//set image animate
				   $scope.setImageAnimate = function(){
				   	  	 function testAnimation(x){
						    $('#imageSelected > img').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						      // $(this).removeClass();
						    });
						  }
						  $('#js--imageAnimations').change(function(){
						    var anim = $(this).val()
						    testAnimation(anim);
						  }); 
				   }
				   
				   //set image opacity
				     $scope.getImageOpacity = function(){
					      $('#imageSelected').css('opacity',$scope.opacity.numberValue);
					  }

			      },
			      templateUrl: './template/imagePropertyPanel.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });



			    function DialogController($scope, $mdDialog) {
				
				  $scope.hide = function() {
				    $mdDialog.hide();
				  };
				  $scope.cancel = function() {
				    $mdDialog.cancel();
				  };
				  $scope.answer = function(answer) {
				    $mdDialog.hide(answer);
				  };
				}

}


//show image edit only
function showImageEditPanelOnly($mdToast,$document){
	$mdToast.show({
			      controller: function($scope,$mdDialog){
 						
			      	$scope.setImageWidthSize = function(){
						$('#imageSelected > img').css({'width':$scope.imageWidth.size+'px','height':'auto'});
			      	}

    		    //roate Image 
				 	$scope.setImageTransform = function(){
				 		console.log('image transform works');
    					$('#imageSelected').css('transform','rotate('+$scope.transform.numberValue+'deg)');
    				}
    			  $scope.getImageOpacity = function(){
      					$('#imageSelected').css('opacity',$scope.opacity.numberValue);
  					}

				
				//set image Radius 
    				$scope.setImageRadiusSize   = function(){
    					console.log('image radius size works');
    					$("#imageSelected").css("borderRadius",$scope.imageRadius.size+"px");
    				}
				//set image animate
				   $scope.setImageAnimate = function(){
				   	  	 function testAnimation(x){
						    $('#imageSelected > img').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						      // $(this).removeClass();
						    });
						  }
						  $('#js--imageAnimations').change(function(){
						    var anim = $(this).val()
						    testAnimation(anim);
						  }); 
				   }
				   
				   //set image opacity
				     $scope.getImageOpacity = function(){
					      $('#imageSelected').css('opacity',$scope.opacity.numberValue);
					  }

			      },
			      templateUrl: './template/imagePropertyPanel.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });


}