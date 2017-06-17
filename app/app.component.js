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
    ;
    AppComponent.prototype.addImage = function (event) {
        // +++++++++++++++++++++++++++++++++++++VARIANT 1 +++++++++++++++++++++++++++++++++++++
        var file = event.target.files[0];
        this.img_type = file.type;
        this.img_name = file.name;
        //  	var dataURL:any;
        //   	if (file.type.substr(0,5) == 'image') {
        //    	var reader = new FileReader();
        //     reader.onload = function(){
        //      	dataURL = reader.result;
        //       	var output = document.getElementById('output');
        //      			//output.src = dataURL;
        // 		//img.push(new Blob([dataURL]));
        //     console.log(dataURL)
        // 		// return dataURL
        //     };
        //     reader.readAsDataURL(file);
        // }
        // +++++++++++++++++++++++++++++++++++++VARIANT 2 +++++++++++++++++++++++++++++++++++++
        if (file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    };
    ;
    AppComponent.prototype._handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
        this.image = ("data:" + this.img_type + ";base64," + btoa(binaryString));
        //console.log(this.image);
    };
    AppComponent.prototype.create = function () {
        var parent = +(document.getElementById('parent-input').getAttribute('value'));
        var level = +(document.getElementById('level-input').getAttribute('value'));
        var items_ids = [];
        for (var _i = 0, _a = this.tree; _i < _a.length; _i++) {
            var item_2 = _a[_i];
            for (var _b = 0, item_3 = item_2; _b < item_3.length; _b++) {
                var i = item_3[_b];
                items_ids.push(i.Item_id);
            }
        }
        items_ids.sort();
        var item_id = items_ids[items_ids.length - 1] + 1;
        var item = new item_1.Item(item_id, this.title, this.image, this.img_name, parent, level);
        console.log(item);
        this.teeService.createItem(item);
        if (+level - 1 < this.tree.length) {
            this.tree[+level - 1].push(item);
        }
        else {
            this.tree.push([item]);
        }
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