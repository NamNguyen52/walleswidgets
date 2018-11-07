(function() {
  'use strict';

  angular
    .module('walleWidgetsApp')
    .service('widgetsService', widgetsService);

  widgetsService.$inject = ['$filter', 'widgetsApiService'];

  function widgetsService($filter, widgetsApiService) {
    let me = this;

    me.getAllWidgets = getAllWidgets;
    me.getAllMachines = getAllMachines;
    me.getAllSizes = getAllSizes;
    me.handleSelectedColorFilter = handleSelectedColorFilter;
    me.sortColors = sortColors;
    me.createWidget = createWidget;

    init();

    function init() {
      me.widgetsData = {
        widgets: [],
        widgetsCopy: [],
        machines: [],
        sizes: [],
        filterColors: [],
        selectedColorFilters: [],
        isSortAscend: false
      };
      me.newWidget = {
        widget: {
          name: '',
          description: '',
          color: '',
          size_id: null,
          machine_id: null
        }
      };
    }

    function clearNewWidget() {
      let newWidget = me.newWidget.widget;
      newWidget.name = '';
      newWidget.description = '';
      newWidget.color = '';
      newWidget.size_id = null;
      newWidget.machine_id = null;
    }

    function getAllWidgets() {
      widgetsApiService.getAllWidgets()
        .then(getAllWidgetsSuccess)
        .catch(apiError);
    }

    function getAllWidgetsSuccess(res) {
      me.widgetsData.widgets = res.data;
      me.widgetsData.widgetsCopy = angular.copy(res.data);
      getWidgetColors(res.data);
    }

    function getAllMachines() {
      widgetsApiService.getAllMachines()
        .then(getAllMachinesSuccess)
        .catch(apiError);
    }

    function getAllMachinesSuccess(res) {
      me.widgetsData.machines = res.data;
    }

    function getAllSizes() {
      widgetsApiService.getAllSizes()
        .then(getAllSizesSuccess)
        .catch(apiError);
    }

    function getAllSizesSuccess(res) {
      me.widgetsData.sizes = res.data;
    }

    function getWidgetColors(widgets) {
      widgets.forEach(widget => {
        if (!me.widgetsData.filterColors.includes(widget.color)) {
          me.widgetsData.filterColors.push(widget.color);
        }
      });
    }

    function handleSelectedColorFilter(color) {
      let indexOfColor = me.widgetsData.selectedColorFilters.indexOf(color);
      if (indexOfColor !== -1) {
        me.widgetsData.selectedColorFilters.splice(indexOfColor,1);
      } else {
        me.widgetsData.selectedColorFilters.push(color);
      }

      if (me.widgetsData.selectedColorFilters.length === 0) {
        me.widgetsData.widgets = me.widgetsData.widgetsCopy;
        return;
      }

      me.widgetsData.widgets = filterByColors(me.widgetsData.selectedColorFilters);
    }

    function filterByColors(selectedColorFilters) {
      return me.widgetsData.widgetsCopy.filter(widget => {
        return selectedColorFilters.includes(widget.color);
      });
    }

    function sortColors() {
      me.widgetsData.isSortAscend = !me.widgetsData.isSortAscend;
      me.widgetsData.widgets = $filter('orderBy')(me.widgetsData.widgets, 'color', me.widgetsData.isSortAscend);
    }

    function createWidget() {
      widgetsApiService.createWidget(me.newWidget)
        .then(createWidgetSuccess)
        .catch(apiError);
    }

    function createWidgetSuccess(res) {
      me.widgetsData.widgets.push(res.data);
      me.widgetsData.widgetsCopy.push(res.data);
      clearNewWidget();
    }

    function apiError() {
      alert('Error completing request');
    }
  }
}());
