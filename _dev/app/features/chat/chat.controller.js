(function () {
    'use strict';

    angular
        .module('chat')
        .controller('chatController', loginController)

    loginController.$injejct = ['$state', 'chatService', 'constantServiceString', '$rootScope', 'socketio'];

    /** @ngInject */
    function loginController($state, chatService, constantServiceString, $rootScope, socketio) {
        var vm = this;
        vm.chats = [];

        vm.getChat = function() {
            chatService.getChat().then(function(data){
                console.log(data);
                vm.chats = data.chats;
            });
        };

        vm.chat = function(){
            socketio.on('pong', function(){
                console.log('PONG');
            });
            socketio.emit('ping')
        }
     
        vm.getChat();
        vm.chat();
    }

} ());