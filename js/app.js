(function () {
	'use strict';
	
	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('NarrowItDownService', NarrowItDownService)
		.constant('BASE_URL', 'https://davids-restaurant.herokuapp.com');

	NarrowItDownController.$inject = ['$scope', 'NarrowItDownService'];

	function NarrowItDownController($scope, narrowItDownService) {
		$scope.narrowItDown = function() {
			narrowItDownService.getMatchedMenuItems($scope.searchTerm);
		};
	}

	NarrowItDownService.$inject = ["$http", "BASE_URL"];
	function NarrowItDownService($http, BASE_URL) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {

			$http.get(BASE_URL + '/menu_items.json').then(function(result) {
				var promise = new Promise();
				var items = result.data.menu_items;
				var founds= items.filter(function(item) {
					return item.description.indexOf(searchTerm) > -1;
				});
				promise.resolve(founds);
				return promise;				
			});
		}
	}

})();