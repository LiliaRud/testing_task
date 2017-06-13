import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Item, form } from './item';

@Injectable()
export class TreeService {
	items:any = [];

	private apiUrl = 'api/items';
	private apiUrlGo = 'http://localhost:3050/getTree';

	constructor(private http:Http) {}

	getItems() {
		return this.http.get(this.apiUrl)
						.map(res => this.items = res.json().data)
						.catch(this.handleError);
	}

	createItem(title:string, image:any) {	
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers });

		let parent_id = +(document.getElementById('parent-input').getAttribute('value'));	
		let level = +(document.getElementById('level-input').getAttribute('value'));
		
		let item = new Item(title, image, parent_id, level);

		if (+level-1 < this.items.length) {
			this.http.post(this.apiUrl, item, options)
	 			 .map(res => res.json().data)
	 			 .map(item => this.items[+level-1].push(item))
	 			 .catch(this.handleError)
	 			 .subscribe();
		} else {
			this.http.post(this.apiUrl, item, options)
     			 .map(res => res.json().data)
	 			 .map(item => this.items.push([item]))
	 			 .catch(this.handleError)
	 			 .subscribe();
		}
	 	
	 	form.visible = false;
	}

	deleteItem(item:any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers });
		let url = `${this.apiUrl}/${item.id}`;

		this.http.delete(url, options)
				 .map(res => {

					let index_level = +item.level;
					let index = this.items[index_level - 1].indexOf(item);
										
					if (this.items[index_level - 1] != this.items[this.items.length - 1]) {
						let child_index:any = [];
						for (let sub_item of this.items) {
							for (let i of sub_item) {								
								if (i.parent_id == item.id) {
									child_index.push(sub_item.indexOf(i));
								}
							}
						}
						for (let children of child_index) {
							this.items[index_level].splice(0, 1)
						}
					}
					this.items[index_level - 1].splice(index, 1)
				 })
				 .catch(this.handleError)
				 .subscribe();
	}

	private handleError(error:any){
		console.log('Error', error);
		return Observable.throw(error.message || error);
	}
}