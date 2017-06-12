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
    AppComponent.prototype.ngOnInit = function () {
        this.getMaxOfLevels(data_1.items);
    };
    AppComponent.prototype.create = function () {
        var parent_id = document.getElementById('parent_id').getAttribute('value');
        var level = document.getElementById('level').getAttribute('value');
        //let item_id = items[+level-1][items.length - 1]['item_id'] + 1;
        var item_id = 1;
        var item = new item_1.Item(item_id, this.title, parent_id, level);
        if (+level - 1 < data_1.items.length) {
            this.items[+level - 1].push(item);
        }
        else {
            this.items.push([item]);
        }
        this.getMaxOfLevels(data_1.items);
        data_1.form.visible = false;
        console.log(item_id, this.title, parent_id, level);
    };
    AppComponent.prototype.getMaxOfLevels = function (items) {
        var levels = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            levels.push(item.level);
        }
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        ;
        var ll = levels.filter(onlyUnique);
        var max_level = ll;
        //this.max_level = Math.max.apply(null, levels);
        console.log(max_level);
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