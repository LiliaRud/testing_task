import {  Component, OnInit } from '@angular/core';

import { Item } from './shared/item';
import { items, form } from './shared/data';

@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {

	header:string = 'Testing task';
	title:string = '';
	parent_id:string = '';
	level:string = '';
	form = form;
	items = items;
	
	ngOnInit() {
    	this.getMaxOfLevels(items)

  	}

	create() {	
		let parent_id = document.getElementById('parent_id').getAttribute('value')	
		let level = document.getElementById('level').getAttribute('value')	
		//let item_id = items[+level-1][items.length - 1]['item_id'] + 1;
		let item_id = 1;
		let item = new Item(item_id, this.title, parent_id, level);
		if (+level-1 < items.length) {
			this.items[+level-1].push(item);
		} else {
			this.items.push([item]);
		}
	 	

		this.getMaxOfLevels(items)

	 	form.visible = false;

	 	console.log(item_id, this.title, parent_id, level)
	}

	getMaxOfLevels(items:any) {
		let levels:any = []
		for (let item of items) {
			levels.push(item.level)
		}
		function onlyUnique(value:any, index:any, self:any) { 
		    return self.indexOf(value) === index;
		};
		let ll = levels.filter(onlyUnique)		
	    var max_level = ll;
	    //this.max_level = Math.max.apply(null, levels);
	    console.log(max_level)
	}
}