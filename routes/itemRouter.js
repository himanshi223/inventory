const {Router} = require("express");
const itemController = require("../controller/itemController");

const itemRouter = new Router;

itemRouter.get("/add", itemController.addNewItemGet);
itemRouter.post("/add", itemController.addNewItemPost);
itemRouter.get("/:itemId/update", itemController.updateItemGet);
itemRouter.post("/:itemId/update", itemController.updateItemPost);
itemRouter.get("/:itemId/delete", itemController.deleteItemGet);
itemRouter.post("/:itemId/delete", itemController.deleteItemPost);
itemRouter.get("/:itemId", itemController.viewItem);
itemRouter.get("/", itemController.listAllItems);

module.exports = itemRouter;