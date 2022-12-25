const connection = require("../../config/mysql");
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
  const { search } = req.query;
  let exec = {};
  if (search) {
    exec = {
      sql: "SELECT * FROM products Where name LIKE ?",
      values: [`%${search}%`],
    };
  } else {
    exec = {
      sql: "SELECT * FROM products",
    };
  }
  //   connection.connect();
  connection.query(exec, response(res));
};

const view = (req, res) => {
  //   connection.connect();
  connection.query(
    {
      sql: "SELECT * FROM products WHERE id = ?",
      values: [req.params.id],
    },
    response(res)
  );
};

const destroy = (req, res) => {
  //   connection.connect();
  connection.query(
    {
      sql: "DELETE FROM products WHERE id = ?",
      values: [req.params.id],
    },
    response(res)
  );
};

const store = (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../upload", image.originalname);
    fs.renameSync(image.path, target);
  }
  connection.query(
    {
      sql: "INSERT INTO products (user_id, name, price,stock, status,image_url) VALUES (?,?,?,?,?,?)",
      values: [
        parseInt(user_id),
        name,
        price,
        stock,
        status,
        `http://localhost:5000/public/${image.originalname}`,
      ],
    },
    response(res)
  );
};

const update = (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;
  let sql = "";
  let values = [];
  if (image) {
    const target = path.join(__dirname, "../../upload", image.originalname);
    fs.renameSync(image.path, target);
    sql =
      "UPDATE products SET user_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url=? WHERE id=?";
    values = [
      parseInt(user_id),
      name,
      price,
      stock,
      status,
      `http://localhost:5000/public/${image.originalname}`,
      req.params.id,
    ];
  } else {
    sql =
      "UPDATE products SET user_id = ?, name = ?, price = ?, stock = ?, status = ?, WHERE id = ?";
    values = [parseInt(user_id), name, price, stock, status, req.params.id];
  }

  connection.query(
    {
      sql,
      values,
    },
    response(res)
  );
};

const response = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "failed",
        response: error,
      });
    } else {
      res.send({
        status: "success",
        response: result,
      });
    }
  };
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
