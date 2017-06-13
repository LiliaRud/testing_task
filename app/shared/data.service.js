"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var items = [
            [
                {
                    id: 1,
                    title: 'title',
                    image: './images/test.jpg',
                    parent_id: 0,
                    level: 1
                }
            ],
            [
                {
                    id: 2,
                    title: 'child1',
                    image: './images/test.jpg',
                    parent_id: 1,
                    level: 2
                },
                {
                    id: 3,
                    title: 'child2',
                    image: './images/test.jpg',
                    parent_id: 1,
                    level: 2
                }
            ]
        ];
        return { items: items };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=data.service.js.map