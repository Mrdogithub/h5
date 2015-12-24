var editImage = angular.module('editImage',[]);

editImage.directive('editimage',function(){
	return {
		restrict:"AE",
		templateUrl:"./template/imagePropertyPanel.html",
		scope:{},
		link:function(){
			
		}
	}
});