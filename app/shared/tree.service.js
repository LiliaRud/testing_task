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
var http_1 = require('@angular/http');
var data_1 = require('./data');
var item_1 = require('./item');
var TreeService = (function () {
    function TreeService(http) {
        this.http = http;
        this.items = data_1.items;
    }
    TreeService.prototype.getItems = function () {
        return this.items;
    };
    TreeService.prototype.createItem = function (title) {
        var parent_id = document.getElementById('parent_id').getAttribute('value');
        var level = document.getElementById('level').getAttribute('value');
        var items_ids = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item_2 = _a[_i];
            for (var _b = 0, item_3 = item_2; _b < item_3.length; _b++) {
                var i = item_3[_b];
                items_ids.push(i.item_id);
            }
        }
        items_ids.sort();
        var item_id = items_ids[items_ids.length - 1] + 1;
        var item = new item_1.Item(item_id, title, parent_id, level);
        console.log(item);
        if (+level - 1 < data_1.items.length) {
            this.items[+level - 1].push(item);
        }
        else {
            this.items.push([item]);
        }
        data_1.form.visible = false;
    };
    TreeService.prototype.deleteItem = function (item) {
        var index_level = +item.level;
        var index = this.items[index_level - 1].indexOf(item);
        if (this.items[index_level - 1] != data_1.items[data_1.items.length - 1]) {
            var child_index = [];
            for (var _i = 0, _a = this.items[index_level]; _i < _a.length; _i++) {
                var sub_i = _a[_i];
                if (sub_i.parent_id == item.item_id) {
                    child_index.push(this.items[index_level].indexOf(sub_i));
                }
            }
            for (var _b = 0, child_index_1 = child_index; _b < child_index_1.length; _b++) {
                var children = child_index_1[_b];
                this.items[index_level].splice(0, 1);
            }
        }
        this.items[index_level - 1].splice(index, 1);
    };
    TreeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TreeService);
    return TreeService;
}());
exports.TreeService = TreeService;
//# sourceMappingURL=tree.service.js.map