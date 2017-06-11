export class Item {
	constructor(public id:number, 
				public title:string,
				public image:string,
				public parent_id:number,
				public level:number) {}
}