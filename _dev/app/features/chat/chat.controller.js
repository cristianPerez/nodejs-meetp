(function () {
    'use strict';

    angular
        .module('chat')
        .controller('chatController', loginController)

    loginController.$injejct = ['$state', 'chatService', 'constantServiceString', '$rootScope'];

    /** @ngInject */
    function loginController($state, chatService, constantServiceString, $rootScope) {
        var vm = this;
        vm.chats = [];

        vm.getChats = function() {
            chatService.getChats().then(function(data){
                console.log(data);
                vm.chats = data.chats;
            });
        };

        vm.getChats();
    }

} ());