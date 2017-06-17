export class Item {
	Id: number;

	constructor(public Item_id:number,
				public Title:string,
				public Image:any,
				public Image_name:string,
				public Parent:number,
				public Level:number) {}
};

export const form = {
	visible: false,
};