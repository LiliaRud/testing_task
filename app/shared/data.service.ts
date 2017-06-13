import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const items = [
			[
				{
					id: 1,
					title: 'title',
					image: './images/test.jpg',
					parent_id: 0,
					level: 1
				}
			],
				[
				{
					id: 2,
					title: 'child1',
					image: './images/test.jpg',
					parent_id: 1,
					level: 2
				},
				{
					id: 3,
					title: 'child2',
					image: './images/test.jpg',
					parent_id: 1,
					level: 2
				}
			]	
		];
		return { items };
	}
}