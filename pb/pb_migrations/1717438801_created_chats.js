/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: 'dy51kmqimfunhah',
			created: '2024-06-03 18:20:01.218Z',
			updated: '2024-06-03 18:20:01.218Z',
			name: 'chats',
			type: 'base',
			system: false,
			schema: [
				{
					system: false,
					id: 'llweugqy',
					name: 'title',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				},
				{
					system: false,
					id: 'y1n5ywmn',
					name: 'field',
					type: 'relation',
					required: false,
					presentable: false,
					unique: false,
					options: {
						collectionId: '_pb_users_auth_',
						cascadeDelete: false,
						minSelect: null,
						maxSelect: 1,
						displayFields: null
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
		const collection = dao.findCollectionByNameOrId('dy51kmqimfunhah');

		return dao.deleteCollection(collection);
	}
);
