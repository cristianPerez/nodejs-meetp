(function () {
    "use strict";

    angular
        .module('chat')
        .factory('constantServiceString', constantServiceString);

    constantServiceString.$inject = ['$q', '$http'];

    function constantServiceString($q, $http) {

        var vm = this;

        vm.getStrings = getStrings;

        function getStrings() {
            var deferred = $q.defer();
            $http.get('../../strings_spanish.json', {
                cache: true
            }).success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        return {
            getStrings: vm.getStrings
        }
    }
})();