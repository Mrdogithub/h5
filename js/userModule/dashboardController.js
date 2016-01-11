var dashboardController = angular.module('dashboardController', ['ngMaterial','dashBoardService','toolBar']);

dashboardController.controller('dashboardController',function ($scope,$rootScope, $timeout,$mdToast,$document,getMyProjectsList,$document,$mdDialog,dashBoardFunctionCollection){
	$scope.projectList = getMyProjectsList.data;
	$scope.showBack = function(target){
		console.log('show back works');
			$(target).find('.dask').stop().delay(50).animate({opacity:1},200);
			$('#container').css('filter','blur(5px)');
	};

	$scope.previewPage = function(ev,url,qrcode){	
	$mdDialog.show({
      controller: function($scope){

       $scope.previewUrl ='./data/index.html';
       $scope.qrcode = qrcode; 	
       $scope.close = function(){
       	$mdDialog.cancel();
       }
      },
      templateUrl: './template/page.previewPage.tmpl.html',
      parent : $document[0].querySelector('#editModulePosition'),
      targetEvent: ev,
      clickOutsideToClose:true
	    }).then(function(answer) {
	          $scope.status = 'You said the information was "' + answer + '".';
	        }, function() {
	          $scope.status = 'You cancelled the dialog.';
	        });
	
	}

	$scope.deletePage = function(ev,projectId){
	    var confirm = $mdDialog.confirm()
	          .title('Would you like to delete your project?')
	          .ariaLabel('Lucky day')
	          .targetEvent(ev)
	          .ok('Yes')
	          .cancel('No');
	    $mdDialog.show(confirm).then(function(data) {
	      if(data){
	      	dashBoardFunctionCollection.deletedProject(projectId);
	      	$('#'+projectId).remove();
	      }
	    }, function(data) {
	    });

	}


	$scope.copyProject = function(ev,projectId,projectName){	
	   var pId = projectId;
	   var pName = projectName;
	   console.log(pName+"///")
	$mdDialog.show({
      controller: function( $scope){
      	$scope.copyProjectInProgress = function(){
      	console.log(pId+"//"+pName)
      	var newProject = dashBoardFunctionCollection.copyProject(pName,pId);
      	console.log(newProject._id+"///// new project id")

var newProject= $('<div class="col-sm-6 col-md-4 col-lg-3 modmore" id="{{item.id}}"><div class="thumbnail"  style="height: 334px;" ><div class="projectInfo-projectName" style="position:absolute;width:98%;opacity:1;"><img  style="width:100%;height:325px;"  src="{{item.cover}}"><div style="width:100%;position:absolute;bottom:0px;text-align:center;height:40px;background:#fff;padding:10px 0px 10px 0px;"><p>{{item.projectname}} new project new project</p></div></div><div class="dask" style="position:absolute;width:98%;opacity:0;"><p class="showMoreIcons"><span ng-click="deletePage($event,item.id)" class="projectInfoShowMoreIcons-remove" style="width:0px;opacity:0;"></span><span ng-click="copyProject($event,item.id,item.projectname)" class="projectInfoShowMoreIcons-copy" style="width:0px;opacity:0;"></span><span href="javascript:;" class="projectInfoShowMoreIcons"></span></p><img src="{{item.qrcode}}" style="width:100%;"><p class="projectInfoDownloadQRCode">DownLoad QR Code</p><p class="showMoreIconsBottom"><a ng-click="previewPage($event,item.url,item.qrcode)" class="projectInfoShowMoreIcons-preview"></a><a href="javascript:;" class="projectInfoShowMoreIcons-edit"></a><a href="javascript:;" class="projectInfoShowMoreIcons-report"></a></p></div></div></div></div></div>');
		newProject.prependTo($('.row'));
      	}
       $scope.close = function(){
       	$mdDialog.cancel();
       }
      },
      templateUrl: './template/page.copyProject.tmpl.html',
      parent : $document[0].querySelector('#editModulePosition'),
      targetEvent: ev,
      clickOutsideToClose:true
	    }).then(function(answer) {
	          $scope.status = 'You said the information was "' + answer + '".';
	        }, function() {
	          $scope.status = 'You cancelled the dialog.';
	        });
	
	}
  	$("#bg-properties").remove();

})