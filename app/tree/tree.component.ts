import {  Component, OnInit } from '@angular/core';

import { Item } from '../shared/item';
import { items, form } from '../shared/data';

import { TreeService } from '../shared/tree.service'

@Component({
	moduleId: module.id,
	selector: 'tree',
	templateUrl: 'tree.component.html',
	styleUrls: ['tree.component.css']
})

export class TreeComponent implements OnInit {
	items:any;
	form = form

	constructor(private teeService: TreeService) {
		this.items = [];
	}

	ngOnInit() {
		this.items = this.teeService.getItems();
	}

	delete(item:any) {
		this.teeService.deleteItem(item);
	}

	toggle_form(visible:boolean) {
		form.visible = !form.visible;
	}
}