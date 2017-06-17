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
var TreeService = (function () {
    function TreeService(http) {
        this.http = http;
        this.tree = [];
        this.apiUrlGo = 'http://localhost:3050/api';
    }
    TreeService.prototype.getItems = function () {
        var _this = this;
        return this.http.get(this.apiUrlGo + "/getTree")
            .map(function (res) { return res.json().result; })
            .map(function (item) { return _this.tree = item; })
            .catch(this.handleError);
    };
    TreeService.prototype.createItem = function (item) {
        var json = JSON.stringify(item);
        var params = 'json=' + json;
        var headers = new http_1.Headers({ 'Content-Type': 'multipart/form-data' });
        return this.http.post(this.apiUrlGo + "/addNode", json, { headers: headers })
            .catch(this.handleError)
            .subscribe();
    };
    TreeService.prototype.deleteItem = function (item) {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers });
        // let url = `${this.apiUrlGo}/deleteNode`;
        // this.http.delete(url, options)
        // 		 .catch(this.handleError)
        // 		 .subscribe();
        var json = JSON.stringify(item);
        var params = 'json=' + json;
        var headers = new http_1.Headers({ 'Content-Type': 'multipart/form-data' });
        return this.http.post(this.apiUrlGo + "/deleteNode", json, { headers: headers })
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