"use strict";
var Item = (function () {
    function Item(title, image, parent_id, level) {
        this.title = title;
        this.image = image;
        this.parent_id = parent_id;
        this.level = level;
    }
    return Item;
}());
exports.Item = Item;
;
exports.form = {
    visible: false,
};
//# sourceMappingURL=item.js.map