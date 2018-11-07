(function() {
  'use strict';

  angular
    .module('walleWidgetsApp')
    .controller('WidgetsController', WidgetsController);

  WidgetsController.$inject = ['$scope', 'widgetsService'];

  function WidgetsController($scope, widgetsService) {

    init();

    function init() {
      $scope.widgetsData = widgetsService.widgetsData;
      $scope.handleSelectedColorFilter = widgetsService.handleSelectedColorFilter;
      $scope.sortColors = widgetsService.sortColors;
      $scope.newWidget = widgetsService.newWidget.widget;
      $scope.createWidget = widgetsService.createWidget;

      widgetsService.getAllWidgets();
      widgetsService.getAllMachines();
      widgetsService.getAllSizes();
    }
  }
}());
