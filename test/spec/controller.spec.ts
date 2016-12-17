0/**
 * Created by ruyang on 12/14/2016.
 */

describe('Controller', () => {
    var $controller;
    var NarrowItDownService;

    beforeEach(() => {
        angular.mock.module("NarrowItDownApp");
    });

    beforeEach(angular.mock.inject(function(_$controller_, _NarrowItDownService_) {
        $controller = _$controller_;
        NarrowItDownService = _NarrowItDownService_;
    }));

    it('should have isLoading true', () => {
        interface T {
            loading : boolean,
            foundItems: any[]
        }

        var $scope = {};
        var controller : T = $controller('NarrowItDownController', {
            "$scope" : $scope,
            "NarrowItDownService" : NarrowItDownService
        });
        expect(controller.loading).toBe(false);
        expect(controller.foundItems.length).toBe(0);
    });
});

