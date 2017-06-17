"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var item_1 = require('../shared/item');
var tree_service_1 = require('../shared/tree.service');
var TreeComponent = (function () {
    function TreeComponent(teeService) {
        this.teeService = teeService;
        this.form = item_1.form;
    }
    TreeComponent.prototype.delete = function (item) {
        this.teeService.deleteItem(item);
        function delete_items(item, tree) {
            if (item.Level < tree.length) {
                tree[item.Level].forEach(function (i, a, level) {
                    if (i.Parent == item.Item_id) {
                        delete_items(i, tree);
                    }
                });
            }
            var level = tree[item.Level - 1];
            console.log(level);
            delete level[level.indexOf(item)];
            console.log('delete parent', item.Item_id);
        }
        delete_items(item, this.tree);
        for (var i = 0; i < this.tree.length; i++) {
            this.tree[i] = this.tree[i].filter(function (x) {
                return x !== undefined && x !== null;
            });
        }
    };
    TreeComponent.prototype.toggle_form = function (visible) {
        item_1.form.visible = !item_1.form.visible;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "tree", void 0);
    TreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tree',
            templateUrl: 'tree.component.html',
            styleUrls: ['tree.component.css']
        }), 
        __metadata('design:paramtypes', [tree_service_1.TreeService])
    ], TreeComponent);
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=tree.component.js.map