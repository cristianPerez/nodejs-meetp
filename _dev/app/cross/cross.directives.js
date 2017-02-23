(function () {
    'use strict';

    angular.module('chat')

        .directive('dlEnterKey', function () {
            return function (scope, element, attrs) {

                element.bind("keydown keypress", function (event) {
                    var keyCode = event.which || event.keyCode;

                    // If enter key is pressed
                    if (keyCode === 13) {
                        scope.$apply(function () {
                            // Evaluate the expression
                            scope.$eval(attrs.dlEnterKey);
                        });

                        event.preventDefault();
                    }
                });
            };
        })
        .directive('scrollToBottom', function ($timeout, $window) {
            return {
                scope: {
                    scrollToBottom: "="
                },
                restrict: 'A',
                link: function (scope, element, attr) {
                    scope.$watchCollection('scrollToBottom', function (newVal) {
                        if (newVal) {
                            $timeout(function () {
                                element[0].scrollTop = element[0].scrollHeight;
                            }, 0);
                        }

                    });
                }
            };
        });


}());
