var homeController = angular.module('homeController', ['ngMaterial','ngMessages']);
homeController.controller('homeController', function(
  $scope, 
  $rootScope, $mdSidenav, 
  editPage, $mdToast, $compile, 
  $sce, $state,$mdDialog, $document, SERVER_URL,loginFn) {

//用户退出
  $scope.loginOut = function(){
    $("#popupContainer").addClass('filter');
    loginFn.logout();
    $rootScope.isAuthorized = loginFn.islogged().status;
    //$state.go('homePage');

    window.location.reload();
    setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
  }

//用户登录
  $scope.userLogin = function(){
    $("#popupContainer").addClass('filter');
        $mdDialog.show({
        controller: function($q,$scope,$rootScope,loginFn){
            $scope.loadingLogin = false;
            $scope.user = {
              'firstName' : '',
              'passWord'  : ''
            }
            $scope.loginClose = function(){
                  $mdDialog.hide();
                  setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
            }

            $scope.loginBtn = function(){
                 $scope.loadingLogin = true;
                 $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
                 loginFn.login($scope.credentials).then(function(data){

                  //$scope 作用于 user.login.tmpl.html
                  //$rootScope 作用于全局
                   if(data.status){
                        $scope.loadingLogin = false;
                        $rootScope.currentUser  = $rootScope.getCurrentUser();
                        $rootScope.isAuthorized = loginFn.islogged().status;
                        $mdDialog.hide();
                        setTimeout(function(){$("#popupContainer").removeClass('filter');},250)

                    }else{
                      $scope.loadingLogin = false;
                      $scope.userError = true;
                    }
                  
                   
                 });
            }

        },
        templateUrl:'./template/user.login.tmpl.html',
        parent : $("#main"),
        hideDelay: false
    });
  }

//用户未登录状态点击我的项目
  $scope.myProject = function(){
        if(loginFn.islogged().status){
          $state.go('dashboard');
        }else{
              $("#popupContainer").addClass('filter');
              $mdDialog.show({
                 controller: function($scope,$rootScope){
                    $scope.loginClose = function(){
                        $mdDialog.hide();
                        setTimeout(function(){
                            $("#popupContainer").removeClass('filter');
                        },250)
                    }
                
                    $scope.loginBtn = function(){
                         $scope.loadingLogin = true;
                         $scope.error = '';
                         $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
                         loginFn.login($scope.credentials).then(function(data){

                          //$scope 作用于 user.login.tmpl.html
                          //$rootScope 作用于全局
                          // console.log(data.status+">>>>data.status")
                           if(data.status){
                                $rootScope.currentUser  = $rootScope.getCurrentUser();
                                $rootScope.isAuthorized = loginFn.islogged().status;
                                $("#popupContainer").removeClass('filter');
                              //  $mdDialog.hide();
                         
                                if(!$("#pagesList").data("projectid")){

                                  $mdDialog.show({
                                        controller: function($scope, projectFn) {
                                          $scope.loadingSave = false;
                                          $scope.closeSavePage = function() {
                                            console.log('close work');
                                            $mdDialog.hide();
                                            $("#popupContainer").removeClass('filter');
                                          }
                                          $scope.savePageContent = function() {
                                             $scope.loadingSave = true;
                                            var projectName = $("#projectName").val();           
                                            var previewCode = $("#pagesList").html()
                                                  .replace(/display/g, "!")
                                                  .replace(/isEdit/g, "!")
                                                  .replace(/icon-undo/g, "!")
                                                  .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

                                            var editCode    = $("#pagesList").html()
                                                  .replace(/ui-selected/, '')
                                                  .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

                                            projectFn.addProject(projectName,previewCode,editCode)
                                              .then(function(data) {
                                   
                                                  if (data.status) {
                                                    $("#pagesList").attr('data-projectid', data.project.id);
                                                    $scope.loadingLogin = false;
                                                      $mdDialog.hide();
                                                    $("#popupContainer").removeClass('filter');


                                                    $("#addBox").show();
                                                    setTimeout(function() {
                                                      $("#addBox").fadeTo(3000).hide();
                                                    }, 1000);

                                                     $state.go('dashboard');
                                                  } else {
                                                    view(data.msg);
                                                  }
                                            }, function() {
                                            
                                            });
                                          }

                                        },
                                        templateUrl: './template/page.save.tmpl.html',
                                        parent: $("#main"),
                                        hideDelay: false
                                      });
 
                                }

                            }else{
                                $scope.loadingLogin = false;
                                $scope.userError = true;
                            }
                          
                           
                         });
                      }
                },
                templateUrl:'./template/user.login.tmpl.html',
                parent : $("#main"),
                hideDelay: false
              });

        }
  }
      

//删除选中元素
  $scope.remove = function() {
    $(".ui-selected").remove();
  }

//'设置背景
  $scope.setBackground = function() {

    var color = $("#hsv-picker-bg").val();

    $(".isEdit").css('backgroundColor',color)
  }


$scope.$watch('setFontBackgroundColor',function(newValue,oldValue){
      console.log(newValue)
    })

  function saveProjectFn(){
    var pageLength = [];
    pageLength.length = 0;

    //初始化页面个数
    var projectid = $("#pagesList").data("projectid");
    var pageLengthNotSave = projectFn.getPageLength();
    projectFn.loadEditPage(projectid).then(function(data) {
      var newLength = 0;
      if (typeof(data.pageLength) == 'undefined') {
        newLength = 1;
      } else if (pageLengthNotSave > data.pageLength) {
        newLength = pageLengthNotSave;
      } else if (pageLengthNotSave < data.pageLength) {
        newLength = data.pageLength;
      } else if (pageLengthNotSave = data.pageLength) {
        newLength = data.pageLength;
      }
   
   
      var editCode = $("#pagesList").html()
              .replace(/ui-selected/, '')
              .replace(/isEdit/g, " ")
              .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

      var previewCode = $("#pagesList").html()
              .replace(/display/g, " ")
              .replace(/isEdit/g, " ")
              .replace(/icon-undo/g, " ")
              .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

      projectFn.saveProject(newLength, projectid, editCode, previewCode)
        .then(function(data) {

            if (data.status) {
              $('.md-dialog-container').css('display', 'none');
              $("#addBox").show();
              setTimeout(function() {
                $("#addBox").fadeTo(3000).hide();
              }, 1000);
            } else {
              view(data.msg);
            }
        }, function() {

            $scope.error = "用户名或密码错误"
        });

    })
  }


//判断是否为chrome浏览器
  var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
  if (!isChrome) {
    $mdDialog.show({
      controller: function() {
        $scope.closeToast = function() {
          $mdToast.hide();
        };
      },
      templateUrl: './template/page.isNotChrome.tmpl.html',
      parent: $document[0].querySelector('#main')
        // hideDelay: 6000
        // position: $scope.getToastPosition()
    });
  }

  $(document).on('click', function() {
    $('rotate-rightTop').css('display', 'none')
  })


// show radiobox edit panel if radiobox active
  function showBackgroundEditPanel($mdToast, $document) {
    $mdToast.show({
      controller: function($scope) {
        //set FontColor
        $scope.$watch("setPageBackgroundColor", function(newColor, oldColor) {
          $('.isEdit').css('backgroundColor', newColor);
        });

        $(this).parent().attr('id', 'selectedFormItem');
        $(this).parent().css({
          'border': '#dedede 3px dashed',
          'overflow': 'hidden'
        });


      },
      templateUrl: './template/page.background.tmpl.html',
      parent: $document[0].querySelector('#editModulePosition'),
      hideDelay: false
    });
  }


}).controller('LeftCtrl', function($scope, $timeout, $mdSidenav, 
  $log, $rootScope, $mdToast,$compile,$document, projectFn) { // 左侧导航栏位 start --
  

$(document).on("mouseenter",".page",function(){
  console.log('enter');
    $(this).find(".pageThumbMask").css('display','block');

});
$(document).on("mouseleave",".page",function(){
       $(this).find(".pageThumbMask").css('display','none');
});




  function makeid(){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  } 

  
  var defaultThumb = makeid();
  $scope.feedback = {
    title: '',
    leftpages: [{
      'type': '1',
      'thumbId':defaultThumb
    }]
  };

$("#pagesList div.swiper-slide:eq(0)").attr('data-pageid',defaultThumb)


  var projectIdInLeftNav = projectFn.getProjectId();
  projectFn.loadEditPage(projectIdInLeftNav).then(function(data) {
    var k = 0;
    k = data.pageLength;
   // console.log('@homeController.js show pages length is:'+k)
    var colLeftHeight = 140 * k;
    if (k > 1) {
      for (var i = 0; i < k - 1; i++) {
        $scope.feedback.leftpages.push({
          type: '2'
        })
      };
    }

  })


    $scope.addEmptyTemplate = function(index) {


       //清除左侧略缩图选中状态
      $('.page').removeClass('col-leftclick');

      //判断当前左侧导航是否有略缩图
      var isEmpty = $('.new-button').siblings('.pageThumbItem').length;

      console.log(isEmpty+" isEmpty")
      //将全部页面删除后，再添加第一页，需要判断当前页面是否唯一
      if(isEmpty<1){
        //如果当前页面为第一页，通过 n 设置默认索引
        var n=1;

        //生成唯一hash，作为左侧略缩图和对应右侧内容页的同步
        var thumbId = makeid();
        $scope.feedback.leftpages.push({type: '1',page: '',thumbId:thumbId});
        $('#pagesList ').append('<div class="swiper-slide isEdit" data-pageId="'+thumbId+'" ></div>');
      }else{

        //生成唯一 hash值,作为略缩图和对应页面的标识符
        var thumbId = makeid();
       // console.log('thumbId:'+thumbId);

        //通过增加数组长度，记录当前页面个数，同时把生成的hash作为id记录在左侧元素中
        $scope.feedback.leftpages.push({type: '1',page: '',thumbId:thumbId});


       // console.log('@homeController.js  show page length:'+$scope.feedback.leftpages.length);

        //隐藏其他元素
         $(".swiper-slide").hide();
         $(".swiper-slide").removeClass("isEdit");

        //相同的hash同时记录在对应的右侧元素，通过hash来保持两个元素之间的同步，并isEdit显示当前新创建元素
        $('#pagesList ').append('<div class="swiper-slide isEdit" data-pageId="'+thumbId+'"></div>');


      }
      




//$(".box>.page").hasClass('col-leftclick') ? $(".box>.page").removeClass('col-leftclick') : '';



    /**
    * @name savePageLength()
    * @path project/projectService.js
    * @description
    * 
    * 用户每增加一页或删除一页，更新$scope.feedback.leftpages数组，并保存至projectFn.savePageLength
    * projectFn.savePageLength 方法用于保存页面长度，在用户保存项目时，会从这个方法获取页面的长度
    **/
    projectFn.savePageLength($scope.feedback.leftpages);
    console.log('当前页数:'+$scope.feedback.leftpages);
    $rootScope.pageLength = $scope.feedback.leftpages;
    // $("#right_"+n).show()
    showBackgroundEditPanel($mdToast, $document)
  }

  $scope.choosePage = function(i) {


 $(".swiper-slide").hide();
 $(".swiper-slide").removeClass("isEdit");
 $(".col-left").removeClass('col-leftclick');

 //清除左侧略缩图选中状态
 $('.page').removeClass('col-leftclick');

 $("#pagesList").find("div[data-pageid='"+i+"']")
                .fadeIn(300)
                .show()
                .addClass('isEdit');
 
 //通过父级元素查找某个元素下的子元素
 $(".col-left").find("div[data-activeid='"+i+"']").find('div[class="page ng-scope"]')
               .addClass('col-leftclick');

// $("#pagesList").find("div[data-pageid='"+i+"']").filter(function() {
//     if($(this).data('pageid') == i){
//       console.log($(this).data('pageid')+".....")
//       $(this).fadeIn(300);
//       $(this).show();
//       $(this).addClass('isEdit');
//     }
// });


    

  //  console.log('@homeController.js DEC choosePage i is :'+(i+1));
   
    // $(".swiper-slide").removeClass('swiper-slide-next');
    // $(".swiper-slide").removeClass('swiper-slide-active');
    //console.log('@homeController.js DEC choosePage current i'+(i + 1))
    // $("#right_" + (i + 1)).show();
    // $("#right_" + (i + 1)).addClass("isEdit");

    // $(".page.col-leftclick.ng-scope").removeClass('col-leftclick')
    // $("#ques_" + (i + 1)).addClass("col-leftclick"); 

    //rmeove others div when current is active
  





//    setTimeout(function(){
//      $("#hsv-picker-bg").val($('.isEdit').css("backgroundColor"))
//    },100)


// var sHexColor = sRgb.colorHex();//转换为十六进制方法<code></code>  
// var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;  
// /*RGB颜色转换为16进制*/  
// String.prototype.colorHex = function(){  
//     var that = this;  
//     if(/^(rgb|RGB)/.test(that)){  
//         var aColor = that.replace(/(?:||rgb|RGB)*/g,"").split(",");  
//         var strHex = "#";  
//         for(var i=0; i<aColor.length; i++){  
//             var hex = Number(aColor[i]).toString(16);  
//             if(hex === "0"){  
//                 hex += hex;   
//             }  
//             strHex += hex;  
//         }  
//         if(strHex.length !== 7){  
//             strHex = that;    
//         }  
//         return strHex;  
//     }else if(reg.test(that)){  
//         var aNum = that.replace(/#/,"").split("");  
//         if(aNum.length === 6){  
//             return that;      
//         }else if(aNum.length === 3){  
//             var numHex = "#";  
//             for(var i=0; i<aNum.length; i+=1){  
//                 numHex += (aNum[i]+aNum[i]);  
//             }  
//             return numHex;  
//         }  
//     }else{  
//         return that;      
//     }  
// };  
}
  
/*
*@删除页面 
*@删除页面的同时更新存储页面长度的数组
*
*
****/

$scope.removePage = function(pageId){


var pageId = pageId;
 

// console.log(" $scope.feedback.leftpages.length"+ $scope.feedback.leftpages.length)

 $("#pagesList").find("div[data-pageid='"+pageId+"']").fadeOut(300).remove();


    
 $(".col-left").find("div[data-activeid='"+pageId+"']").fadeOut(300).remove();

// console.log(" $scope.feedback.leftpages.length"+ $scope.feedback.leftpages.length)

//更新存储页面数组
for(var i in $scope.feedback.leftpages){

    console.log(i+".......i");

  if($scope.feedback.leftpages[i].thumbId == pageId){
    if(i==0){//判断要删除的元素是否是第一个元素
      var showThumbId = $scope.feedback.leftpages[1].thumbId;
       $(".swiper-slide").hide();
       $(".swiper-slide").removeClass("isEdit");
       $(".col-left").removeClass('col-leftclick');

       $("#pagesList").find("div[data-pageid='"+showThumbId+"']")
                      .fadeIn(300)
                      .show()
                      .addClass('isEdit');
          
       $(".col-left").find("div[data-activeid='"+showThumbId+"']")
                     .addClass('col-leftclick');
    }else if(i>0){//要删除元素不是第一个元素默认显示相邻元素
      var showThumbId = $scope.feedback.leftpages[i-1].thumbId;
       $(".swiper-slide").hide();
       $(".swiper-slide").removeClass("isEdit");
       $(".col-left").removeClass('col-leftclick');

       $("#pagesList").find("div[data-pageid='"+showThumbId+"']")
                      .fadeIn(300)
                      .show()
                      .addClass('isEdit');
          
       $(".col-left").find("div[data-activeid='"+showThumbId+"']")
                     .find('div[class="page ng-scope"]')
                     .addClass('col-leftclick');
    }


     $scope.feedback.leftpages.splice(i,1);

  }
}


// for(var i =0;i<$scope.feedback.leftpages.length;i++){
//   //console.log("$scope.feedback.leftpages[i].thumbId:"+$scope.feedback.leftpages[i].thumbId)
//   if($scope.feedback.leftpages[i].thumbId == pageId){
   
//     var currentIndex = i;
//     console.log('currentIndex:'+i+":"+$scope.feedback.leftpages[i].index)
//     console.log(i+"current index")
//     console.log($scope.feedback.leftpages.length+"update page length before")
//     console.log('thumbId:'+$scope.feedback.leftpages[i].thumbId+"vs"+'pageId:'+pageId)

//     console.log($(this).index()+":currentIndex by jquery")
//     var isTop =(i-1);
//     console.log(isTop+":isTop")
//     if(isTop>0){
//       var showThumbId = $scope.feedback.leftpages[i+1].thumbId;
//       console.log('showThumbId:'+showThumbId)
//     }


//      $scope.feedback.leftpages.splice(i,1);
//      console.log($scope.feedback.leftpages.length+"update page length after")
//   }
// }

//删除当前页面，显示前一个兄弟节点
 // $("#pagesList").find("div[data-pageid='"+i+"']")
 //                .fadeIn(300)
 //                .show()
 //                .addClass('isEdit');
    
 // $(".col-left").find("div[data-activeid='"+i+"']")
 //               .addClass('col-leftclick');

//如果删除第一页，显示后一个兄弟节点

    // console.log($scope.feedback.leftpages.length+":length")
    // console.log('@homeController.js current index is:'+targetIndex)
    // var targetPageId = '#right_'+targetIndex;
    // var targetPageThumbId = '#ques_'+ targetIndex;
    // console.log('@homeController.js remove page pageThumb is:'+targetPageThumbId)
    // console.log('@homeController.js remove page page      is:'+targetPageId)
    // var updateLength = $scope.feedback.leftpages.length;
    // $scope.feedback.leftpages.length = updateLength -1;
    // $(targetPageId).remove();

}

});
