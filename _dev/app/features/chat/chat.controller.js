(function () {
    'use strict';

    angular
        .module('chatModule')
        .controller('chatController', loginController)

    loginController.$injejct = ['$state', 'chatService', 'constantServiceString', '$rootScope'];

    /** @ngInject */
    function loginController($state, chatService, constantServiceString, $rootScope) {
        var vm = this;

        init();

        function init() {

            constantServiceString.getStrings().then(function (data) {
                vm.strings = data;
            });

        }

    }

} ());