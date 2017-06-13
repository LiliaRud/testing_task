import {  Component } from '@angular/core';

import { Item } from './shared/item';
import { items, form } from './shared/data';

@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})

export class AppComponent {

	header:string = 'Testing task';
	title:string = '';
	parent_id:string = '';
	level:string = '';
	form = form;
	items = items;

	create() {	
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

		let item = new Item(item_id, this.title, parent_id, level);

		console.log(item)

		if (+level-1 < items.length) {
			this.items[+level-1].push(item);
		} else {
			this.items.push([item]);
		}
	 	
	 	form.visible = false;
	}

}