export class Item {
	id: number;

	constructor(public Title:string,
				public Image:any,
				public Parent:number,
				public Level:number) {}
};

export const form = {
	visible: false,
};