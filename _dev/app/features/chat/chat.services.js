(function () {
    'use strict';

    angular
        .module('chatModule')
        .service('chatService', chatService)

    chatService.$inject = ['$q', '$window', '$http', 'constantService']

    /** @ngInject */
    function chatService($q, $window, $http, constantService) {

        var vm = this;

        return {
            
        }

        
    }

} ());