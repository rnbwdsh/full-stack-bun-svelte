/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('dy51kmqimfunhah');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '9o83cgvj',
				name: 'tokens',
				type: 'relation',
				required: false,
				presentable: false,
				unique: false,
				options: {
					collectionId: 'w5h0ibrkpivy4qt',
					cascadeDelete: false,
					minSelect: null,
					maxSelect: null,
					displayFields: null
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('dy51kmqimfunhah');

		// remove
		collection.schema.removeField('9o83cgvj');

		return dao.saveCollection(collection);
	}
);
