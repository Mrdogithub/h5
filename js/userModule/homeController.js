var homeController = angular.module('homeController', ['ngMaterial']);
homeController.controller('homeController', function($scope, $stateParams,$mdSidenav,editPage,$mdToast,$compile,$sce,$mdDialog,$document,SERVER_URL) {

if($stateParams.projectId){

 $compile($("#pagesList").attr('ng-bind-html','page.editCode'))($scope)
 $scope.page = {
  "editCode":""
}
$scope.page.editCode = $sce.trustAsHtml(editPage.data.pages.editCode);
$scope.editcode = editPage.data.pages.editCode;


}else{
       $scope.editcode=''
}

//删除选中元素
$scope.remove = function(){$(".ui-selected").remove();}

	$("<a id='loginOut' style='margin-left:5px; font-size:12px; text-decoration:none;cursor:pointer'>退出</a>").insertAfter($("#uName"));

//判断是否为chrome浏览器
var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
    if (!isChrome) {
     $mdDialog.show({
        controller:function(){ $scope.closeToast = function() {$mdToast.hide();};},
        templateUrl: './template/page.isNotChrome.tmpl.html',
        parent : $document[0].querySelector('#main')
        // hideDelay: 6000
       // position: $scope.getToastPosition()
      });
    } 

$(document).on('click',function(){
    $('rotate-rightTop').css('display','none')
})

$scope.imageActive = function(){
  console.log('image click');
}


$scope.setBackground = function(){
  $(".bgAcitve").css('opacity','1');
  console.log('background click');
  showBackgroundEditPanel($mdToast,$document);
}

var showTextEditPanel = function($mdToast,$document)  {
        $mdToast.show({
            controller: function($scope){ 
              setFontSize();
              //init FontSize
              $scope.fontSize = [{"px":"6px"},{"px":"7px"},{"px":"8px"},{"px":"10px"},{"px":"12px"},{"px":"14px"},{"px":"16px"},{"px":"18px"},{"px":"20px"},{"px":"24px"}];
              //get  FonttSize
              $scope.getFontSize = function(fontSize){
              $('.ui-selected').css('fontSize',fontSize);
              $('#fontSize').html(fontSize); 
            }
            function setFontSize(){
                $('#fontSize').html($(".ui-selected > .mText").css('fontSize'));
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
            
            //set font link
            $scope.$watch("setFontLink",function(newValue,oldValue){
            $("#textSelected").attr("data-link",newValue);              
            })

            //set border color
            $scope.$watch("setBorderColor",function(newValue,oldColor){
              $('#textSelected').css('borderColor',newValue); 
            });

            //text animate
            $scope.textAnimate = function(){
              testAnimation($scope.selected);
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
}//end of showTextEditPanel function

function showImageEditPanelOnly($mdToast,$document){
  $mdToast.show({
            controller: function($scope,$mdDialog){
            $scope.getImageOpacity = function(){
                $('.ui-selected').css('opacity',$scope.opacity.numberValue);
            }

        //set image Radius 
            $scope.setImageRadiusSize   = function(){
              console.log('image radius size works');
              $(".ui-selected >.mImage").css("borderRadius",$scope.imageRadius.size+"px");
            }
        //set image animate
           // $scope.setImageAnimate = function(){
           //   // console.log(+"////")
           //   //  var anim = $(this).val()
                testAnimation($scope.selected);
                 function testAnimation(x){
                $('.ui-selected').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                 $(this).removeClass();
                });
              }
              $('#js--imageAnimations').change(function(){
                var anim = $(this).val()
                console.log(anim +"animate")
                testAnimation(anim);
              }); 
           // }
           
           //set image opacity
             $scope.getImageOpacity = function(){
                $('.ui-selected').css('opacity',$scope.opacity.numberValue);
            }

            },
            templateUrl: './template/imagePropertyPanel.html',
            parent : $document[0].querySelector('#editModulePosition'),
             hideDelay: false
            // position: $scope.getToastPosition()
          });


}


// show radiobox edit panel if radiobox active
function showBackgroundEditPanel($mdToast,$document){
  console.log('showBackgroundEditPanel')
    $mdToast.show({
        controller:function($scope){
      //set FontColor

      console.log('show panel')
      $scope.$watch("setPageBackgroundColor",function(newColor,oldColor){
        $('.isEdit').css('backgroundColor',newColor);
      });
    
      $(this).parent().attr('id','selectedFormItem');
      $(this).parent().css({'border':'#dedede 3px dashed','overflow':'hidden'});


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
    $(".box>.page").hasClass('col-leftclick')?$(".box>.page").removeClass('col-leftclick'):'';
    $("#ques_"+(i+1)).addClass("col-leftclick");

  }
  });

