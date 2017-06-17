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

	private apiUrlGo = 'http://localhost:3050/api';

	constructor(private http:Http) {}

	getItems():Observable<Item[]> {
		return this.http.get(`${this.apiUrlGo}/getTree`)
						.map(res => res.json().result)
						.map(item => this.tree = item)
						.catch(this.handleError);
	}

	createItem(item:any) {
		let json = JSON.stringify(item);
		let params = 'json=' + json
		let headers = new Headers({ 'Content-Type': 'multipart/form-data' });

		return this.http.post(`${this.apiUrlGo}/addNode`, json, {headers: headers})
						.catch(this.handleError)
						.subscribe();
	}

	deleteItem(item:any) {
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		// let options = new RequestOptions({ headers });
		// let url = `${this.apiUrlGo}/deleteNode`;

		// this.http.delete(url, options)
		// 		 .catch(this.handleError)
		// 		 .subscribe();


		let json = JSON.stringify(item);
		let params = 'json=' + json
		let headers = new Headers({ 'Content-Type': 'multipart/form-data' });

		return this.http.post(`${this.apiUrlGo}/deleteNode`, json, {headers: headers})
						.catch(this.handleError)
						.subscribe();
	}

	private handleError(error:any){
		console.log('Error', error);
		return Observable.throw(error.message || error);
	}
}