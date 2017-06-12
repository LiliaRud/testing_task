"use strict";
var Item = (function () {
    function Item(item_id, title, parent_id, level) {
        this.item_id = item_id;
        this.title = title;
        this.parent_id = parent_id;
        this.level = level;
    }
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=item.js.map