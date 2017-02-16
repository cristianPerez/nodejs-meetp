"use strict";

angular
    .module('chat')
    .config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function routes($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
        .state('chat', {
            url: '/',
            templateUrl: 'app/features/chat/chat.view.html',
            controller: 'chatController as chatCtrl'
        })

    $urlRouterProvider.otherwise('/')
}