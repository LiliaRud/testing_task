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
	image:any = [];
	tree:any;
	private base64textString:String="";
	img_type:string;
	img_name:string;


	constructor(private teeService: TreeService) {
		this.tree = [];
	}

	ngOnInit() {
		this.teeService.getItems().subscribe(tree => {
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
		});
	};
	addImage(event:any){
		// +++++++++++++++++++++++++++++++++++++VARIANT 1 +++++++++++++++++++++++++++++++++++++
      	var file = event.target.files[0];
      	this.img_type = file.type
      	this.img_name = file.name
	 //  	var dataURL:any;
  //   	if (file.type.substr(0,5) == 'image') {
	 //    	var reader = new FileReader();
		//     reader.onload = function(){
		//      	dataURL = reader.result;
		//       	var output = document.getElementById('output');
	 //      			//output.src = dataURL;
		// 		//img.push(new Blob([dataURL]));
		//     console.log(dataURL)
		// 		// return dataURL
		//     };
		//     reader.readAsDataURL(file);

	   
		// }

		// +++++++++++++++++++++++++++++++++++++VARIANT 2 +++++++++++++++++++++++++++++++++++++
	

		      

		    if (file) {
		        var reader = new FileReader();

		        reader.onload =this._handleReaderLoaded.bind(this);

		        reader.readAsBinaryString(file);
		    }
		  



	};
	_handleReaderLoaded(readerEvt:any) {
     	var binaryString = readerEvt.target.result;
        this.base64textString= btoa(binaryString);
        this.image = ("data:" + this.img_type + ";base64," + btoa(binaryString))
        //console.log(this.image);
    }
	create() {
			let parent = +(document.getElementById('parent-input').getAttribute('value'));	
			let level = +(document.getElementById('level-input').getAttribute('value'));
			
			let items_ids:any = [];
	  		for (let item of this.tree) {
	   			for (let i of item) {
	    			items_ids.push(i.Item_id);
	   			}
	  		}
	  		items_ids.sort();

	  		let item_id = items_ids[items_ids.length - 1] + 1;
			let item = new Item(item_id, this.title, this.image, this.img_name, parent, level);


			console.log(item)

			this.teeService.createItem(item);

            
			if (+level-1 < this.tree.length) {
				this.tree[+level-1].push(item)	
			} else {			
				this.tree.push([item])
			}
			form.visible = false;		

	}

}