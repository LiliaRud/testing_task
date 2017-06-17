import {  Component, OnInit, Input } from '@angular/core';

import { Item, form } from '../shared/item';

import { TreeService } from '../shared/tree.service'

@Component({
	moduleId: module.id,
	selector: 'tree',
	templateUrl: 'tree.component.html',
	styleUrls: ['tree.component.css']
})

export class TreeComponent {
	@Input() tree:any;
	@Input() build_tree:any;

	form = form

	constructor(private teeService: TreeService) {}
	
	delete(item:any) {
		this.teeService.deleteItem(item);
		let index:number;
		for (let level of this.tree) {
			// for (let i of level) {
			// 	if (item.Item_id == i.Parent) {
			// 		delete level[level.indexOf(i)]
			// 	}
			// }
			delete level[level.indexOf(item)]
		}
		for (let i = 0; i < this.tree.length; i++) {
			this.tree[i] = this.tree[i].filter(function(x:any) {
			    return x !== undefined && x !== null; 
			});
		}
	}
		

	toggle_form(visible:boolean) {
		form.visible = !form.visible;
	}
}