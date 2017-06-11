"use strict";
var Item = (function () {
    function Item(id, title, image, parent_id, level) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.parent_id = parent_id;
        this.level = level;
    }
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=item.js.map