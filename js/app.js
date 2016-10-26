(function () {
	'use strict';
	
	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('NarrowItDownService', NarrowItDownService)
		.directive('foundItems', FoundItemsDirective)
		.constant('BASE_URL', 'https://davids-restaurant.herokuapp.com');

	NarrowItDownController.$inject = ['$scope', 'NarrowItDownService'];

	function NarrowItDownController($scope, narrowItDownService) {
		var list = this;

		list.foundItems = [];
		list.narrowItDown = function() {
			narrowItDownService.getMatchedMenuItems(list.searchTerm).then(function(foundItems)
				{
					list.foundItems = foundItems;
				});
		};

		list.removeItem = function(index) {
			list.foundItems.splice(index, 1);
		}
	}


	function FoundItemsDirective() {
	  var ddo = {
	    templateUrl: 'foundItems.html',
	    scope: {
	      items: '<',
	      onRemove: '&'
	    },
	    controller: FoundItemsDirectiveController,
	    controllerAs: 'list',
	    bindToController: true
	  };

	  return ddo;
	}

	function FoundItemsDirectiveController() {


	}


	NarrowItDownService.$inject = ["$http", "BASE_URL", "$q"];
	function NarrowItDownService($http, BASE_URL, $q) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {

			return $http.get(BASE_URL + '/menu_items.json').then(function(result) {
				var items = result.data.menu_items;
				var founds= items.filter(function(item) {
					return item.description.indexOf(searchTerm) > -1;
				});
				return $q.resolve(founds);
			});
		}
	}

})();