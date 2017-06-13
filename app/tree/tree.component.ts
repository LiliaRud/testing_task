import {  Component, OnInit } from '@angular/core';

import { Item, form } from '../shared/item';

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
		this.teeService.getItems().subscribe(items => this.items = items);
	}

	delete(item:any) {
		this.teeService.deleteItem(item);
	}

	toggle_form(visible:boolean) {
		form.visible = !form.visible;
	}
}