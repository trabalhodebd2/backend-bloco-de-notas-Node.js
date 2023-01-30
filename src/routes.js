const express = require("express");

const annotationsController = require("./annotations")

const routes = express.Router();

routes
    .route("/annotations")
    .get(annotationsController.getAllAnnotations)
    .post(annotationsController.create);

routes
    .route("/annotations/:id")
    .get(annotationsController.getForId)
    .put(annotationsController.update)
    .patch(annotationsController.update)
    .delete(annotationsController.destroy)

routes.get("/annotations/search/:query", annotationsController.search)

module.exports = routes;