import {  Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { Item } from '../shared/item';
import { items } from '../shared/data';

@Component({
	moduleId: module.id,
	selector: 'item',
	templateUrl: 'item.component.html',
	styleUrls: ['../tree/tree.component.css']
})

export class ItemComponent {
    @Input() item: Item;
    @Output() toggle_form = new EventEmitter();
    @Output() delete = new EventEmitter();
	
    constructor(private elRef:ElementRef) {}

	onToggleForm() {
		this.toggle_form.emit();
		this.getAttributes()
	}

	getAttributes() {
		let element = this.elRef.nativeElement.querySelector('.add');
	 	let level = ""+(+element.getAttribute('data-level') + 1);
	 	let parent = element.getAttribute('data-id');

	 	console.log('level = ', level, 'parent = ', parent);

	    document.getElementById('parent_id').setAttribute('value', parent);
	 	document.getElementById('level').setAttribute('value', level);
	}	
	
	onDelete() {
		this.delete.emit();
	}
}