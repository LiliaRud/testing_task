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
	tree:any;
	form = form

	constructor(private teeService: TreeService) {
		this.tree = [];
	}

	ngOnInit() {
		this.teeService.getItems().subscribe(tree => {
			let levels = [];
			for (let i of tree) {		
				levels.push(i.Level)
			}
			let max_level = Math.max.apply(null, levels);
			for (let i = 1; i <= max_level; i++) {
				this.tree.push([]);
			}
			for (let item of tree) {
				this.tree[item.Level - 1].push(item)		
			}
		});
	};
	
	delete(item:any) {
		this.teeService.deleteItem(item);
	}

	toggle_form(visible:boolean) {
		form.visible = !form.visible;
	}
}