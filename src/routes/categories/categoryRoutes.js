const express = require("express");
const auth = require("../../auth");
const multer = require("multer");
const path = require("path");
const {
  addCategoryHandler,
  fetchCategoriesHandler,
  fetchCategoryHandler,
  deleteCategoryHandler,
  updateCategoryHandler,
  httpGetCategoryByName,
} = require("./categoryHandler");
const categoryRouter = express.Router();

function allowUnauthenticated(req, res, next) {
  const { origin } = req.headers;
  if (
    origin === "https://shopzee.onrender.com" ||
    origin === "http://localhost:5000" ||
    origin === "http://localhost:3000"
  ) {
    return next();
  } else {
    auth(req, res, next);
  }
}

categoryRouter.get(
  "/fetchCategory/:id",
  allowUnauthenticated,
  fetchCategoryHandler
);
categoryRouter.get(
  "/fetchCategories",
  allowUnauthenticated,
  fetchCategoriesHandler
);
categoryRouter.get(
  "/getCategoryByName/:name",
  allowUnauthenticated,
  httpGetCategoryByName
);
categoryRouter.post("/addCategory", auth, addCategoryHandler);
categoryRouter.delete("/deleteCategory/:id", auth, deleteCategoryHandler);
categoryRouter.patch("/updatecategory/:id", updateCategoryHandler);

module.exports = categoryRouter;
