const express = require("express");
const path = require("path");
const app = express();
const productRouter = require("./app/product/routes");
const res = require("express/lib/response");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "upload")));
app.use("/api/v1", productRouter);

app.use((req, res, next) => {
  // app.use((err, req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "Resource " + req.originalUrl + " Not Found",
  });
});

app.listen(3000, () => console.log("server: http://localhost:3000"));
