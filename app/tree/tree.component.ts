import {  Component } from '@angular/core';

import { Item } from '../shared/item';
import { items, form } from '../shared/data';

@Component({
	moduleId: module.id,
	selector: 'tree',
	templateUrl: 'tree.component.html',
	styleUrls: ['tree.component.css']
})

export class TreeComponent {
	items = items;
	form=form

	delete(item:Item) {
		let index = this.items.indexOf(item);
		if (index > -1) {
			this.items.splice(index, 1)
		}
	}

	toggle_form(visible:boolean) {
		form.visible = !form.visible;
	}
}