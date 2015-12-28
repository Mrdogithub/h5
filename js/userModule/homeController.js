var homeController = angular.module('homeController', ['ngMaterial']);
homeController.controller('homeController', function($scope, $mdSidenav) {
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

}).controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log,$mdDialog) {
  var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        scrollbarDraggable:true,
        direction: 'vertical',
        effect:'fade'
    });

  $scope.removePage = function(){
    $('.swiper-slide-active').remove();
  }
  $scope.previewPage = function(ev) {
  $('.mainContent').css('filter','blur(5px)');
  clearTextSelectedStatus();
    $mdDialog.show({
      controller: DialogController,
      template:'<md-dialog ng-cloak style="padding:0;max-height: 100%;"><md-dialog-content style="padding:0;"><div class="swiper-container" style="width:500px;height:700px;"><div class="swiper-wrapper" id="previewPage">'+$('#editPage').html()+'</div></div></md-dialog-content><md-dialog-actions layout="row"></md-dialog-actions></md-dialog><script>var swiper = new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:true,direction:"vertical",effect:"fade"})</script>',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
        $('#previewPage').html('<div>hiiiiiii</div>');
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
       $('.mainContent').css('filter','');
      $scope.status = 'You cancelled the dialog.';
    });
  };



function DialogController($scope, $mdDialog) {
  $('.mainContent').css('filter','blur(5px)');
  $('#previewPage').data('text')? $('#previewPage').data('text').css('border','none'):'';

  var pageContent = $('#editPage').html();
  $scope.previewContent = pageContent;
  console.log('pageContent:'+pageContent);
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}





  $scope.createNewPage = function(){
    //$('.swiper-slide').removeClass('swiper-slide-active');
    var newSlide = $('<div class="swiper-slide"></div>');
    newSlide.appendTo($('.swiper-wrapper'));
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        effect:'fade'
    });
  }

  $scope.remove = function(){
    $('#textSelected').remove();
    $('#imageSelected').remove();
  };

/*Remove Text border*/
function clearTextSelectedStatus (){
  $('#textSelected').css({'border':'','resize':'','overflow':''});
  $('#textSelected').attr('id','');
}
  $scope.createText = function(){
      clearTextSelectedStatus();
      var textDiv = $("<div  id='textSelected' data-type='text'  contentEditable='true' style=' position: absolute; top: 50%; left: 50%;  margin-left: -80px; margin-top: -120px; resize:both; overflow:hidden; min-width:100px; padding:5px;border:1px solid #000; min-height:40px;'></div>");
      var currentPage = $('.swiper-slide-active');
      textDiv.appendTo(currentPage);
      $('#textSelected').draggable({'position':'absolute'});
      $('.swiper-wrapper').attr('style','');
      $('div.swiper-slide-active div').on('click',function(event){
            console.log('text click');
            event.stopPropagation();
            $(this).focus();
            $('div.swiper-slide-active div').attr('id','');
            $('div.swiper-slide-active div').css({'border':'','resize':'','overflow':''});
            $(this).data('type') == 'text' ?$(this).attr('id','textSelected').css({'border':'#dedede 1px dashed','resize':'both','overflow':'hidden'}):'';
      });
  };
  $scope.color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  };

  $scope.fontsize = {
    size:Math.floor(Math.random() * 255)
  }
  $scope.opacity = {
    value:'1'
  }
  $scope.transform = {
    value:'1'
  }
  $scope.getFontSize = function(){
    console.log($scope.fontsize.size+"//// fontsize");
    $('#textSelected').css('fontSize',$scope.fontsize.size+"px");
  };

  $scope.getFontOpacity = function(){
     $('#textSelected').css('opacity',$scope.opacity.numberValue);
  };

 $scope.getFontTransform = function(){
   console.log('click'+$scope.transform.numberValue);
   $("#textSelected").css('background','red');
   $('#textSelected').css('transform','rotate('+$scope.transform.numberValue+'deg)');
   //,'-o-transform':'rotate('+ $scope.transform.numberValue +' deg)','-webkit-transform':'rotate('+ $scope.transform.numberValue +' deg)','-moz-transform':'rotate('+ $scope.transform.numberValue +' deg)','-ms-transform':'rotate('+ $scope.transform.numberValue +' deg)'}
 }


    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.toggleRightImage = buildToggler('rightImgTab');
    //call text functions

    $scope.textB = function (){
 
 
      $('#textSelected').toggleClass('fontWeight','bold');
     
    };
    $scope.textI = function(){
      $('#textSelected').css('fontStyle','italic');
    }
    $scope.textU = function(){
      $('#textSelected').css('textDecoration','underline');
    }

    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    $scope.isOpenLeft = function(){
      return $mdSidenav('left').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }





    /*Text Blod*/

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            
            // var textDiv = $('<div style="width:100px; height:100px; background:red;" class="dragme"></div>');
      
   
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log,$mdDialog) {
$scope.addLink = function(ev) {
  console.log('add link works');
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
   $scope.$watch('setFontColor',function(newColor,oldColor){
     $('#textSelected').css('color',newColor);
   })
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  }).controller('rightImgTabCtrl', function ($scope, $timeout, $mdSidenav, $log,$mdDialog) {
    


 $scope.status = '  ';
  $scope.addLink = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };

  $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './template/addImage.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    }).then(function(answer) {

          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };


