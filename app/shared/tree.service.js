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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var item_1 = require('./item');
var TreeService = (function () {
    function TreeService(http) {
        this.http = http;
        this.items = [];
        this.apiUrl = 'api/items';
        this.apiUrlGo = 'http://localhost:3050/getTree';
    }
    TreeService.prototype.getItems = function () {
        var _this = this;
        return this.http.get(this.apiUrl)
            .map(function (res) { return _this.items = res.json().data; })
            .catch(this.handleError);
    };
    TreeService.prototype.createItem = function (title, image) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var parent_id = +(document.getElementById('parent-input').getAttribute('value'));
        var level = +(document.getElementById('level-input').getAttribute('value'));
        var item = new item_1.Item(title, image, parent_id, level);
        if (+level - 1 < this.items.length) {
            this.http.post(this.apiUrl, item, options)
                .map(function (res) { return res.json().data; })
                .map(function (item) { return _this.items[+level - 1].push(item); })
                .catch(this.handleError)
                .subscribe();
        }
        else {
            this.http.post(this.apiUrl, item, options)
                .map(function (res) { return res.json().data; })
                .map(function (item) { return _this.items.push([item]); })
                .catch(this.handleError)
                .subscribe();
        }
        item_1.form.visible = false;
    };
    TreeService.prototype.deleteItem = function (item) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.apiUrl + "/" + item.id;
        this.http.delete(url, options)
            .map(function (res) {
            var index_level = +item.level;
            var index = _this.items[index_level - 1].indexOf(item);
            if (_this.items[index_level - 1] != _this.items[_this.items.length - 1]) {
                var child_index = [];
                for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                    var sub_item = _a[_i];
                    for (var _b = 0, sub_item_1 = sub_item; _b < sub_item_1.length; _b++) {
                        var i = sub_item_1[_b];
                        if (i.parent_id == item.id) {
                            child_index.push(sub_item.indexOf(i));
                        }
                    }
                }
                for (var _c = 0, child_index_1 = child_index; _c < child_index_1.length; _c++) {
                    var children = child_index_1[_c];
                    _this.items[index_level].splice(0, 1);
                }
            }
            _this.items[index_level - 1].splice(index, 1);
        })
            .catch(this.handleError)
            .subscribe();
    };
    TreeService.prototype.handleError = function (error) {
        console.log('Error', error);
        return Observable_1.Observable.throw(error.message || error);
    };
    TreeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TreeService);
    return TreeService;
}());
exports.TreeService = TreeService;
//# sourceMappingURL=tree.service.js.map