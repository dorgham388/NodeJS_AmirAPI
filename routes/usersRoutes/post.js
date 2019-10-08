var UsersController = require("../../controllers/users.controller");
var AuthorizationController = require("../../controllers/AuthorizationController");
var VerifyUserMiddleware = require("../../middlewares/authorization/verify.user.middleware");
var PermissionMiddleware = require("../../middlewares/permissions/permissions.middleware");
var ValidationMiddleware = require("../../middlewares/validation/validation.middleware");

const initializePostRoutes = app => {
  /**
   * @swagger
   * /users/create:
   *   post:
   *     tags:
   *       - users
   *     description: Creates a new user
   *     produces:
   *       - application/json
   *     requestBody:
   *        content:
   *         'application/json':
   *           schema:
   *            $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: User created
   *       400:
   *         description: Bad request
   */

  app.post("/users/create", [
    ValidationMiddleware.validateRegisterInput,
    UsersController.insert
  ]);

  /**
   * @swagger
   * /auth:
   *   post:
   *     tags:
   *       - users
   *     description: User authentication
   *     produces:
   *       - application/json
   *     requestBody:
   *        content:
   *         'application/json':
   *           schema:
   *            $ref: '#/components/schemas/authObject'
   *     responses:
   *       200:
   *         description: Successful authentication
   *       400:
   *         description: Invalid email or password
   */
  app.post("/auth", [
    // VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login
  ]);
};

module.exports = initializePostRoutes;
