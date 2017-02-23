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

        vm.getUrlChat = function () {
            return vm.endponint + '/api/getchats';
        };

        vm.getUrlUsers = function () {
            return vm.endponint + '/api/users';
        };

        return {
            server: vm.endponint,
            getUrlChat: vm.getUrlChat,
            getUrlUsers: vm.getUrlUsers
        }

    }
})();
