const {Router} = require("express");
const categoryController = require("../controller/categoryController");

const categoryRouter = new Router;

categoryRouter.get("/add", categoryController.addNewCategoryGet);
categoryRouter.post("/add", categoryController.addNewCategoryPost);
categoryRouter.get("/:categoryId/update", categoryController.updateCategoryGet);
categoryRouter.post("/:categoryId/update", categoryController.updateCategoryPost);
categoryRouter.get("/:categoryId/delete", categoryController.deleteCategoryGet);
categoryRouter.post("/:categoryId/delete", categoryController.deleteCategoryPost);
categoryRouter.get("/:categoryId", categoryController.listItemsOfCategory);
categoryRouter.get("/", categoryController.listAllCategories);


module.exports = categoryRouter;