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
        vm.menu = '';
        vm.nickname_storage = utilitiesService.getLocalStorageItem("nickname"); 

        if(vm.nickname_storage == null || vm.nickname_storage == undefined){
            $state.go('login');
        }
        else{
            socketio.emit('user-new', vm.nickname_storage);
        }

        vm.getChat = function() {
            chatService.getChat().then(function(data){
                vm.chats = data.chats;
            });
        };

        vm.getUsers = function() {
            chatService.getUsers().then(function(data){
                vm.users = data.users;
            });
        };

        vm.newMessage = function(){
            var newMessage = { id: 1, message: "", nick: vm.nickname_storage, gif: "" };
            if(!vm.gif){
                newMessage.message = vm.message;
                vm.chats.push(newMessage);
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
            vm.message = "";
        };

         vm.sendgif = function(){
            vm.message = "#giphy ";
            vm.gif = true;
        };

        vm.chat = function(){
            socketio.on('new-message', function(message){
                vm.chats.push(message);
            });
            socketio.on('res-message-gif', function(message){
                 vm.chats.push(message);
            })
            socketio.on('active-users', function(users){
                 vm.users = users;
            })

            socketio.on('user-name', function(user_name) {
                vm.nickname_storage = user_name;
            })

        };

        vm.logOut = function(){
            utilitiesService.removeLocalStorageItem("nickname");
            socketio.emit("logout", vm.nickname_storage);
            $state.go('login');
        };

        vm.openMenu = function(){
            vm.menu = 'open';
        }

        vm.closeMenu = function(){
            vm.menu = '';
        }
     
        vm.getChat();
        vm.getUsers();
        vm.chat();
    }

} ());