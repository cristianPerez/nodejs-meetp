(function () {
    'use strict';

    angular
        .module('chat')
        .service('chatService', chatService)

    chatService.$inject = ['$q', '$http', 'constantService']

    /** @ngInject */
    function chatService($q, $http, constantService) {

        var vm = this;

        vm.getChats = function () {
            var deferred = $q.defer();
            $http.get(constantService.getUrlChats(), {
                cache: false,
            })
                .success(function (data) {
                    deferred.resolve({error: false, chats: data});
                })
                .error(function (err) {
                    deferred.resolve({error: true, e: err});
                });
            return deferred.promise;
        };

        return {
            getChats: vm.getChats
        };

    }

}());