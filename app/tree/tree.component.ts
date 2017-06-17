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

	form = form

	constructor(private teeService: TreeService) {}
	
	delete(item:any) {
		this.teeService.deleteItem(item).subscribe(res => {
			function delete_items(item:any, tree:any) {
				if (item.Level < tree.length) {
					tree[item.Level].forEach( function(i:any, a:any, level:any){
						if (i.Parent == item.Item_id) {
							delete_items(i, tree)
						}
					})
				}
				let level = tree[item.Level - 1];
				delete level[level.indexOf(item)];
			}

			delete_items(item, this.tree)
			for (let i = 0; i < this.tree.length; i++) {
				this.tree[i] = this.tree[i].filter(function(x:any) {
				    return x !== undefined && x !== null; 
				});
			}

			if (item.Parent == 0) {
				document.getElementById("root-add").style.display = "block";
			}
		});
	}
		
	toggle_form(visible:boolean) {
		form.visible = !form.visible;
	}
}