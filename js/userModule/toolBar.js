var toolBar = angular.module('toolBar',['ngMaterial','editText']);
toolBar.directive('toolbar1',function($mdToast,$mdDialog,$document,$rootScope){
	return {
		restrict:"AE",
		templateUrl:"./template/toolBar.html",
		scope:{},
		link:function($scope,$mdDialog){

			$scope.remove = function(){
				console.log('remove works');
				$("#textSelected").remove();
				$("#imageSelected").remove();
			}

			$scope.previewPage = function(){

			 $mdToast.show({
				      controller: function($scope,$mdDialog){
				      //	$('.mainContent').css('filter','blur(5px)');
				        $scope.close = function(){
				        	$mdToast.cancel()
				        }
				        $("#previewPage >.swiper-slide").css('display','');
				        console.log('preview function works ');
				        //重新设置 swiper-side-active page 
				       // $('.swiper-slide').hasClass('s')?$('.swiper-slide').removeClass('swiper-slide-active'):'';
				        console.log($("#pagesList").html().replace('none',''));
				        $scope.previewContent = $("#pagesList").html().replace('none','');
				      },
				       template:'<md-dialog ng-cloak style="padding:0;max-height: 100%;width:500px;opacity:1;"><md-dialog-content style="padding:0;"><a href="###" style="font-size:14px;float:right;margin-right:20px;" ng-click="close()">close</a><div class="swiper-container" style="width:100%;height:650px;"><div class="swiper-wrapper" id="previewPage">'+$("#pagesList").html().replace(/display/g,"!").replace(/isEdit/g,"!")+'</div></div></md-dialog-content><md-dialog-actions layout="row"></md-dialog-actions></md-dialog><script>$(document).ready(function(){var swiper = new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:true,direction:"vertical",effect:"slide"})})</script>',
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
			  			var aj = $.ajax( {  
					 	     url:'http://9.112.71.102:3000/login',// 跳转到 action
					  	     data:userInfo,
					 		 type:'post',  
						     cache:false,  
					 	     dataType:'json',  
					 		 success:function(data) {  
			      		     
			      			 $("#uImage").attr("src",data.userPhoto);
			      			 $("#uName").html(data.userName);
				 	         
				 	         $("#userLogin").remove();

				 	         $rootScope.userStatus = true;
				 	         $rootScope.userName = data.userName;
				 	         $rootScope.userPhoto = data.userPhoto;
				 	         console.log("$rootScope.userStatus = true;"+$rootScope.userStatus);
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
			    }else{
				var pageObj;
				console.log('save page works');

				if($rootScope.projectStatus == 1){
						var pages=[];
 						for(var i=0;i<$('#pagesList').children().length;i++){
 							pages.push($('#pagesList').html());
 						}
 						console.log($rootScope.projectStatus+"///"+$rootScope.projectId);
 						pageObj = {"projectId":$rootScope.projectId,"pages":pages};	

 							var aj = $.ajax( {  
						 	     url:'http://9.112.71.102:3000/saveProject',// 跳转到 action  
						 	     data:pageObj,
							     type:'post',  
							     cache:false,  
							     dataType:'json',  
							     success:function(data) {  
							
							         if(data.status){  
							            $("#imgpop").remove();
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


				}else{
					$mdToast.show({
			      controller: function($scope,$mdDialog){
 					$scope.savePageContent = function(){
 						var projectName = $("#projectName").val();
 						console.log(projectName+"projectName");
 						var pages=[];
 						for(var i=0;i<$('#pagesList').children().length;i++){
 							pages.push($('#pagesList').html());
 						}
 						var owner="peter";

 						pageObj = {"projectName":projectName,"pages":pages,"owner":owner};

 							var aj = $.ajax( {  
						 	     url:'http://9.112.71.102:3000/saveProject',// 跳转到 action  
						 	     data:pageObj,
							     type:'post',  
							     cache:false,  
							     dataType:'json',  
							     success:function(data) {  
							     	$("#pagesList").attr('class',data.project.id);
							     	console.log('success'+data.project.id);
							     	console.log('success'+data.project.projectname);
							     	console.log('success'+data.project.owner);
							     	console.log('success'+data.project.createtime);
							     	console.log('success'+data.project.lastmodify);
							     	console.log('success'+data.project.code);
							     	console.log('success'+data.project.url);
							     	console.log('success'+data.project.qrcode);
							     	console.log('success'+data.project.qrcode );
							     	$rootScope.projectStatus = data.status;
							     	$rootScope.projectId = data.project.id;

							     	
							     	$("#projectId").val($('#pagesList').attr('class'));
							         if(data.status){  
							            $("#imgpop").remove();
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
			      // position: $scope.getToastPosition()
			    });

				}
               
			    }
				


			 //    function DialogController($scope, $mdDialog) {
				
				//   $scope.hide = function() {
				//     $mdDialog.hide();
				//   };
				//   $scope.cancel = function() {
				//     $mdDialog.cancel();
				//   };
				//   $scope.answer = function(answer) {
				//     $mdDialog.hide(answer);
				//   };
				// }


       //           $mdDialog.show({
				   //    controller: function($scope){
		 				// console.log('sace page works');
				      	
				   //    },
				   //    templateUrl: './template/page.save.tmpl.html',
			    //       parent: $document[0].querySelector('#main')
			    // });


				// $mdToast.show({
			 //     controller: function(){
			 //     	console.log('show sowkd');
			 //     },
			 //      templateUrl:'./template/page.save.tmpl.html',
			 //      parent : $document[0].querySelector('#editModulePosition'),
			 //       hideDelay: false
			 //      // position: $scope.getToastPosition()
			 //    });

		// 	var pageObj = {"projectName":"textproject","pages":["<div id='page1'>page1</div>","<div id='page2'>page2</div>"],"form":[{"formTitle":"formTitle","text1":"peter","text2":"15940885590"}],"owner":"dlyupeng@cn.ibm.com"};
 

			// console.log('savePage');
			//  $mdDialog.show({
			//      controller: function(){

			 //      },
			 //      templateUrl: './template/saveProject.tmpl.html',
			 //      // parent: angular.element(document.body),
			 //      parent : $document[0].querySelector('#editModulePosition'),
			 //      hideDelay: false
			 //      // targetEvent: ev,
			 //      // clickOutsideToClose:true,
			 //      // fullscreen: useFullScreen
			 //    })
			}
		}
	};
});