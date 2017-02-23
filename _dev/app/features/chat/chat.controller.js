(function () {
    'use strict';

    angular
        .module('chat')
        .controller('chatController', loginController)

    loginController.$injejct = ['$state', 'chatService', 'socketio'];

    /** @ngInject */
    function loginController($state, chatService, socketio) {
        var vm = this;
        vm.users= [];
        vm.chats = [];
        vm.message;
        vm.nick;
        vm.gif = false;

        vm.getChat = function() {
            chatService.getChat().then(function(data){
                console.log(data);
                vm.chats = data.chats;
            });
        };

        vm.getUsers = function() {
            chatService.getUsers().then(function(data){
                console.log(data);
                vm.users = data.users;
            });
        };

        vm.newMessage = function(){
            var newMessage = { id: 1, message: "", nick: 'johnaagude', gif: "" };
            if(!vm.gif){
                newMessage.message = vm.message;
                vm.chats.push(newMessage);
                vm.message = "";
                socketio.emit('send-message', newMessage);
            } else {
                var word = "";
                word = vm.message.split(" ");
                if(word != undefined){
                    newMessage.message = vm.message;
                    socketio.emit('req-message-gif', newMessage);
                    vm.gif = false;
                }
            }
        }

         vm.sendgif = function(){
            vm.message = "#giphy ";
            vm.gif = true;
        }

        vm.chat = function(){
            socketio.on('new-message', function(message){
                console.log(message);
                vm.chats.push(message);
            });
            socketio.on('res-message-gif', function(message){
                 vm.chats.push(message);
                 vm.message = "";
            })
            socketio.on('active-users', function(users){
                 vm.users = users;
            })
            
        }
     
        vm.getChat();
        vm.getUsers();
        vm.chat();
    }

} ());