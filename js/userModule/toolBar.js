var toolBar = angular.module('toolBar',['ngMaterial','editText','mainApp']);
toolBar.directive('toolbar1',function($mdToast,$mdDialog,$document,$rootScope,SERVER_URL,AuthService){
	return {
		restrict:"AE",
		templateUrl:"./template/toolBar.html",
		link:function($scope,$mdDialog,$rootScope){
			$scope.remove = function(){$(".ui-selected").remove();}

			$scope.previewPage = function(){
			    $("#pagesList").css('display','none');
				 $mdToast.show({
			      controller: function($scope,$mdDialog){
			        $scope.close = function(){
			        	$('#previewPageInEditStatus').css('display','none');
			        	$("#pagesList").css('display','block');
			        }
			      },
			      template:'<div id="previewPageInEditStatus" ng-cloak style="box-shadow: rgb(41, 41, 41) 0px 32px 35px;padding:0;max-height:100%;max-width:100%; min-height:568px;min-width:370px;"><a href="###" style="font-size: 10px;margin-right: 6px;text-align: right;float:right;font-size:24px;font-weight: bold;text-decoration: none;" ng-click="close()">&times;</a><div class="swiper-container" style="width:100%;height:568px;"><div class="swiper-wrapper" id="previewPage">'+$("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!").replace(/ui-selected/g,"")+'</div></div></div><script>$(document).ready(function(){var swiper = new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:true,direction:"vertical",effect:"slide"})})</script>',
			      parent : $document[0].querySelector('#editModulePosition'),
			      hideDelay: false
					      // position: $scope.getToastPosition()
				 });
			}
			$scope.userName='';
			$scope.savePage = function(){
				if($("#uName").html()=="欢迎,登陆"){
					 $mdToast.show({
				      controller: function($scope,$parse,$mdDialog,$rootScope,SERVER_URL){
	 					$scope.loginBtn = function(){
				  		    $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord}
			  		     	AuthService.login($scope.credentials).then(function(user){
		                            $("#uName").html(user);
									$("<a id='loginOut' style='margin-left:5px; font-size:12px; text-decoration:none;cursor:pointer'>退出</a>").insertAfter($("#uName"));
									$("#loginOverLay").css('display','none');
									saveProjectFn($mdToast,$document);
			  		     	},function(){
//			  		     		$rootScope.$broadcastAUTRH(AUTH_EVENTS.loginFailed);
			  		     	})
			  		    }
				      },
				      templateUrl:'./template/user.login.tmpl.html',
				      parent : $document[0].querySelector('#editModulePosition'),
				      hideDelay: false
				      // position: $scope.getToastPosition()
			});
			  			
			    }else{
				var pages=[];
 					pages.push($("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!"));
					var	pageObj = {"projectId":$rootScope.projectId,"pages":{"editCode":$("#pagesList").html(),"previewCode":$("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!")}};	
 							var aj = $.ajax( {  
						 	     url:SERVER_URL.liveUrl+'saveProject',// 跳转到 action  
						 	     data:pageObj,
							     type:'post',  
							     cache:false,  
							     dataType:'json',  
							     success:function(data) {  
							         if(data.status){
							         	$('.md-dialog-container').css('display','none');
				    				   	$("#addBox").show();
										setTimeout(function(){$("#addBox").fadeTo(3000).hide();	},1000);

							         }else{  
							             view(data.msg);  
							         }  
							      },  
							      error : function() {  
							      	console.log("error");
							           // view("异常！");  
							           alert("异常！");  
							      }  
							 });
			    }
			}



			//common function

			function saveProjectFn($mdToast,$document){
				$mdToast.show({
				  controller: function($scope,$mdDialog){
				  	$scope.savePageContentClose = function(){
   						$('.md-dialog-container').css('display','none');
		    			$("#addBox").show();
						setTimeout(function(){$("#addBox").fadeTo(3000).hide();	},1000);
				  	}
					$scope.savePageContent = function(){
						var projectName = $("#projectName").val();
						console.log(projectName+"/// projectName");
						var pages=[];
						
						pages.push($("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!"));
						
						var owner="peter";

						pageObj = {"projectName":projectName,"pages":{"editCode":$("#pagesList").html(),"previewCode":$("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!")},"owner":owner,"formLabel":[{'key':'labelname'},{'key':'labelname'}]};

						var aj = $.ajax( {  
						     url:SERVER_URL.liveUrl+'saveProject',// 跳转到 action  
						     data:pageObj,
						     type:'post',  
						     cache:false,  
						     dataType:'json',  
						     success:function(data) {  
						     	$("#pagesList").attr('class',data.project.id);
						     	$rootScope.projectStatus = data.status;
						     	$rootScope.projectId = data.project.id;


						     	if(data.status){
							       $('#saveProjectOverLay').css('display','none');
		    					   $("#addBox").show();
						        setTimeout(function(){$("#addBox").fadeTo(3000).hide();	},1000);
							    }else{  
							        view(data.msg);  
							    }   
						      },  
						      error : function() {  
						      	console.log("error");
						           // view("异常！");  
						           alert("异常！");  
						      }  
					 	});	
					}

				  },
				  templateUrl:'./template/page.save.tmpl.html',
				  parent : $document[0].querySelector('#editModulePosition'),
				   hideDelay: false
				});
			}
		}
	};
});