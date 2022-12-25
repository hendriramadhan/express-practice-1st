const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "upload" });
const fs = require("fs");
const path = require("path");
const connection = require("../../config/mysql");
const productController = require("./controller");

router.get("/products", productController.index);

router.get("/products/:id", productController.view);

//input
router.post("/products/", upload.single("image"), productController.store);
router.put("/products/:id", upload.single("image"), productController.update);
router.delete(
  "/products/:id",
  upload.single("image"),
  productController.destroy
);

// router.get("/:category/:tag", (req, res) => {
//   const { category, tag } = req.params;
//   res.json({ category, tag });
// });

module.exports = router;
