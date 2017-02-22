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
        vm.message;
        vm.nick;

        vm.getChat = function() {
            chatService.getChat().then(function(data){
                console.log(data);
                vm.chats = data.chats;
            });
        };

        vm.newMessage = function(){
            var newMessage = { id: 1, message: vm.message, nick: 'johnaagude' };
            vm.chats.push(newMessage);
            vm.message = "";
            socketio.emit('send-message', newMessage);
        }

        vm.chat = function(){
            socketio.on('new-message', function(message){
                console.log(message);
                vm.chats.push(message);
            });
        }
     
        vm.getChat();
        vm.chat();
    }

} ());