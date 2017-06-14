import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const tree = [
			[
				{
					Id: 1,
					Title: 'Title',
					Image: './images/test.jpg',
					Parent: 0,
					Level: 1
				}
			],
			[
				{
					Id: 2,
					Title: 'child1',
					Image: './images/test.jpg',
					Parent: 1,
					Level: 2
				},
				{
					Id: 3,
					Title: 'child2',
					Image: './images/test.jpg',
					Parent: 1,
					Level: 2
				}
			]	
		];
		return { tree };
	}
}