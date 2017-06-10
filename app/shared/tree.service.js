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
var isRoot = true;
var TreeService = (function () {
    function TreeService(http) {
        this.http = http;
        this.items = data_1.items;
        this.isRoot = isRoot;
    }
    TreeService.prototype.getItems = function () {
        return this.items;
    };
    TreeService.prototype.createItem = function (title, image, children) {
        var item = new item_1.Item(title, image, children);
        if (isRoot == true) {
            this.items.push(item);
        }
        else {
            console.log('PUSHH');
        }
    };
    TreeService.prototype.deleteItem = function (item) {
        var index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        ;
    };
    TreeService.prototype.toggleForm = function (visible) {
        data_1.form.visible = !data_1.form.visible;
        var target = event.target;
        var rootAdd = document.getElementById('root-add');
        if (target != rootAdd) {
            isRoot = false;
            console.log(target);
            console.log(isRoot);
        }
        else {
            isRoot = true;
            console.log('ROOT');
            console.log(target);
            console.log(isRoot);
        }
    };
    TreeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TreeService);
    return TreeService;
}());
exports.TreeService = TreeService;
//# sourceMappingURL=tree.service.js.map