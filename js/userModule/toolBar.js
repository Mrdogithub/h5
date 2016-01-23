var toolBar = angular.module('toolBar',['ngMaterial','editText']);
toolBar.directive('toolbar1',function($mdToast,$mdDialog,$document,$rootScope){
	return {
		restrict:"AE",
		templateUrl:"./template/toolBar.html",
		scope:{},
		link:function($scope,$mdDialog){
			$scope.remove = function(){
				$(".ui-selected").remove();
			}

			$scope.previewPage = function(){
			    $("#pagesList").css('display','none');
			    
				 $mdToast.show({
					      controller: function($scope,$mdDialog){
					         console.log('show preview page works');
					        $scope.close = function(){
					        	$('#previewPageInEditStatus').css('display','none');
					        	$("#pagesList").css('display','block');
					        }
					     ;
					      },
					       template:'<div id="previewPageInEditStatus" ng-cloak style="    box-shadow: rgb(41, 41, 41) 0px 32px 35px;padding:0;max-height:100%;max-width:100%; min-height:568px;min-width:370px;"><a href="###" style="font-size: 10px;margin-right: 6px;text-align: right;float:right;font-size:24px;font-weight: bold;text-decoration: none;" ng-click="close()">&times;</a><div class="swiper-container" style="width:100%;height:568px;"><div class="swiper-wrapper" id="previewPage">'+$("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!")+'</div></div></div><script>$(document).ready(function(){var swiper = new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:true,direction:"vertical",effect:"slide"})})</script>',
					      parent : $document[0].querySelector('#editModulePosition'),
					      hideDelay: false
					      // position: $scope.getToastPosition()
				 });
			}
			$scope.savePage = function(){
				if(!$rootScope.userStatus){
					 $mdToast.show({
				      controller: function($scope,$mdDialog){
	 					$scope.loginBtn = function(){
	 					var userInfo = {"username":$scope.user.firstName,"password":$scope.user.passWord}
	 					console.log(userInfo.username+"|||" +userInfo.password)
			  			var aj = $.ajax( {  
					 	     url:'http://9.115.24.168:3000/login',// 跳转到 action
					  	     data:userInfo,
					 		 type:'post',  
						     cache:false,  
					 	     dataType:'json',  
					 		 success:function(data) {  
			      		     console.log(data.userPhoto+"||"+data.userName);
			      			 $("#uImage").attr("src",data.userPhoto);
			      			 $("#uName").html(data.userName);
				 	         
				 	         $("#userLogin").remove();

				 	         $rootScope.userStatus = true;
				 	         $rootScope.userName = data.userName;
				 	         $rootScope.userPhoto = data.userPhoto;

				 	         saveProjectFn($mdToast,$document);
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
				      parent : $document[0].querySelector('#main'),
				      hideDelay: false
				      // position: $scope.getToastPosition()
				    });
			    }else{
				var pages=[];
 					pages.push($("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!"));
					var	pageObj = {"projectId":$rootScope.projectId,"pages":{"editCode":$("#pagesList").html(),"previewCode":$("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!")}};	
 							var aj = $.ajax( {  
						 	     url:'http://9.115.24.168:3000/saveProject',// 跳转到 action  
						 	     data:pageObj,
							     type:'post',  
							     cache:false,  
							     dataType:'json',  
							     success:function(data) {  

							         if(data.status){
							       	$("#addBox").show();
									setTimeout(function(){$("#addBox").fadeTo(3000).hide();	},2000);
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
					$scope.savePageContent = function(){
						var projectName = $("#projectName").val();
						console.log(projectName+"/// projectName");
						var pages=[];
						
						pages.push($("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!"));
						
						var owner="peter";

						pageObj = {"projectName":projectName,"pages":{"editCode":$("#pagesList").html(),"previewCode":$("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!").replace(/icon-undo/g,"!")},"owner":owner,"formLabel":[{'key':'labelname'},{'key':'labelname'}]};

						var aj = $.ajax( {  
						     url:'http://9.115.24.168:3000/saveProject',// 跳转到 action  
						     data:pageObj,
						     type:'post',  
						     cache:false,  
						     dataType:'json',  
						     success:function(data) {  
						     	console.log(data.project.id+"data.project.id")
						     	$("#pagesList").attr('class',data.project.id);
						     	$rootScope.projectStatus = data.status;
						     	$rootScope.projectId = data.project.id;
						     	$("#projectId").val($('#pagesList').attr('class'));

						     	if(data.status){
							       	$("#addBox").show();
									setTimeout(function(){$("#addBox").fadeTo(3000).hide();	},2000);
									$("#saveProjectOverLay").remove()
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