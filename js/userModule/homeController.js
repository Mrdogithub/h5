var homeController = angular.module('homeController', ['ngMaterial']);
homeController.controller('homeController', function($scope, $mdSidenav,$mdToast,$document) {
     $(document).on("click",".isEdit",function(){
                if($(this).data('type') == 'page'){
                  $(this).css("border","2px dashed #eeeeee");
                  showBackgroundEditPanel($mdToast,$document);
      }  
});

  //show background edit panel
  showBackgroundEditPanel($mdToast,$document);
  function showBackgroundEditPanel($mdToast,$document){
    $mdToast.show({
        controller:function($scope){
            

      //set FontColor
        $scope.$watch("setPageBackgroundColor",function(newColor,oldColor){
          $('.isEdit').css('backgroundColor',newColor);
        });

        },
        templateUrl: './template/page.background.tmpl.html',
        parent : $document[0].querySelector('#editModulePosition'),
         hideDelay: false
        // position: $scope.getToastPosition()
    }); 
  }
});

