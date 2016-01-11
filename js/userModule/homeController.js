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
}).controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log,$rootScope,$mdToast,$document) { // 左侧导航栏位 start --
  $scope.feedback = {
          title: '',
          leftpages: [{
            'type': '1211',
            'page': ''
          }]
        };
  $scope.addEmptyTemplate = function(index) {
        var n=0
        $scope.feedback.leftpages.push({
          type: '1',
          page: ''
        }),
        $rootScope.feedback = $scope.feedback;
      // console.log( $scope.feedback.leftpages.length)
        var n = $scope.feedback.leftpages.length
        $('#pagesList').append('<div id=right_'+(n)+' class="swiper-slide isEdit" ></div>');
         
         // $('.swiper-slide').hasClass('isEdit')?$('.swiper-slide').removeClass('isEdit').css("display","none"):'';
        $(".swiper-slide").each(function(index,element){     
            $("#right_"+index).hide();
            $("#right_"+index).removeClass('isEdit');
           
        });
        console.log(n)
       // $("#right_"+n).show()
        showBackgroundEditPanel($mdToast,$document)
      }

  $scope.choosePage = function(i) {
    // $("#ques_"+(i+1)).css("border","10px solid #000")
    $("#right_"+(i+1)).animate({height:'10px'});
    $("#right_"+(i+1)).animate({height:'600px'});
  
    $(".swiper-slide").hide();
    $(".swiper-slide").removeClass("isEdit")

    $("#right_"+(i+1)).show()
    $("#right_"+(i+1)).addClass("isEdit")

  }
  });
;

