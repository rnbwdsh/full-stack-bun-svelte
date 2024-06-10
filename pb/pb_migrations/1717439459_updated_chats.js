/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('dy51kmqimfunhah');

		collection.listRule = 'user = @request.auth.username';
		collection.viewRule = 'user = @request.auth.username';
		collection.createRule = 'user = @request.auth.username';
		collection.updateRule = 'user = @request.auth.username';
		collection.deleteRule = 'user = @request.auth.username';

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'y1n5ywmn',
				name: 'user',
				type: 'relation',
				required: true,
				presentable: false,
				unique: false,
				options: {
					collectionId: '_pb_users_auth_',
					cascadeDelete: false,
					minSelect: null,
					maxSelect: 1,
					displayFields: null
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('dy51kmqimfunhah');

		collection.listRule = null;
		collection.viewRule = null;
		collection.createRule = null;
		collection.updateRule = null;
		collection.deleteRule = null;

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'y1n5ywmn',
				name: 'field',
				type: 'relation',
				required: true,
				presentable: false,
				unique: false,
				options: {
					collectionId: '_pb_users_auth_',
					cascadeDelete: false,
					minSelect: null,
					maxSelect: 1,
					displayFields: null
				}
			})
		);

		return dao.saveCollection(collection);
	}
);
