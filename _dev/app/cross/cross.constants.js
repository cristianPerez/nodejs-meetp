(function () {
    "use strict";

    angular
        .module('chat')
        .factory('constantService', constantService);

    constantService.$inject = ['$rootScope'];

    function constantService($rootScope) {

        var vm = this;
        //DEVELOP
        vm.endponint = 'http://localhost:3000';

        //PRODUCCION
        //vm.endponint = 'https://pragmachat.herokuapp.com';

        vm.endponint = '';

        vm.getUrlChats = function () {
            return vm.endponint + '/api/getchats';
        };

        return {
            getUrlChats: vm.getUrlChats
        }

    }
})();
