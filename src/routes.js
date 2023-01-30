const express = require("express");

const annotationsController = require("./annotations")

const routes = express.Router();

routes
    .route("/annotations")
    .get(annotationsController.getAllAnnotations)
    .post(annotationsController.create);

routes
    .route("/annotations/:_id")
    .put(annotationsController.update)
    .patch(annotationsController.update)
    .delete(annotationsController.destroy)

module.exports = routes;