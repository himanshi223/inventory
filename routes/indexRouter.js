const Router = require("express");
const indexController = require("../controller/indexController");

const indexRouter = new Router();

indexRouter.get("/", indexController.viewHomePage)



module.exports = indexRouter;