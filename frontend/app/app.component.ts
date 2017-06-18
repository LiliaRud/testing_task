import { Component, OnInit } from '@angular/core';

import { Item, form } from './shared/item';

import { TreeService } from './shared/tree.service'

@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
	header:string = 'Testing task';
	form = form;
	title:string;
	children:boolean;
	image:any = [];
	tree:any;
	img_type:string;
	img_name:string;
	item_id:number;


	constructor(private teeService: TreeService) {
		this.tree = [];
	}

	ngOnInit() {
		this.teeService.getItems().subscribe(tree => {
			if (tree == null) {
				document.getElementById("root-add").style.display = "block";
			} else {
				document.getElementById("root-add").style.display = "none";
				let levels:any = [];
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
			}
		})
	}

	addImage(event:any){
      	var file = event.target.files[0];
      	this.img_type = file.type
      	this.img_name = file.name
        if (this.img_type.substr(0, 5) == "image") {
	        var reader = new FileReader();
	        reader.onload =this.handleReaderLoaded.bind(this);
	        reader.readAsBinaryString(file);
	    }
	}
	handleReaderLoaded(readerEvt:any) {
     	var binaryString = readerEvt.target.result;
        this.image = ("data:" + this.img_type + ";base64," + btoa(binaryString))
    }

    create_first_item() {
    	this.form.visible = true;
	 	let level = "1";
	 	let parent = "0";
	    document.getElementById('parent-input').setAttribute('value', parent);
	 	document.getElementById('level-input').setAttribute('value', level);        
    }

	create() {
		let parent = +(document.getElementById('parent-input').getAttribute('value'));	
		let level = +(document.getElementById('level-input').getAttribute('value'));
				
		if (parent != 0){
			let items_ids:any = [];
	  		for (let item of this.tree) {
	   			for (let i of item) {
	    			items_ids.push(i.Item_id);
	   			}
	  		}
	  		items_ids.sort();
	  		this.item_id = items_ids[items_ids.length - 1] + 1;

	  		this.children = false;
	  		if (level <= this.tree[level-1]) {
		  		for (let i of this.tree[level - 1]) {
		  			if (parent == i.Parent) {
		  				this.children = true;
		  			}
		  		}	  			
	  		}			
		}
		else {
			this.item_id = 1;
			this.children = false;
		}

		let item = new Item(this.item_id, this.title, this.image, this.img_name, parent, level, this.children);

		this.teeService.createItem(item).subscribe(res => {
			if (+level-1 < this.tree.length) {
				this.tree[level-1].push(item)	
			} else {			
				this.tree.push([item])
			}

			if (item.Parent == 0) {
				document.getElementById("root-add").style.display = "none";
			}
			
		});

		form.visible = false;		
	}

	close_form() {
		form.visible = false;
	}

}