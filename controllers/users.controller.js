var UserModel = require("../models/users.model");
var crypto = require("crypto");
//-------------------------------------------------------------
// Inserting
exports.insert = (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  // req.body.permissionLevel = 1;
  UserModel.createUser(req.body)
    .then(result => {
      (result != undefined)?
      res.status(201).send({
        code: 201,
        status: "success",
        message: "user created",
        data: result
      }):
      res.status(400).send({
        code: 400,
        status: "error",
        message: "Invalid user object",
      })
      //{ id: result._id }
    });
};
//-------------------------------------------------------------
// Fetching by Id
exports.getById = (req, res) => {
  UserModel.findById(req.params.userId)
    .then(result => {
      res.status(200).send({
        code: 200,
        status: "success",
        message: "user found",
        data: result
      });
    })
    .catch(() =>
      res.status(404).send("User not found, retry with a valid userId.")
    );
};
//-------------------------------------------------------------
// Updating
exports.patchById = (req, res) => {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }
  UserModel.patchUser(req.params.userId, req.body)
    .then(result => {
      res.status(200).send({
        code: 200,
        status: "success",
        message: "user updated",
        data: result
      });
    })
    .catch(() =>
      res.status(404).send("User not found, retry with a valid userId.")
    );
};
//-------------------------------------------------------------
// Fetching users
exports.list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  UserModel.list(limit, page).then(result => {
    res.status(200).send({
      code: 200,
      status: "success",
      message: "users fetched",
      data: result
    });
  });
};
//-------------------------------------------------------------
// Deleting by Id
exports.removeById = (req, res) => {
  UserModel.removeById(req.params.userId)
    .then(result => {
      res.status(200).send({
        code: 200,
        status: "success",
        message: "user deleted"
      });
   })
    .catch(() =>
      res.status(404).send("User not found, retry with a valid userId.")
    );
};
