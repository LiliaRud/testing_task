import { Component } from '@angular/core';

import { Item, form } from './shared/item';

import { TreeService } from './shared/tree.service'

@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})

export class AppComponent {
	header:string = 'Testing task';
	form = form;
	title:string;
	image:any;
	tree:any;

	constructor(private teeService: TreeService) {
		this.tree = [];
	}

	create() {
		this.teeService.createItem(this.title, this.image);
	}

}