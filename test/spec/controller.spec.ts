/**
 * Created by ruyang on 12/14/2016.
 */

describe('Controller', () => {
    var $controller;

    beforeEach(() => {
        angular.mock.module("NarrowItDownApp");
    });

    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('should have isLoading true', () => {
        expect($controller).toBeDefined();
    });
});

