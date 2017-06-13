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
        this.items = [];
    }
    TreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.teeService.getItems().subscribe(function (items) { return _this.items = items; });
    };
    TreeComponent.prototype.delete = function (item) {
        this.teeService.deleteItem(item);
    };
    TreeComponent.prototype.toggle_form = function (visible) {
        item_1.form.visible = !item_1.form.visible;
    };
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