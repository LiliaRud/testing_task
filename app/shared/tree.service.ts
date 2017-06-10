import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { items, form } from './data';
import { Item } from './item';

var isRoot:boolean = true;

@Injectable()
export class TreeService {
	items:Item[] = items;
	isRoot = isRoot;

	constructor(private http:Http) {}

	getItems():Item[] {
		return this.items;
	}

	createItem(title:string, image:string, children:any) {
		let item = new Item(title, image, children);
		if (isRoot == true) {
		 	this.items.push(item);
		} else {
			console.log('PUSHH')
		}
	}

	deleteItem(item:Item) {
		let index = this.items.indexOf(item);
		if (index > -1) {
			this.items.splice(index, 1)
		};
	}

	toggleForm(visible:boolean) {
		form.visible = !form.visible;
		var target = event.target;
		var rootAdd = document.getElementById('root-add');
		if (target != rootAdd) {
			isRoot = false;
			console.log(target)
			console.log(isRoot)
		} else {
			isRoot = true;
			console.log('ROOT')
			console.log(target)
			console.log(isRoot)
		}
	}
}