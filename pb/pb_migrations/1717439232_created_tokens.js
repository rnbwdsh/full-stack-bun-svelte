/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "w5h0ibrkpivy4qt",
    "created": "2024-06-03 18:27:12.540Z",
    "updated": "2024-06-03 18:27:12.540Z",
    "name": "tokens",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nztqg1cp",
        "name": "chat",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "dy51kmqimfunhah",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "xbfudndh",
        "name": "text",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("w5h0ibrkpivy4qt");

  return dao.deleteCollection(collection);
})
