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
var ItemComponent = (function () {
    function ItemComponent(elRef) {
        this.elRef = elRef;
        this.toggle_form = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
    }
    ItemComponent.prototype.onToggleForm = function () {
        this.toggle_form.emit();
        this.getAttributes();
    };
    ItemComponent.prototype.onDelete = function () {
        this.delete.emit();
    };
    ItemComponent.prototype.getAttributes = function () {
        var element = this.elRef.nativeElement.querySelector('.add');
        var level = "" + (+element.getAttribute('data-level') + 1);
        var parent = element.getAttribute('data-id');
        console.log('level = ', level, 'parent = ', parent);
        document.getElementById('parent_id').setAttribute('value', parent);
        document.getElementById('level').setAttribute('value', level);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', item_1.Item)
    ], ItemComponent.prototype, "item", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ItemComponent.prototype, "toggle_form", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ItemComponent.prototype, "delete", void 0);
    ItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'item',
            templateUrl: 'item.component.html',
            styleUrls: ['../tree/tree.component.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ItemComponent);
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
//# sourceMappingURL=item.component.js.map