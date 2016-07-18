(function(){
    'use strict';
    angular.module('common.directives')

        .directive('isolateScopeWithController', function () {


            var controller = function () {

                var vm = this;
                function init() {
                    vm.items = angular.copy(vm.datasource);
                }

                init();

                vm.addItem = function () {
                    vm.add();

                    //Add new customer to directive scope
                    vm.items.push({
                        name: 'New Directive Controller Item'
                    });
                };

            }


            var template = '<button ng-click="vm.addItem()">Add Item</button>' +
                '<ul><li ng-repeat="item in vm.items">{{ ::item.name }}</li></ul>';

            return {
                restrict: 'EA', //Default for 1.3+
                scope: {
                    datasource: '=',
                    add: '&',
                },
                controller: controller,
                controllerAs: 'vm',
                bindToController: true, //required in 1.3+ with controllerAs
                template: template
            };

        });

})()
