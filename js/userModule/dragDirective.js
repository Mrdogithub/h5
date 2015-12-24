var dragDirective = angular.module('dragDirective', []);


// irective for a single list
dragDirective.directive('dragContainer', function($parse) {

    return function(scope, element, attrs) {

        //alert('directive works');
        console.log(element+">>> element");
        // variables used for dnd
        var toUpdate;
        var startIndex = -1;
          $(element[0]).on('click',function(event){
        

           console.log(element[0]+'////');

            });

        // watch the model, so we always know what element
        // is at a specific position
        scope.$watch(attrs.dragContainer, function(value) {
            toUpdate = value;
        },true);

        // use jquery to make the element sortable (dnd). This is called
        // when the element is rendered

       


        $(element[0]).sortable({
            items:'#textSelected',
            start:function (event, ui) {
                // on start we define where the item is dragged from
                // startIndex = ($(ui.item).index());
               // alert('drag works');
            },
            stop:function (event, ui) {
                // on stop we determine the new index of the
                // item and store it there
                // var newIndex = ($(ui.item).index());
                // var toMove = toUpdate[startIndex];
                // toUpdate.splice(startIndex,1);
                // toUpdate.splice(newIndex,0,toMove);

                // we move items in the array, if we want
                // to trigger an update in angular use $apply()
                // since we're outside angulars lifecycle
                // scope.$apply(attrs.dragContainer);
            },
            revert:true
        })
    }
});