import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Item, form } from './item';

@Injectable()
export class TreeService {
	tree:any = [];

	private apiUrl = 'api/tree';
	private apiUrlGo = 'http://localhost:3050';

	constructor(private http:Http) {}

	getItems():Observable<Item[]> {
		return this.http.get(`${this.apiUrlGo}/getTree`)
						.map(res => res.json().result)
						.map(item => this.tree = item)
						.catch(this.handleError);
	}

	createItem(title:string, image:any) {	
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers });

		let parent_id = +(document.getElementById('parent-input').getAttribute('value'));	
		let level = +(document.getElementById('level-input').getAttribute('value'));
		
		let item = new Item(title, image, parent_id, level);

		if (+level-1 < this.tree.length) {
			this.http.post(`${this.apiUrlGo}/addNode`, item, options)
	 			 .map(res => res.json().result)
	 			 .map(item => this.tree[+level-1].push(item))
	 			 .catch(this.handleError)
	 			 .subscribe();
		} else {
			this.http.post(`${this.apiUrlGo}/addNode`, item, options)
     			 .map(res => res.json().result)
	 			 .map(item => this.tree.push([item]))
	 			 .catch(this.handleError)
	 			 .subscribe();
		}
	 	
	 	form.visible = false;
	}

	deleteItem(item:any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers });
		let url = `${this.apiUrlGo}/${item.id}`;

		this.http.delete(url, options)
				 .map(res => {

					let index_level = +item.Level;
					let index = this.tree[index_level - 1].indexOf(item);
										
					if (this.tree[index_level - 1] != this.tree[this.tree.length - 1]) {
						let child_index:any = [];
						for (let sub_item of this.tree) {
							for (let i of sub_item) {								
								if (i.Parent == item.Id) {
									child_index.push(sub_item.indexOf(i));
								}
							}
						}
						for (let children of child_index) {
							this.tree[index_level].splice(0, 1)
						}
					}
					this.tree[index_level - 1].splice(index, 1)
				 })
				 .catch(this.handleError)
				 .subscribe();
	}

	private handleError(error:any){
		console.log('Error', error);
		return Observable.throw(error.message || error);
	}
}