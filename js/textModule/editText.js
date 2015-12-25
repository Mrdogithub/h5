var editText = angular.module('editText',[]);

//init edit bar
editText.directive('edittool1',function($mdToast,$document){
	return {
		restrict:'AE',
		templateUrl:'./template/editbar.html',
		scope:{},
		link:function($scope){
			$scope.newText = function(){
            console.log('works...');
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

			$scope.newImage = function(){
				$mdToast.show({
			      controller: function($scope,$mdDialog){

			      //Add image
			      $scope.showAddImage = function(ev) {
			      	console.log('works');
				    $mdDialog.show({
				      controller: DialogController,
				      templateUrl: './template/addImage.tmpl.html',
				      parent: angular.element(document.body),
				      targetEvent: ev,
				      clickOutsideToClose:true
				    }).then(function(answer) {
				          $scope.status = 'You said the information was "' + answer + '".';
				        }, function() {
				          $scope.status = 'You cancelled the dialog.';
				        });
				  };

				 //roate Image 
				 	$scope.setImageTransform = function(){
    					$('#textSelected').css('transform','rotate('+$scope.transform.numberValue+'deg)');
    				}


			      },
			      templateUrl: './template/ImagePropertyPanel.html',
			      parent : $document[0].querySelector('#editModulePosition'),
			       hideDelay: false
			      // position: $scope.getToastPosition()
			    });



			    function DialogController($scope, $mdDialog) {
				  $scope.selectImage = function(target){
				    console.log(target);
				    $('#imageSelected').attr('id','')
				    var oImage = $('<div data-type="image"  id="imageSelected" style="position: absolute; top: 50%; left: 50%;  margin-left: -80px; margin-top: -120px; resize:both; overflow:hidden; min-width:300px; min-height:200px;"><img src="./images/'+target+'" style="width:100%;height:100%"><div>')

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
				  }
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
			
			$scope.newForm = function(){
				console.log($('#formContent').is(":empty")+"/////");
				if($('#formContent').length == 0){
					createNewForm();
					$mdToast.show({
					      controller: function($scope){},
					      templateUrl: './template/formPropertyPanel.html',
					      parent : $document[0].querySelector('#editModulePosition'),
					       hideDelay: false
					      // position: $scope.getToastPosition()
			    	});
				}else{
					$mdToast.show({
				      controller: function($scope){},
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
	var textDiv = $("<div  id='textSelected' data-type='text'  contentEditable='true' style=' position: absolute; top: 50%; left: 50%;  margin-left: -80px; margin-top: -120px; resize:both; overflow:hidden; min-width:100px; padding:5px;border:1px solid #000; min-height:40px;'></div>");
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
	var formDiv = $('<form id="formContent"><div class="form-group"><input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"></div><div class="form-group"><input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></div><div class="checkbox"><label><input type="checkbox"> Check me out</label></div><button type="submit" class="btn btn-default">Submit</button></form>');
	var oDiv = $("<div id='myForm'></div>");
	formDiv.appendTo(oDiv);
	var currentPage = $('.swiper-slide-active');
	oDiv.appendTo(currentPage);
	$('#myForm').draggable({'position':'absolute'});
	$("#myForm").css({'border':'#dedede 1px dashed','resize':'both','overflow':'hidden','width':'80%','min-height':'350px','padding':'2%'});

	//edit the selected item
	$(".form-group >input").on('click',function(){
		console.log('click works'+$('#selectedFormItem').length );
		if($('#selectedFormItem').length >0){
			$('#selectedFormItem').removeAttr('style');
			$('#selectedFormItem').removeAttr('id');
		}
		$(this).parent().attr('id','selectedFormItem');
		$(this).parent().css({'border':'#dedede 3px dashed','overflow':'hidden'});
	});
}

//Text property

//