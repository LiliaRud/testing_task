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
		let item_id = items[items.length - 1]['item_id'] + 1;
		let parent_id = document.getElementById('parent_id').getAttribute('value')	
		let level = document.getElementById('level').getAttribute('value')	
		let item = new Item(item_id, this.title, parent_id, level);
	 	this.items.push(item);
	 	form.visible = false;
	 	
	 	console.log(item_id, this.title, parent_id, level)
	}

	// getMaxOfArray(items:Item[]) {
	// 	let levels:any = []
	// 	for (let item of items) {
	// 		levels.push(item.level)
	// 	}
	//     var max_level:number = Math.max.apply(null, levels);
	//     console.log(max_level)
	// }
}