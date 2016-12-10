(function () {
	'use strict';
	
	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('NarrowItDownService', NarrowItDownService)
		.directive('foundItems', FoundItemsDirective)
		.directive('itemsLoaderIndicator', function() {

			function link(scope, element, attributes) {
				console.log(scope);
				/*
				scope.$watch("list.loading", function(newValue, oldValue) {
					if (newValue) {
						//show loader
						element.find('div').css("display", "block");
					} else {
						//hide loading
						element.find('div').css("display", "none");
					}

				});
				*/
			}

			return {
				templateUrl: 'loader/itemsloaderindicator.template.html',
				link : link
			}
		})
		.constant('BASE_URL', 'https://davids-restaurant.herokuapp.com');

	NarrowItDownController.$inject = ['$scope', 'NarrowItDownService'];

	function NarrowItDownController($scope, narrowItDownService) {
		var list = this;

		list.loading = false;

		list.foundItems = [];
		list.narrowItDown = function() {
			list.loading = true;
			narrowItDownService.getMatchedMenuItems(list.searchTerm).then(function(foundItems)
				{
					list.foundItems = foundItems;
					list.loading = false;
				});
		};

		list.removeItem = function(index) {
			narrowItDownService.removeItem(index);
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

	NarrowItDownService.$inject = ["$http", "BASE_URL"];
	function NarrowItDownService($http, BASE_URL, $q) {
		var service = this;

		service.founds = [];
		service.getMatchedMenuItems = function(searchTerm) {

			return $http.get(BASE_URL + '/menu_items.json').then(function(result) {
				var items = result.data.menu_items;
				service.founds= items.filter(function(item) {
					return item.description.indexOf(searchTerm) > -1;
				});
				return service.founds;
			});
		}

		service.removeItem = function(index) {
			service.founds.splice(index,1);
		}
	}

})();