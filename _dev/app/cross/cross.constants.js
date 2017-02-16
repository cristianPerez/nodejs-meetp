(function () {
    "use strict";

    angular
        .module('chat')
        .factory('constantService', constantService);

    constantService.$inject = ['$rootScope'];

    function constantService($rootScope) {

        var vm = this;

        vm.endponint = '';

        vm.getUrl = function (type) {
            return vm.endponint + type + '/?secret_key=' + vm.secret_key + "&city=" + $rootScope.city;
        }

        return {
            getUrl: vm.getUrl,
        }

    }
})();
