var editText = angular.module('editText',[]);

//init edit bar
editText.directive('edittool1',function($mdToast,$document){
	return {
		restrict:'AE',
		templateUrl:'./template/editbar.html',
		scope:{},
		link:function($scope){

			$scope.newText = function(){
                
                createNewText();
				
				$mdToast.show({
			      controller: function($scope){ 

			      	//init FontSize
			      	$scope.fontSize = [{"px":"6px"},{"px":"7px"},{"px":"8px"},{"px":"10px"},{"px":"12px"},{"px":"14px"},{"px":"16px"},{"px":"18px"},{"px":"20px"},{"px":"24px"}];
			      	//set  FonttSize
			      	$scope.getFontSize = function(fontSize){
					
    					$('#textSelected').css('fontSize',fontSize);
    					$('#fontSize').html(fontSize); 
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
		    			console.log('xxx');
		    			var anim = $('#js--animations').val()
					    testAnimation(anim);
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
			};

			$scope.newImages = function(){
				console.log('works');
				$mdToast.show({
			      controller: function($scope,$mdDialog){
 						

				    $mdDialog.show({
				      controller: function($scope){
					  console.log('image workssssss');
					  var selectedImage = [];
					   $scope.selectImage = function(target){
						   	console.log('image works'+target);
						   	selectedImage = [];
						   	selectedImage.push(target);
					    }

					   $scope.addImage = function(){
							  $('#imageSelected').attr('id','')
						      var oImage = $('<div data-type="image" data-link=""  id="imageSelected" style="position: absolute; top: 50%; left: 50%;  margin-left: -80px; margin-top: -120px; resize:both; overflow:hidden; min-width:300px; min-height:200px;"><img src="'+selectedImage[0]+'" style="width:100%;height:100%"><div>')
						      var currentPage = $('.swiper-slide-active');
						      oImage.appendTo(currentPage);
						 	  $('#imageSelected').draggable();
						      $('div.swiper-slide-active div').on('click',function(event){
						            event.stopPropagation();
						            $(this).focus();
						            $('div.swiper-slide-active div').attr('id','');
						            $(this).data('type') == 'image' ? $(this).attr('id','imageSelected'):'';
						            $(this).css('border','#dedede 1px dashed');
						      });
						      
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

				 //roate Image 
				 	$scope.setImageTransform = function(){
    					$('#textSelected').css('transform','rotate('+$scope.transform.numberValue+'deg)');
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
			      controller:function(){
			      	createInput();
			      },
			      templateUrl: './template/form.input.tmpl.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });	
			}



			$scope.newTextarea = function(){
				$mdToast.show({
			      controller:function(){
			      	createTextarea();
			      },
			      templateUrl: './template/form.textarea.tmpl.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });	
				
			}



			$scope.newCheckbox = function(){
				$mdToast.show({
			      controller:function(){
			      	createCheckBox();
			      },
			      templateUrl: './template/form.checkbox.tmpl.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });	
			}



			$scope.newRadiobox = function(){
				$mdToast.show({
			      controller:function(){
			      	createRadioBox();
			      },
			      templateUrl: './template/form.radiobox.tmpl.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });					
			}



			$scope.newButton = function(){

				$mdToast.show({
			      controller:function(){
			      	createButton();
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
					createNewForm();
					$mdToast.show({
					      controller: function($scope){

					      		//common function
					      		initFormDraggable();
							

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

				      			initFormDraggable();
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

function createNewText(){
	var textDiv = $("<div  id='textSelected' data-link='' data-type='text'  contentEditable='true' style=' position: absolute; top: 50%; left: 50%;  margin-left: -80px; margin-top: -120px; resize:both; overflow:hidden; min-width:100px; padding:5px;border:1px solid #000; min-height:40px;'></div>");
      var currentPage = $('.swiper-slide-active');
      textDiv.appendTo(currentPage);
      $('#textSelected').draggable({'position':'absolute'});
      $('.swiper-wrapper').attr('style','');
      $('div.swiper-slide-active div').on('click',function(event){
            console.log('text click');
            event.stopPropagation();
            $(this).focus();
            $('div.swiper-slide-active div').attr('id','');
            $('div.swiper-slide-active div').css({'border':'','resize':'','overflow':''});
            $(this).data('type') == 'text' ?$(this).attr('id','textSelected').css({'border':'#dedede 1px dashed','resize':'both','overflow':'hidden'}):'';
     });
}


function createNewForm(){
	var formDiv = $('<form id="formContent"></form>');
	//var formDefaultContent = $('<div class="form-group"><input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"></div><div class="form-group"><input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></div><div class="checkbox"><label><input type="checkbox"> Check me out</label></div>');
	var oDiv = $("<div id='myForm'></div>");
	//formDefaultContent.appendTo(formDiv)
	formDiv.appendTo(oDiv);
	var currentPage = $('.swiper-slide-active');
	oDiv.appendTo(currentPage);
	initFormDraggable();
}


function createInput(){
	var formInput=$('<div class="form-group ui-state-default"><input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"></div>');
	formInput.appendTo($('#formContent'));
	initFormDraggable();
}

function createTextarea(){
	var formTextarea=$('<div class="form-group ui-state-default"><textarea class="form-control" rows="3"></textarea></div>');
	formTextarea.appendTo($('#formContent'));
}

function createCheckBox(){
	var formCheckbox=$(' <div class="checkbox ui-state-default"><label><input type="checkbox"> Remember me</label></div>');
	formCheckbox.appendTo($('#formContent'));
}

function createRadioBox(){
	var formRadioBox = $('<div class="radio ui-state-default"><label><input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked><span>text placeholder</span></label></div>');
	formRadioBox.appendTo($('#formContent'));
}

function createButton(){
	var formButton = $('<div class="form-group ui-state-default"><button type="button" class="btn btn-info"><span>text placeholder</span></button></div>');
	formButton.appendTo($('#formContent'));
}
//Text property

//

function initFormDraggable(){
	$(".form-group >input").on('click',function(){
		console.log('click works'+$('#selectedFormItem').length );
		if($('#selectedFormItem').length >0){
			$('#selectedFormItem').removeAttr('style');
			$('#selectedFormItem').removeAttr('id');
		}
		$(this).parent().attr('id','selectedFormItem');
		$(this).parent().css({'border':'#dedede 3px dashed','overflow':'hidden'});

	// 	 $('#formContent').sortable({
	//     	revert: true,
	//     	 placeholder: "ui-state-highlight"
	// 		});

	// $( "#selectedFormItem" ).draggable({
 //      connectToSortable: "#formContent",
 //      // helper: "clone",
 //      revert: "invalid"
 //    });

       $('#formContent').sortable().disableSelection();

       $('#selectedFormItem').draggable({
       	 accpet:"#formContent > #selectedFormItem",
       	 hoverClass:"ui-state-hover",
       	 drop:function(event,ui){
       	 	ui.draggable.hide('slow',function(){
       	 		$(this).appendTo($("#formContent")).show('slow');
       	 	});
       	 }
       });
	});
  
    // $( "ul, li" ).disableSelection();


	 
		// $('#myForm').draggable({'position':'absolute'});
		$("#myForm").css({'resize':'both','overflow':'hidden','width':'80%','min-height':'350px','padding':'2%'});
	    $('#myForm').on("mouseover",function(){
	    	$(this).css('opacity','0.5');
	    })
	    $('#myForm').on("mouseout",function(){
	    	$(this).css('opacity','1');
	    })

}