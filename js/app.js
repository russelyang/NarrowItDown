(function () {
	'use strict';
	
	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController);

	NarrowItDownController.$inject = ['$scope'];

	function NarrowItDownController($scope) {
		$scope.message = "start";
	}

})();