import {  Component, Input, ElementRef } from '@angular/core';

import { Item } from '../shared/item';
import { items, form } from '../shared/data';

@Component({
	moduleId: module.id,
	selector: 'item',
	templateUrl: 'item.component.html',
	styleUrls: ['../tree/tree.component.css']
})

export class ItemComponent {
    @Input() item: Item;
	
	constructor(private elRef:ElementRef) {}

	toggle_form(visible:boolean) {
		form.visible = !form.visible;
		this.getAttributes()
	}

	getAttributes() {
		let element = this.elRef.nativeElement.querySelector('.add');
	 	var level = element.getAttribute('data-level');
	 	var parent = element.getAttribute('data-parent');
	 	console.log('level = ', level, 'parent = ', parent)
	}
}