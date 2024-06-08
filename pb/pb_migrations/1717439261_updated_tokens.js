/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5h0ibrkpivy4qt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "szbiugq2",
    "name": "previous",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "w5h0ibrkpivy4qt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5h0ibrkpivy4qt")

  // remove
  collection.schema.removeField("szbiugq2")

  return dao.saveCollection(collection)
})
