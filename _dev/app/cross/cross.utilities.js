(function () {
    "use strict";

    angular
        .module('chat')
        .factory('utilitiesService', utilitiesService);

    utilitiesService.$inject = [];

    function utilitiesService() {

        var vm = this;

        /**
         * Método para obtener el valor alamacenado en localstorage en una clave la que debe ser ingresada por parametro.
         * @method getLocalStorageItem
         * @public
         * @params key
         * @return data
         */
        vm.getLocalStorageItem = function (key) {
            var data = localStorage.getItem(key);
            if (!data) {
                data = undefined;
            } else {
                data = JSON.parse(data);
            }
            return data;
        };

        /**
         * Método para alamacenar el valor y su clave en localstorage, ambos entran por parametro.
         * @method setLocalStorageItem
         * @public
         * @params key, value
         */
        vm.setLocalStorageItem = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }

        /**
         * Método para remover el valor de una clave en localstorage, entra por parametro la clave a eliminar.
         * @method removeLocalStorageItem
         * @public
         * @params key
         */
        vm.removeLocalStorageItem = function (key) {
            localStorage.removeItem(key);
        };

        return {
            getLocalStorageItem : vm.getLocalStorageItem,
            setLocalStorageItem : vm.setLocalStorageItem,
            removeLocalStorageItem :  vm.removeLocalStorageItem
        };

    }
})();