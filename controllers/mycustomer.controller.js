function createDirective(name){
    return function(){
        return {
            restrict: 'E',
            compile: function(tElem, tAttrs){
                console.log(name + ': compile => ' + tElem.html());
                return {
                    pre: function(scope, iElem, iAttrs){
                        console.log(name + ': pre link => ' + iElem.html());
                    },
                    post: function(scope, iElem, iAttrs){
                        console.log(name + ': post link => ' + iElem.html());
                    }
                }
            }
        }
    }
}

(function(){
    'use strict';
angular.module('myMenuApp.controllers')
    .controller('CustomerController', ['$scope', function($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
       $scope.format = 'M/d/yy h:mm:ss a';
    }])
    . directive('myCustomer', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/my-customer.html'
        };
    })
    .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

        function link(scope, element, attrs) {
            var format,
                timeoutId;

            function updateTime() {
                element.text(dateFilter(new Date(), format));
            }

            scope.$watch(attrs.myCurrentTime, function (value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function () {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function () {
                updateTime(); // update DOM
            }, 1000);
        }

        return {
            link: link
        }

    }])
    .directive('levelOne', createDirective('levelOne'))
    .directive('levelTwo', createDirective('levelTwo'))
    .directive('levelThree', createDirective('levelThree'));
})();




