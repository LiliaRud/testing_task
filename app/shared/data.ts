export const form = {
	visible: false,
};

export const items = [
	[
		{
			item_id: 1,
			title: 'title',
			// image: './images/test.jpg',
			parent_id: '0',
			level: '1'

		}
	],
		[
		{
			item_id: 2,
			title: 'child1',
			parent_id: '1',
			level: '2'

		},
		{
			item_id: 3,
			title: 'child2',
			parent_id: '1',
			level: '2'

		}
	]	
]