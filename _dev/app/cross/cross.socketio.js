(function () {
    'use strict';

    angular
        .module('chat')
        .factory('socketio', socketio);

    socketio.inject = ['$rootScope', 'constantService'];
    
    function socketio($rootScope, constantService) {

        var vm = this;
        vm.socket = io.connect(constantService.server);

        vm.on = function (eventName, callback) {
            vm.socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(vm.socket, args);
                });
            });
        }
        vm.emit = function (eventName, data, callback) {
            vm.socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(vm.socket, args);
                    }
                });
            });
        }
        return {
            on: vm.on,
            emit: vm.emit
        }
    }

})();