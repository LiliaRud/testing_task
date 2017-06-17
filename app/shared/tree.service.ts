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

	private apiUrlGo = 'http://localhost:3050';

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
						.catch(this.handleError);
	}

	deleteItem(item:any) {
		let json = JSON.stringify(item);
		let params = 'json=' + json
		let headers = new Headers({ 'Content-Type': 'multipart/form-data' });

		return this.http.post(`${this.apiUrlGo}/deleteNode`, json, {headers: headers})
						.catch(this.handleError);
	}

	private handleError(error:any){
		console.log('Error', error);
		document.getElementById("error").style.display = "block";
		return Observable.throw(error.message || error);
	}
}