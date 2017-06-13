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
	form = form

	delete(item:any) {
		let index_level = +item.level;
		let index = this.items[index_level - 1].indexOf(item);
		
		if (this.items[index_level - 1] != items[items.length - 1]) {
			let child_index:any = [];
			for (let sub_i of this.items[index_level]) {
				if (sub_i.parent_id == item.item_id) {
					child_index.push(this.items[index_level].indexOf(sub_i));
				}
			}
			for (let children of child_index) {
				this.items[index_level].splice(0, 1)
			}
		}
		this.items[index_level - 1].splice(index, 1)
	}

	toggle_form(visible:boolean) {
		form.visible = !form.visible;
	}
}