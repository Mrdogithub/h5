var toolBar = angular.module('toolBar',['ngMaterial']);
toolBar.directive('toolbar1',function($mdToast,$document,$rootScope){
	return {
		restrict:"AE",
		templateUrl:"./template/toolBar.html",
		scope:{},
		link:function($scope,$mdDialog){
			$scope.savePage = function(){
				if(!$rootScope.userStatus){
					 $mdToast.show({
				      controller: function($scope,$mdDialog){

	 					$scope.loginBtn = function(){
//	 					console.log($scope.user.firstName+"//"+$scope.user.passWord);	
//	 					var userInfo = {"userName":$scope.user.firstName,"passWord":$scope.user.passWord}
// 			  			var aj = $.ajax( {  
//					 	     url:'http://9.115.24.168:3000/login',// 跳转到 action
//					  	     data:userInfo,
//					 		 type:'post',  
//						     cache:false,  
//					 	     dataType:'json',  
//					 		 success:function(data) {  
//			      			console.log('success'+data.projectId);
//				 	         if(data.msg =="true" ){  
//				 			             // view("修改成功！");  
//			 	            		 alert("修改成功！");  
//					 	         window.location.reload();  
//		 	         		 }else{  
//					 			             view(data.msg);  
//					 		      }  
//				 		      },  
//				 		      error : function() {  
//					 		      	console.log("error");
//				 			           // view("异常！");  
//					 		           alert("异常！");  
//				 	      		}  
//				 		 	});
	 					}
				      },
				      templateUrl:'./template/user.login.tmpl.html',
				      parent : $document[0].querySelector('#editModulePosition'),
				      hideDelay: false
				      // position: $scope.getToastPosition()
				    });
			    }else{

			    }
				// var pageObj;
				// console.log('save page works');
    //            $mdToast.show({
			 //      controller: function($scope,$mdDialog){
 			// 		$scope.savePageContent = function(){
 			// 			var projectName = $("#projectName").val();
 			// 			console.log(projectName+"projectName");
 			// 			var pages=[];
 			// 			for(var i=0;i<$('#pagesList').children().length;i++){
 			// 				pages.push($('#pagesList').html());
 			// 			}
 			// 			var owner="peter";

 			// 			pageObj = {"projectName":projectName,"pages":pages,"owner":owner};

 			// 				var aj = $.ajax( {  
				// 		 	     url:'http://9.112.70.107:3000/saveProject',// 跳转到 action  
				// 		 	     data:pageObj,
				// 			     type:'post',  
				// 			     cache:false,  
				// 			     dataType:'json',  
				// 			     success:function(data) {  
				// 			     	console.log('success'+data.projectId);
				// 			         if(data.msg =="true" ){  
				// 			             // view("修改成功！");  
				// 			             alert("修改成功！");  
				// 			             window.location.reload();  
				// 			         }else{  
				// 			             view(data.msg);  
				// 			         }  
				// 			      },  
				// 			      error : function() {  
				// 			      	console.log("error");
				// 			           // view("异常！");  
				// 			           alert("异常！");  
				// 			      }  
				// 			 });

 							
 			// 		}

			 //      },
			 //      templateUrl:'./template/page.save.tmpl.html',
			 //      parent : $document[0].querySelector('#editModulePosition'),
			 //       hideDelay: false
			 //      // position: $scope.getToastPosition()
			 //    });



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