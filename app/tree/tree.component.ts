import { Component, OnInit, Input } from '@angular/core';

import { ItemComponent } from '../item/item.component';

import { Item } from '../shared/item';
import { items } from '../shared/data';

@Component({
	moduleId: module.id,
	selector: 'tree',
	templateUrl: 'tree.component.html',
	styleUrls: ['tree.component.css']
})

export class TreeComponent {
	items = items;
	
	deleteItem(item:Item) {
		let index = this.items.indexOf(item);
		if (index > -1) {
			this.items.splice(index, 1)
		}
	}

	getMaxOfArray(items:Item[]) {
		let levels = []
		for (let item of items) {
			levels.push(item.level)
		}
	    var max_level:number = Math.max.apply(null, levels);
	    console.log(max_level)
	}
}