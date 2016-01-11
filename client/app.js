/**
 * Created by rohran01 on 1/9/16.
 */
var app = angular.module('app', []);

app.controller('IndexController', ['$scope', '$http', function($scope, $http) {
    $scope.cat = {};
    $scope.cats = [];

    var fetchCats = function() {
        return $http.get('/cats').then(function(response) {
            if (response.status !== 200) {
                throw new Error('Mewston, we have a problem...');
            }
            $scope.cat = {};
            $scope.cats = response.data;
            $scope.numberCats = response.data.length;
        })
    };
    $scope.addCat = function(cat) {
        return $http.post('/add', cat).then(fetchCats());
    };

    fetchCats();

    // I tried to add a delete function, but it wasn't working :'(


    //$scope.removeCat = function(kitty) {
    //    console.log(kitty);
    //    return $http.delete('/remove', kitty).then(fetchCats());
    //};


}]);