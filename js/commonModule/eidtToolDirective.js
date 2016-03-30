'use strict';

var eidtToolDirective = angular.module('eidtToolDirective', ['ngMaterial', 'projectService']);

eidtToolDirective.directive('toolbar1', function($mdToast,
  $document, $rootScope,
  projectFn,loginFn,$mdDialog) {

  return {
    restrict: "AE",
    scope: {},
    templateUrl: "./template/toolBar.html",
    link: function($scope, $rootScope) {
      $scope.remove = function() {
        $(".ui-selected").remove();
      }

      $scope.previewPage = function() {
        $("#popupContainer").addClass('filter');
       $mdDialog.show({
          controller: function($scope, $compile, $sce) {
            $compile($("#previewContent").attr('ng-bind-html', 'page.preivewCode'))($scope)
            $scope.page = {
              "preivewCode": ""
            };
   
           var previewOnce = $("#pagesList").html();
           var strHtml = previewOnce.replace(/display/g, " ")
                    .replace(/isEdit/g, " ")
                    .replace(/icon-undo/g, " ")
                    .replace(/ui-selectable/g,'')
                    .replace(/ui-draggable/g,'')
                    .replace(/ui-selectee/g,'')
                    .replace(/ui-selected/g,'')
                    .replace(/right_/g,'')
                    .replace(/onclick="textActive(this)"/g,'')
                    .replace(/textElementActive/g,' ')
                    .replace(/class="[^\"]*(animated)[^\"]*(imageElement)[^\"]*"/g,'class=" ani imageElement"')
                    .replace(/class="[^\"]*(animated)[^\"]*(textElement)[^\"]*"/g,'class=" ani textElement"')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    .replace(/ui-resizable/g,'') + '<script type="text/javascript"> var mySwiper=new Swiper(".swiper-container",{onInit:function(swiper){swiperAnimateCache(swiper);swiperAnimate(swiper)},onSlideChangeEnd:function(swiper){swiperAnimate(swiper)}})</script>';

            $scope.page.preivewCode = $sce.trustAsHtml(strHtml);
              
            //console.log("@editToolDirective.js DEC print $scope.page.preivewCode is:"+$scope.page.preivewCode);
            $scope.closePreview = function() {
               $mdDialog.hide();
             // $('#previewPageInEditStatus').css('display', 'none');
              $("#popupContainer").removeClass('filter');


              var i = $(".page.col-leftclick span").html();
              $("#right_" + (i)).show();
            }
          },
          templateUrl: "./template/page.previewPage.tmpl.html",
          parent: $('#main'),
          hideDelay: false
            // position: $scope.getToastPosition()
        });
      }



/*
*@保存按钮
*
*
***/
      $scope.savePage = function() {
        /*
        *projectFn.getPageLength()
        *@ project/Module/projectService.js
        *
        */
          var pageLength = projectFn.getPageLength();

          if (loginFn.islogged().status) {

                /**
                * loginFn.islogged()
                * @ userModule/loginService.js
                * 返回:
                *
                * { 
                *   status    ：true | false 用户登录状态
                *   userName  ：用户名
                *   userPhoto : 用户头像链接
                *  }
                */
                if(projectIdIsNull()){
                    addProjectFn($mdDialog, $document)  
                }else{
                    saveProjectFn();
                }
          
          }else{


                $mdDialog.show({
                  controller: function($scope, $rootScope,loginFn) {
                     $("#popupContainer").addClass('filter');
                     $scope.loadingLogin = false;
                      $scope.loginClose = function(){
                          $mdDialog.hide();
                          setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
                      }

                      $scope.loginBtn = function(){
                        $scope.loadingLogin = true;
                         $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
                         loginFn.login($scope.credentials).then(function(data){

                           if(data.status){
                                $rootScope.currentUser  = $rootScope.getCurrentUser();
                                $rootScope.isAuthorized = loginFn.islogged().status;
                                $scope.loadingLogin = false;
                                //$mdDialog.hide();
                                //setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
                                addProjectFn($mdDialog, $document) 
                            }else{
                                // console.log('fail')
                                $scope.loading = false;
                                $scope.error = "用户名或密码错误";
                            }
                          
                           
                         });
                      }

                  },
                  templateUrl: './template/user.login.tmpl.html',
                  parent:$("#main"),
                  hideDelay: false
                });         
          }
      }


/*
*@描述：projectIdIsNulll
*@作用：判断当前项目是否是新建项目
**/
      function projectIdIsNull() {
        var status = typeof($("#pagesList").data('projectid')) == "undefined" ? true : false;
        return status;
      }

/*
*@描述：saveProjectFn
*@作用：非新建项目点击保存按钮出发此方法
*@详情：.....
**/
      function saveProjectFn(){


          /*
          *@描述：pageLengthObj
          *@作用：获取用户在当前编辑状态下的实际页面个数
          **/          
          var pageLengthObj = projectFn.getPageLength();
          var projectid     = $("#pagesList").data("projectid");

          /*
          *@描述：将当前页面个数与存储个数比较，判断页面个数是否有变
          **/
          projectFn.loadEditPage(projectid).then(function(data) {
  

            //如果实际pageLengthObj 与 从projectFn.loadEditPage 获取的页面长度不等
            //返回实际pageLengthObj,如果相等，返回任意一个

            // console.log('actual page length：'+pageLengthObj.length)
            // console.log('page length from db:'+data.pageLength.length)

            var newLengthObj = pageLengthObj.length !== data.pageLength.length?pageLengthObj:pageLengthObj;
         
            //console.log('newLengthObj:'+newLengthObj.length)
           var editCode = $("#pagesList").html()
                    .replace(/ui-selected/, '')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    .replace(/isEdit/,'')
                    .replace(/display: flex/, "display: none")
                    .replace('defaultPage','defaultPage isEdit')
                    .replace('direction: ltr; display: none;','direction: ltr;display: block;')

           var previewCode = $("#pagesList").html()
                    .replace(/display/g, " ")
                    .replace(/isEdit/g, " ")
                    .replace(/icon-undo/g, " ")
                    .replace(/ui-selectable/g,'')
                    .replace(/ui-draggable/g,'')
                    .replace(/ui-selectee/g,'')
                    .replace(/ui-selected/g,'')
                    .replace(/right_/g,'')
                    .replace(/onclick="textActive(this)"/g,'')
                    .replace(/textElementActive/g,' ')
                    .replace(/class="[^\"]*(animated)[^\"]*(textElement)[^\"]*"/g,'class=" ani textElement"')
                    .replace(/class="[^\"]*(animated)[^\"]*(imageElement)[^\"]*"/g,'class=" ani imageElement"')
                    .replace(/style="[^\"]*(animation-name|animation-duration|animation-delay)+:[^\:]*;[^\"]*"/g,' ')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    .replace(/ui-resizable/g,'');

            projectFn.saveProject(newLengthObj, projectid, editCode, previewCode)
              .then(function(data) {
                  
                  if (data.status) {
                    setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
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


/**
* @name  addProjecFn
* @description 
*
* 用于用户创建新项目
*/
      function addProjectFn($mdDialog, $document) {
      $("#popupContainer").addClass('filter');
        $mdDialog.show({
          controller: function($scope, projectFn) {
            $scope.closeSavePage = function() {
               $mdDialog.hide();
               setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
            }
            $scope.savePageContent = function() {
              $scope.loadingSave = false;
              var pageLengthObj  = []
              var projectName    = $("#projectName").val();
              var projectInfo    = $('#projectInfo').val();     
              var userName       = loginFn.islogged().email;
              

              //console.log('projectFn.getPageLength():'+projectFn.getPageLength())
              //判断页面长度，如果只有一个页面，需要初始化存储页面长度对象
              if(!projectFn.getPageLength()){

              //如果projeFn.getPageLength没有数据，从第一个缩略图里获取hash
                var defaultThumb = $('*[data-activeid]').data('activeid');
                   pageLengthObj = [{'type': '1','thumbId':defaultThumb}];
              }else{

                   pageLengthObj = projectFn.getPageLength();
              }
              
               // console.log('only one page'+pageLengthObj)
               // console.log('only one page length'+pageLengthObj.length)
              // console.log('@addProject:current page length is:'+pageLengthObj.length);

              var previewCode = $("#pagesList").html()
                    .replace(/display/g, " ")
                    .replace(/isEdit/g, " ")
                    .replace(/icon-undo/g, " ")
                    .replace(/ui-selectable/g,'')
                    .replace(/ui-draggable/g,'')
                    .replace(/ui-selectee/g,'')
                    .replace(/ui-selected/g,'')
                    .replace(/right_/g,'')
                    .replace(/onclick="textActive(this)"/g,'')  
                    .replace(/textElementActive/g,' ')
                    .replace(/class="[^\"]*(animated)[^\"]*(textElement)[^\"]*"/g,'class=" ani textElement"')
                    .replace(/class="[^\"]*(animated)[^\"]*(imageElement)[^\"]*"/g,'class=" ani imageElement"')
                    .replace(/style="[^\"]*(animation-name|animation-duration|animation-delay)+:[^\:]*;[^\"]*"/g,'')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    .replace(/ui-resizable/g,'');

               var editCode = $("#pagesList").html()
                    .replace(/ui-selected/, '')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    .replace(/isEdit/,'')
                    .replace(/display: flex/, "display: none")
                    .replace('defaultPage','defaultPage isEdit')
                    .replace('direction: ltr; display: none;','direction: ltr;display: block;');

              projectFn.addProject(projectName,previewCode,editCode,projectInfo,userName,pageLengthObj)
                .then(function(data) {
                   // console.log(data.status+":data.status")
                    if (data.status) {
                      $("#pagesList").attr('data-projectid', data.project.id);
                        $scope.loadingSave = true;
                        $mdDialog.hide();
                        setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
                        $("#addBox").show();
                        setTimeout(function() {
                          $("#addBox").fadeTo(3000).hide();
                        }, 1000);

                    } else {
                      // console.log('@editToolDirective.js  Fn: add project :'+data.name)
                    }
              }, function() {
              
              });
            }

          },
          templateUrl: './template/page.save.tmpl.html',
          parent: $('#main'),
          hideDelay: false
        });
      }




    }
  };
});
