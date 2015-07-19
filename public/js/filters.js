/****************************************************************************
 *                                                                          *
 *                      FILTERS                                             *
 *                                                                          *
 *      Filters.js is the sorting functions page                            *       
 *                                                                          *
 *      Every filter is used for specific operation                         *
 *                                                                          *
 *      Created by Ben Ari Kutai && Noam Rom                                *
 *                                                                          *
 ****************************************************************************/

suiteApp

    // This filter sort the friends list by the selected categories 
    .filter('sortByCategory', function() {
        // In the return function, we must pass in a single parameter which contains all the friendsList objects.
        //
        return function(friendsList, selectedCategoryList) {

            var out = [];
            var j = 0;

            //If none of the categories were selected, than return the original friendsList
            if(selectedCategoryList == null || selectedCategoryList.length == 0){
                return friendsList;
            }

            //Running on friendsList array to check if someone has the same category._id
            angular.forEach(friendsList,function(friend){
                if(friend.categories.length != 0) {
                    for (var i = 0; i < friend.categories.length; i++) {
                        if(selectedCategoryList.indexOf(friend.categories[i]) != -1){
                            //if HERE we found a match --> Let's push it to the new list
                            j++;
                        }
                    }
                    if(j == selectedCategoryList.length){
                        out.push(friend);
                    }
                }
                j = 0;
            });
            return out;
        }

    })

    // This filter sort the friends list by the selected circles 
    .filter('sortByCircle', function() {
    // In the return function, we must pass in a single parameter which contains all the friendsList objects.
    return function(friendsList, selectedCircle) {

        var out = [];
        var j = 0;

        //If none of the circles were selected, than return the original friendsList
        if(selectedCircle == null || selectedCircle.length == 0){
            return friendsList;
        }

        //Running on friendsList array to check if someone has the same circle._id
        angular.forEach(friendsList,function(friend){
            if(friend.circles.length != 0) {
                for (var i = 0; i < friend.circles.length; i++) {
                    if(selectedCircle.indexOf(friend.circles[i].value) != -1){
                        //if HERE we found a match --> Let's push it to the new list
                        j++;
                    }
                }
                if(j == selectedCircle.length){
                    out.push(friend);
                }
            }
            j = 0;
        });
        return out;
    }

})

    // This filter return a new array, that his cells are between the start index 
    // and the end index (which were sent as function's parameters)
    .filter('slice', function() {
        return function(arr, start, end) {
            return (arr || []).slice(start, end);
        };
});