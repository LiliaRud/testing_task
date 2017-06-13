import {  Component } from '@angular/core';

import { Item } from './shared/item';
import { items, form } from './shared/data';

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
	title = '';

	constructor(private teeService: TreeService) {}

	create() {
		this.teeService.createItem(this.title);
	}
}