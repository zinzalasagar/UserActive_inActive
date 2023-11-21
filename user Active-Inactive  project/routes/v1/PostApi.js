const express = require("express");

const routes = express.Router();

const { body } = require("express-validator");

const PostController = require("../../controller/PostController");

const { varifytoken } = require("../../utils/commenFunction");

const locationValidationRules = [

  body("latitude").isNumeric().withMessage("Latitude must be a number"),
  body("longitude").isNumeric().withMessage("Longitude must be a number"),
  body("radius").optional().isNumeric().withMessage("Radius must be a number"),
];

// Define routes

routes.post(
   "/CreatePost",
  locationValidationRules,
  varifytoken,
  PostController.CreatePost
);

routes.get(
  "/getPostsByLocation",
  locationValidationRules,
  PostController.getPostsByLocation
);

routes.get("/getActiveUsersCount", PostController.getActiveUsersCount);

routes.get("/inactive-count", PostController.getInactiveUsersCount);

routes.get("/GetAllPost", PostController.GetAllPost);

module.exports = routes;
