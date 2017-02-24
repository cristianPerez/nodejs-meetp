(function () {
    'use strict';

    angular
        .module('chat')
        .controller('chatController', loginController)

    loginController.$injejct = ['$state', 'chatService', 'socketio', 'utilitiesService'];

    /** @ngInject */
    function loginController($state, chatService, socketio, utilitiesService) {
        var vm = this;
        vm.users= [];
        vm.chats = [];
        vm.message;
        vm.nick;
        vm.gif = false;

        if(utilitiesService.getLocalStorageItem("nickname") == null || utilitiesService.getLocalStorageItem("nickname") == undefined){
            $state.go('login');
        }

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
                word = vm.message.split("#giphy");
                if(word[1] != undefined){
                    newMessage.message = word[1].trim();
                    socketio.emit('req-message-gif', newMessage);
                    vm.gif = false;
                }
            }
        };

         vm.sendgif = function(){
            vm.message = "#giphy ";
            vm.gif = true;
        };

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
            
        };

        vm.logOut = function(){
            utilitiesService.removeLocalStorageItem("nickname");
            $state.go('login');
        };
     
        vm.getChat();
        vm.getUsers();
        vm.chat();
    }

} ());