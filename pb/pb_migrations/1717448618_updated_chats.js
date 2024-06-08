/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dy51kmqimfunhah")

  collection.listRule = "user = @request.auth.id"
  collection.viewRule = "user = @request.auth.id"
  collection.createRule = "user = @request.auth.id"
  collection.updateRule = "user = @request.auth.id"
  collection.deleteRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dy51kmqimfunhah")

  collection.listRule = "user = @request.auth.username"
  collection.viewRule = "user = @request.auth.username"
  collection.createRule = "user = @request.auth.username"
  collection.updateRule = "user = @request.auth.username"
  collection.deleteRule = "user = @request.auth.username"

  return dao.saveCollection(collection)
})
