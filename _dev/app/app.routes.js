"use strict";

angular
    .module('chat')
    .config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function routes($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'app/features/login/login.view.html',
            controller: 'loginController as login'
        })
        .state('chat', {
            cache: false,
            url: '/chat',
            templateUrl: 'app/features/chat/chat.view.html',
            controller: 'chatController as chatCtrl'
        });

    $urlRouterProvider.otherwise('/')
}