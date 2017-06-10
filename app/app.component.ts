import {  Component, Output, OnInit, EventEmitter  } from '@angular/core';

import { Item } from './shared/item';
import { items, form } from './shared/data';
import { TreeService } from './shared/tree.service';


@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})

export class AppComponent {
	header:string = 'Testing task';
	form = form;
	title:string = '';
	image:string = '';
	children:any = [];
	
	constructor(private treeService:TreeService) {}
	create() {
		this.treeService.createItem(this.title, this.image, this.children);
		form.visible = false;
	}
	toggle_form(form:any) {
		this.treeService.toggleForm(form);
	}
}