function DialogController($scope, $mdDialog) {
  $scope.selectImage = function(target){
    console.log(target);
    $('#imageSelected').attr('id','')
    var oImage = $('<div data-type="image"  id="imageSelected" style="position: absolute; top: 50%; left: 50%;  margin-left: -80px; margin-top: -120px; resize:both; overflow:hidden; min-width:300px; min-height:200px;"><img src="./images/'+target+'" style="width:100%;height:100%"><div>')

    var currentPage = $('.swiper-slide-active');
    oImage.appendTo(currentPage);
 $('#imageSelected').draggable();
      $('div.swiper-slide-active div').on('click',function(event){
            event.stopPropagation();
            $(this).focus();
            $('div.swiper-slide-active div').attr('id','');
            $(this).data('type') == 'image' ? $(this).attr('id','imageSelected'):'';
            $(this).css('border','#dedede 1px dashed');


      });
  }
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}


   $scope.$watch('backgroundColor',function(newColor,oldColor){
    console.log('newColor'+newColor+"///"+"oldColor"+oldColor);
    $('.swiper-slide-active').css('backgroundColor',newColor);
   })


    $scope.close = function () {
      $mdSidenav('rightImgTab').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  }).controller('SelectAsyncController', function($timeout, $scope) {
  $scope.animations = null;
  $scope.animation = null;
  $scope.loadUsers = function() {
    // Use timeout to simulate a 650ms request.

    return $timeout(function() {
      $scope.animations =  $scope.animations  || [
        { id: 1, name: 'bounce' },
        { id: 2, name: 'flash' },
        { id: 3, name: 'pulse' },
        { id: 4, name: 'rubberBand' },
        { id: 5, name: 'swing' }
      ];
    }, 10);
  };
}).controller('createPageController',function($timeout,$scope){

	var tabs = [],
        selected = null,
        previous = null;
    $scope.tabs  = tabs;
    $scope.selectedIndex = 1;
    
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      //selected = tabs[current];
      selected = current;

      $('#tab'+old).attr('class','');
      if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
      if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');


    });
    var indexNum =1;	
    $scope.addTab = function (title, view) {
      view = 'New Page #'+indexNum || title + " Content View";
      $scope.pageStatus = 'active';
      tabs.push({ title:indexNum , content: view, disabled: false});
      $scope.selectedIndex = $scope.selectedIndex+1;
      indexNum++;
      console.log($scope.selectedIndex+"//$scope.selectedIndex");
    };
    $scope.removeTab = function (tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };
}).controller('SelectAnimation',function($scope){

  function testAnimation(x){
    $('#textSelected').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      // $(this).removeClass();
    });
  }
  $('#js--animations').change(function(){
    var anim = $(this).val()
    testAnimation(anim);
  });  
}).controller('SelectImageAnimation',function($scope){

  function testAnimation(x){
    $('#imageSelected').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      // $(this).removeClass();
    });
  }
  $('#js--imageAnimations').change(function(){
    var anim = $(this).val()
    testAnimation(anim);
  });  
});