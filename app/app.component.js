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
var item_1 = require('./shared/item');
var data_1 = require('./shared/data');
var AppComponent = (function () {
    function AppComponent() {
        this.header = 'Testing task';
        this.title = '';
        this.parent_id = '';
        this.level = '';
        this.form = data_1.form;
        this.items = data_1.items;
    }
    AppComponent.prototype.create = function () {
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
        var item = new item_1.Item(item_id, this.title, parent_id, level);
        console.log(item);
        if (+level - 1 < data_1.items.length) {
            this.items[+level - 1].push(item);
        }
        else {
            this.items.push([item]);
        }
        data_1.form.visible = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map