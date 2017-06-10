import { Component, OnInit } from '@angular/core';

import { Item } from '../shared/item';
import { items } from '../shared/data';
import { TreeService } from '../shared/tree.service';


@Component({
	moduleId: module.id,
	selector: 'tree',
	templateUrl: 'tree.component.html',
	styleUrls: ['tree.component.css']
})

export class TreeComponent implements OnInit {
	items:Item[];
	
	constructor(private treeService:TreeService) {
		this.items = [];
	}

	ngOnInit() {
		this.items = this.treeService.getItems();
	}
	delete(item:Item) {
		this.treeService.deleteItem(item);
	}
	toggle_form(form:any) {
		this.treeService.toggleForm(form);
	}
}