export class Item {
	id: number;

	constructor(public title:string,
				public image:any,
				public parent_id:number,
				public level:number) {}
};

export const form = {
	visible: false,
};