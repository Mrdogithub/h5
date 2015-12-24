var toolBar = angular.module('toolBar',['ngMaterial']);
toolBar.directive('toolbar1',function($mdDialog,$document){
	return {
		restrict:"AE",
		templateUrl:"./template/toolBar.html",
		scope:{},
		link:function($scope,$mdDialog){
			$scope.savePage = function(){

			var pageObj = {"projectName":"textproject","pages":["<div id='page1'>page1</div>","<div id='page2'>page2</div>"],"form":[{"formTitle":"formTitle","text1":"peter","text2":"15940885590"}],"owner":"dlyupeng@cn.ibm.com"};
 	var aj = $.ajax( {  
 	     url:'http://9.112.70.107:3000/saveProject',// 跳转到 action  
 	     data:pageObj,
	     type:'post',  
	     cache:false,  
	     dataType:'json',  
	     success:function(data) {  
	     	console.log('success'+data.projectId);
	         if(data.msg =="true" ){  
	             // view("修改成功！");  
	             alert("修改成功！");  
	             window.location.reload();  
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