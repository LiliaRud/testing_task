import {  Component, OnInit } from '@angular/core';

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
	form = form;
	id:number = 0;
	title:string = '';
	image:string = '';
	parent_id:number = 0;
	level:number = 0;
	items = items;
	
	create() {		
		let item = new Item(this.id, this.title, this.image, this.parent_id, this.level);
	 	this.items.push(item);
	 	form.visible = false;
	 	console.log(this.id, this.title, this.image, this.parent_id, this.level)
	}

	toggle_form(visible:boolean) {
		form.visible = !form.visible;
	}
}