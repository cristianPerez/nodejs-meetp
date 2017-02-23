(function () {
    'use strict';

    angular
        .module('chat')
        .controller('loginController', loginController)

    loginController.$injejct = ['$state', 'chatService', 'socketio', 'utilitiesService'];

    /** @ngInject */
    function loginController($state, socketio, utilitiesService) {
        var vm = this;
        vm.client = {};
        vm.messagevalidation = false;
        vm.class = 'form-input form-input-valid';

        vm.login = function() {
            utilitiesService.setLocalStorageItem("nickname", vm.client.nickname);
            socketio.emit('user-new', vm.client.nickname);
            $state.go('chat');
        };

        vm.validate = function (valid) {
            if (!valid) {
                vm.messagevalidation = true;
                vm.class = 'form-input form-input-invalid';
            }
        }
    }

} ());