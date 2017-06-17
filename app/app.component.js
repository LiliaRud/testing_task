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
var tree_service_1 = require('./shared/tree.service');
var AppComponent = (function () {
    function AppComponent(teeService) {
        this.teeService = teeService;
        this.header = 'Testing task';
        this.form = item_1.form;
        this.image = [];
        this.base64textString = "";
        this.tree = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.teeService.getItems().subscribe(function (tree) {
            if (tree.length == 0) {
                document.getElementById("root-add").style.display = "block";
            }
            else {
                document.getElementById("root-add").style.display = "none";
            }
            var levels = [];
            for (var _i = 0, tree_1 = tree; _i < tree_1.length; _i++) {
                var i = tree_1[_i];
                levels.push(i.Level);
            }
            var max_level = Math.max.apply(null, levels);
            for (var i = 1; i <= max_level; i++) {
                _this.tree.push([]);
            }
            for (var _a = 0, tree_2 = tree; _a < tree_2.length; _a++) {
                var item = tree_2[_a];
                _this.tree[item.Level - 1].push(item);
            }
        });
    };
    AppComponent.prototype.addImage = function (event) {
        var file = event.target.files[0];
        this.img_type = file.type;
        this.img_name = file.name;
        if (file) {
            var reader = new FileReader();
            reader.onload = this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    };
    AppComponent.prototype.handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
        this.image = ("data:" + this.img_type + ";base64," + btoa(binaryString));
    };
    AppComponent.prototype.create_first_item = function () {
        this.form.visible = !this.form.visible;
        var level = "1";
        var parent = "0";
        document.getElementById('parent-input').setAttribute('value', parent);
        document.getElementById('level-input').setAttribute('value', level);
    };
    AppComponent.prototype.create = function () {
        var _this = this;
        var parent = +(document.getElementById('parent-input').getAttribute('value'));
        var level = +(document.getElementById('level-input').getAttribute('value'));
        if (parent != 0) {
            var items_ids = [];
            for (var _i = 0, _a = this.tree; _i < _a.length; _i++) {
                var item_2 = _a[_i];
                for (var _b = 0, item_3 = item_2; _b < item_3.length; _b++) {
                    var i = item_3[_b];
                    items_ids.push(i.Item_id);
                }
            }
            items_ids.sort();
            this.item_id = items_ids[items_ids.length - 1] + 1;
            this.children = false;
            if (level <= this.tree[level - 1]) {
                for (var _c = 0, _d = this.tree[level - 1]; _c < _d.length; _c++) {
                    var i = _d[_c];
                    if (parent == i.Parent) {
                        this.children = true;
                    }
                }
            }
        }
        else {
            this.item_id = 1;
            this.children = false;
        }
        var item = new item_1.Item(this.item_id, this.title, this.image, this.img_name, parent, level, this.children);
        this.teeService.createItem(item).subscribe(function (res) {
            if (+level - 1 < _this.tree.length) {
                _this.tree[level - 1].push(item);
            }
            else {
                _this.tree.push([item]);
            }
            if (item.Parent == 0) {
                document.getElementById("root-add").style.display = "none";
            }
        });
        item_1.form.visible = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [tree_service_1.TreeService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map