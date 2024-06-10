/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: 'yx1h166cc3efhsd',
			created: '2024-06-03 18:23:32.997Z',
			updated: '2024-06-03 18:23:32.997Z',
			name: 'messages',
			type: 'base',
			system: false,
			schema: [
				{
					system: false,
					id: 'gtonsxqe',
					name: 'chat',
					type: 'relation',
					required: false,
					presentable: false,
					unique: false,
					options: {
						collectionId: 'dy51kmqimfunhah',
						cascadeDelete: false,
						minSelect: null,
						maxSelect: 1,
						displayFields: null
					}
				},
				{
					system: false,
					id: 'afmo1dyt',
					name: 'message',
					type: 'editor',
					required: false,
					presentable: false,
					unique: false,
					options: {
						convertUrls: false
					}
				},
				{
					system: false,
					id: '7tlbj3yj',
					name: 'model',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				}
			],
			indexes: [],
			listRule: null,
			viewRule: null,
			createRule: null,
			updateRule: null,
			deleteRule: null,
			options: {}
		});

		return Dao(db).saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('yx1h166cc3efhsd');

		return dao.deleteCollection(collection);
	}
);
