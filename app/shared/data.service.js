"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var tree = [
            [
                {
                    Id: 1,
                    Title: 'Title',
                    Image: './images/test.jpg',
                    Parent: 0,
                    Level: 1
                }
            ],
            [
                {
                    Id: 2,
                    Title: 'child1',
                    Image: './images/test.jpg',
                    Parent: 1,
                    Level: 2
                },
                {
                    Id: 3,
                    Title: 'child2',
                    Image: './images/test.jpg',
                    Parent: 1,
                    Level: 2
                }
            ]
        ];
        return { tree: tree };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=data.service.js.map