import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { items, form } from './data';
import { Item } from './item';

@Injectable()
export class TreeService {
	items:any = items;

	constructor(private http:Http) {}

	getItems() {
		return this.items;
	}

	createItem(title:string) {	
		let parent_id = document.getElementById('parent_id').getAttribute('value')	
		let level = document.getElementById('level').getAttribute('value')	
		
		let items_ids:any = [];
		for (let item of this.items) {
			for (let i of item) {
				items_ids.push(i.item_id);
			}
		}
		items_ids.sort();
		let item_id = items_ids[items_ids.length - 1] + 1;

		let item = new Item(item_id, title, parent_id, level);

		console.log(item)

		if (+level-1 < items.length) {
			this.items[+level-1].push(item);
		} else {
			this.items.push([item]);
		}
	 	
	 	form.visible = false;
	}

	deleteItem(item:any) {
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
}