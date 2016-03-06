var homeController = angular.module('homeController', ['ngMaterial']);
homeController.controller('homeController', function($scope, $rootScope, $mdSidenav, 
  editPage, $mdToast, $compile, $sce, $state,
  $mdDialog, $document, SERVER_URL,loginFn) {

  $(document).on("click",".ui-selected",function(){
    console.log(' works')
  });
  //用户退出
  $scope.loginOut = function(){
      loginFn.logout();
      $rootScope.isAuthorized = loginFn.islogged().status;

      //项目管理页面退出后，返回到主页
      $state.go('homePage');
  }

  //用户登录
    $scope.userLogin = function(){
        $("#pagesList").css('display','none');
            $mdToast.show({
            controller: function($q,$scope,$rootScope,loginFn){
                $scope.loginClose = function(){
                    $('#loginOverLay').css('display','none');
                    $("#pagesList").css('display','block');
                }

                $scope.loginBtn = function(){
                        $scope.loading = true;
                         $scope.error = '';
                         $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
                         loginFn.login($scope.credentials).then(function(data){

                          //$scope 作用于 user.login.tmpl.html
                          //$rootScope 作用于全局
                          console.log(data.status+">>>>data.status")
                           if(data.status){
                                $rootScope.currentUser  = $rootScope.getCurrentUser();
                                $rootScope.isAuthorized = loginFn.islogged().status;
                                $("#loginOverLay").css('display','none');
                                $("#pagesList").css('display','block');

                            }else{
                              // console.log('fail')
                              $scope.loading = false;
                              console.log('error')
                                $scope.error = "用户名或密码错误";
                            }
                          
                           
                         });
                      }

            },
            templateUrl:'./template/user.login.tmpl.html',
            parent : $document[0].querySelector('#editModulePosition'),
            hideDelay: false
          });
    
        
      }


//用户未登录状态点击我的项目
      $scope.myProject = function(){
        if(loginFn.islogged().status){
           $state.go('dashboard');

        }else{
              $mdToast.show({
                 controller: function($scope,$rootScope){
                    $scope.loginClose = function(){
                        $('#loginOverLay').css('display','none');
                    }
                
                    $scope.loginBtn = function(){
                         $scope.loading = true;
                         $scope.error = '';
                         $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
                         loginFn.login($scope.credentials).then(function(data){

                          //$scope 作用于 user.login.tmpl.html
                          //$rootScope 作用于全局
                          console.log(data.status+">>>>data.status")
                           if(data.status){
                                $rootScope.currentUser  = $rootScope.getCurrentUser();
                                $rootScope.isAuthorized = loginFn.islogged().status;
                                $("#loginOverLay").css('display','none');
                                $("#pagesList").css('display','block');
                                console.log('$("#pagesList").data("projectid")'+$("#pagesList").data("projectid"))
                                if(!$("#pagesList").data("projectid")){
                                  $mdToast.show({
          controller: function($scope, projectFn) {
            $scope.savePageContentClose = function() {
              $('#saveProjectOverLay').css('display', 'none');
            }
            $scope.savePageContent = function() {
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
                      $('#saveProjectOverLay').css('display', 'none');
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
          parent: $document[0].querySelector('#editModulePosition'),
          hideDelay: false
        });
           




                                }

                            }else{
                              // console.log('fail')
                              $scope.loading = false;
                              console.log('error')
                                $scope.error = "用户名或密码错误";
                            }
                          
                           
                         });
                      }
                },
                templateUrl:'./template/user.login.tmpl.html',
                parent : $document[0].querySelector('#editModulePosition'),
                hideDelay: false
              });

          }
     }
      
    

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




  //删除选中元素
  $scope.remove = function() {
    $(".ui-selected").remove();
  }

  $("<a id='loginOut' style='margin-left:5px; font-size:12px; text-decoration:none;cursor:pointer'>退出</a>")
  .insertAfter($("#uName"));

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

  $scope.imageActive = function() {
    console.log('image click');
  }


  $scope.setBackground = function() {
    $(".bgAcitve").css('opacity', '1');
    console.log('background click');
    showBackgroundEditPanel($mdToast, $document);
  }

  var showTextEditPanel = function($mdToast, $document) {
      $mdToast.show({
        controller: function($scope) {
          setFontSize();
          //init FontSize
          $scope.fontSize = [{
            "px": "6px"
          }, {
            "px": "7px"
          }, {
            "px": "8px"
          }, {
            "px": "10px"
          }, {
            "px": "12px"
          }, {
            "px": "14px"
          }, {
            "px": "16px"
          }, {
            "px": "18px"
          }, {
            "px": "20px"
          }, {
            "px": "24px"
          }];
          //get  FonttSize
          $scope.getFontSize = function(fontSize) {
            $('.ui-selected').css('fontSize', fontSize);
            $('#fontSize').html(fontSize);
          }

          function setFontSize() {
            $('#fontSize').html($(".ui-selected > .mText").css('fontSize'));
          }

          //init FontFamily
          $scope.fontFamily = [{
            "fontFamily": "黑体"
          }, {
            "fontFamily": "微软雅黑"
          }, {
            "fontFamily": "宋体"
          }];
          //set FontFamily
          $scope.setFontFamily = function(newFont) {
            $('#textSelected').css('fontFamily', '"' + newFont + '"');
            $('#fontFamily').html(newFont);
          }

          //set FontColor
          $scope.$watch("setFontColor", function(newColor, oldColor) {
            $('#textSelected').css('color', newColor);
          });

          //init line height
          $scope.lineHeight = [{
            "lineHeight": "1"
          }, {
            "lineHeight": "1.15"
          }, {
            "lineHeight": "1.5"
          }, {
            "lineHeight": "2"
          }, {
            "lineHeight": "2.5"
          }, {
            "lineHeight": "3"
          }];
          //set line height
          $scope.setLineHeight = function() {
            $('#textSelected').css('lineHeight', $scope.selected.lineHeight * 100 + "%");
          }

          //setFontBold
          $scope.setFontBold = function() {
            if ($("#textSelected").css("fontWeight") != "bold") {
              $("#textSelected").css("fontWeight", "bold");
              $(".bold-active").css("background", "#eeeeee");
            } else if ($("#textSelected").css("fontWeight") == "bold") {
              $("#textSelected").css("fontWeight", "");
              $(".bold-active").css("background", "");
            }
          };

          //set Italic
          $scope.setFontItalic = function() {
            if ($("#textSelected").css("fontStyle") != "italic") {
              $("#textSelected").css("fontStyle", "italic");
              $(".italic-active").css("background", "#eeeeee");
            } else if ($("#textSelected").css("fontStyle") == "italic") {
              $("#textSelected").css("fontStyle", "");
              $(".italic-active").css("background", "");
            }
          }

          //set Text Decoration
          $scope.setTextDecoration = function() {
            if ($("#textSelected").css("textDecoration") != "underline") {
              $("#textSelected").css("textDecoration", "underline");
              $(".textDecoration-active").css("background", "#eeeeee");
            } else if ($("#textSelected").css("textDecoration") == "underline") {
              $("#textSelected").css("textDecoration", "");
              $(".textDecoration-active").css("background", "");
            }
          }

          //set TextAlignLeft
          $scope.setTextAlign = function(textPos) {
            if ($("#textSelected").css("textAlign") != textPos) {
              $("#textSelected").css("textAlign", textPos);
              $(".text" + textPos + "-active").css("background", "#eeeeee");
            } else if ($("#textSelected").css("textAlign") == textPos) {
              $("#textSelected").css("textAlign", "");
              $(".text" + textPos + "-active").css("background", "");
            }
          }

          //set Radius 
          $scope.setRadiusSize = function() {
            $("#textSelected").css("borderRadius", $scope.radius.size + "px");
          }

          //set FontBackgroundColor
          $scope.$watch("setFontBackgroundColor", function(newValue, oldValue) {
            $("#textSelected").css("backgroundColor", newValue);
          });

          //set FontOpacity
          $scope.setFontOpacity = function() {
            $("#textSelected").css("opacity", $scope.opacity.numberValue);
          };

          //set setFontTransform
          $scope.setFontTransform = function() {
            $('#textSelected').css('transform', 'rotate(' + $scope.transform.numberValue + 'deg)');
          }

          //init border style
          $scope.borderStyle = [{
              "borderStyle": "none"
            }, {
              "borderStyle": "dotted"
            }, {
              "borderStyle": "dashed"
            }, {
              "borderStyle": "solid"
            }, {
              "borderStyle": "double"
            }, {
              "borderStyle": "groove"
            }, {
              "borderStyle": "ridge"
            }, {
              "borderStyle": "inset"
            }, {
              "borderStyle": "outset"
            }, {
              "borderStyle": "inherit"
            }]
            //set  border style
          $scope.setBorderStyle = function() {
            $('#textSelected').css('borderStyle', $scope.selected.borderStyle);
          };

          //set font link
          $scope.$watch("setFontLink", function(newValue, oldValue) {
            $("#textSelected").attr("data-link", newValue);
          })

          //set border color
          $scope.$watch("setBorderColor", function(newValue, oldColor) {
            $('#textSelected').css('borderColor', newValue);
          });

          //text animate
          $scope.textAnimate = function() {
            testAnimation($scope.selected);

            function testAnimation(x) {
              $('#textSelected').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                // $(this).removeClass();
              });
            }
          }

          //text link
          $scope.setTextLink = function() {
            if ($("#linkValue").val() != '') {

            }
          }
        },
        templateUrl: './template/fontPropertyPanel.html',
        parent: $document[0].querySelector('#editModulePosition'),
        hideDelay: false
          // position: $scope.getToastPosition()
      });
    } //end of showTextEditPanel function

  function showImageEditPanelOnly($mdToast, $document) {
    $mdToast.show({
      controller: function($scope, $mdDialog) {
        $scope.getImageOpacity = function() {
          $('.ui-selected').css('opacity', $scope.opacity.numberValue);
        }

        //set image Radius 
        $scope.setImageRadiusSize = function() {
            console.log('image radius size works');
            $(".ui-selected >.mImage").css("borderRadius", $scope.imageRadius.size + "px");
          }
        
        testAnimation($scope.selected);

        function testAnimation(x) {
          $('.ui-selected').removeClass().addClass(x + ' animated')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
              $(this).removeClass();
          });
        }
        $('#js--imageAnimations').change(function() {
          var anim = $(this).val()
          console.log(anim + "animate")
          testAnimation(anim);
        });
        // }

        //set image opacity
        $scope.getImageOpacity = function() {
          $('.ui-selected').css('opacity', $scope.opacity.numberValue);
        }

      },
      templateUrl: './template/imagePropertyPanel.html',
      parent: $document[0].querySelector('#editModulePosition'),
      hideDelay: false
        // position: $scope.getToastPosition()
    });


  }


  // show radiobox edit panel if radiobox active
  function showBackgroundEditPanel($mdToast, $document) {
    console.log('showBackgroundEditPanel')
    $mdToast.show({
      controller: function($scope) {
        //set FontColor

        console.log('show panel')
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
  $log, $rootScope, $mdToast,
   $document, projectFn) { // 左侧导航栏位 start --
  
  $scope.feedback = {
    title: '',
    leftpages: [{
      'type': '1'
    }]
  };
  var projectIdInLeftNav = projectFn.getProjectId();
  projectFn.loadEditPage(projectIdInLeftNav).then(function(data) {
    var k = 0;
    k = data.pageLength;
    console.log(k+":page length")
    var colLeftHeight = 140 * k;
    if (k > 1) {
      for (var i = 0; i < k - 1; i++) {
        $scope.feedback.leftpages.push({
          type: '1'
        })
      };
    }

  })


  $scope.addEmptyTemplate = function(index) {
    var n = 0
    $scope.feedback.leftpages.push({
        type: '1',
        page: ''
      }),
      $rootScope.feedback = $scope.feedback;
    var n = $scope.feedback.leftpages.length
    $('#pagesList').append('<div id=right_' + (n) + ' class="swiper-slide isEdit" ></div>');
    $(".swiper-slide").each(function(index, element) {
      $("#right_" + index).hide();
      $("#right_" + index).removeClass('isEdit');

    });

    projectFn.savePageLength(n);
    $rootScope.pageLength = n;
    // $("#right_"+n).show()
    showBackgroundEditPanel($mdToast, $document)
  }

  $scope.choosePage = function(i) {
    $("#right_" + (i + 1)).animate({
      height: '10px'
    });
    $("#right_" + (i + 1)).animate({
      height: '568px'
    });

    $(".swiper-slide").hide();
    $(".swiper-slide").removeClass("isEdit")

    $("#right_" + (i + 1)).show()
    $("#right_" + (i + 1)).addClass("isEdit")
    $(".box>.page").hasClass('col-leftclick') ? $(".box>.page").removeClass('col-leftclick') : '';
    $("#ques_" + (i + 1)).addClass("col-leftclick");

  }
});
