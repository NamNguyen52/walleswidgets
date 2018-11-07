(function() {
  'use strict';

  angular
    .module('walleWidgetsApp')
    .service('widgetsApiService', widgetsApiService);

  widgetsApiService.$inject = ['$http'];

  function widgetsApiService($http) {
    let me = this;
    let baseUrl = 'https://walles-widgets.herokuapp.com'

    me.getAllWidgets = getAllWidgets;
    me.getAllMachines = getAllMachines;
    me.getAllSizes = getAllSizes;
    me.createWidget = createWidget;

    function getAllWidgets() {
      return $http({
        method: 'GET',
        url: `${baseUrl}/widgets.json`
      });
    }

    function getAllMachines() {
      return $http({
        method: 'GET',
        url: `${baseUrl}/machines.json`
      });
    }

    function getAllSizes() {
      return $http({
        method: 'GET',
        url: `${baseUrl}/sizes.json`
      });
    }

    function createWidget(newWidget) {
      return $http({
        method: 'POST',
        url: `${baseUrl}/widgets.json`,
        data: newWidget
      });
    }
  }
}());
