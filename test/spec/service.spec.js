/**
 * Created by ruyang on 12/14/2016.
 */

beforeEach(function() {
    angular.mock.module("NarrowItDownApp");
});

describe("Narrow it down data service", function() {
    it("BASE_URL should set", function() {
        var baseUrl = "";
        inject(function(BASE_URL) {
            baseUrl = BASE_URL;
        });

        expect(baseUrl).toBe("https://davids-restaurant.herokuapp.com");
    });

    it("getMatchedMenuItems should return an array of menu items", function() {
        var service = null;
        var $rootScope = null;
        var $httpBackend = null;
        inject(function(NarrowItDownService, _$rootScope_, _$httpBackend_) {
            service = NarrowItDownService;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
        });

        var data = {
            "menu_items" : [
                {
                    "id": 877,
                    "short_name": "A1",
                    "name": "Won Ton Soup with Chicken",
                    "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
                    "price_small": 2.55,
                    "price_large": 5,
                    "small_portion_name": "pint",
                    "large_portion_name": "quart"
                },

                {
                    "id": 880,
                    "short_name": "A4",
                    "name": "Hot and Sour Soup",
                    "description": "tofu, mushroom, bamboo shoot, and egg",
                    "price_small": 2.55,
                    "price_large": 10,
                    "small_portion_name": "pint",
                    "large_portion_name": "quart"
                }
            ]
        };

        $httpBackend.when("GET", 'https://davids-restaurant.herokuapp.com/menu_items.json')
            .respond(200, data);

        var matchedItems = [];

        service.getMatchedMenuItems("chicken").then(function(items) {
            matchedItems = items;
        });

        $httpBackend.flush();

        expect(matchedItems.length).toBe(1);
        expect(matchedItems[0].id).toBe(877);
        expect(matchedItems[0].short_name).toBe("A1");

    });
});
