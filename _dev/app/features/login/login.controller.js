(function () {
    'use strict';

    angular
        .module('chat')
        .controller('loginController', loginController)

    loginController.$injejct = ['$state', 'chatService', 'utilitiesService'];

    function loginController($state, utilitiesService) {
        var vm = this;
        vm.client = {};
        vm.messagevalidation = false;
        vm.class = 'form-input form-input-valid';

        if(utilitiesService.getLocalStorageItem("nickname") != null || utilitiesService.getLocalStorageItem("nickname") != undefined){
            $state.go('chat');
        }

        vm.login = function() {
            utilitiesService.setLocalStorageItem("nickname", vm.client.nickname);
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