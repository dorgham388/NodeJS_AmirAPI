var UsersController = require("../../controllers/users.controller");
var PermissionMiddleware = require("../../middlewares/permissions/permissions.middleware");
var ValidationMiddleware = require("../../middlewares/validation/validation.middleware");

const initializeDeleteRoutes = app => {
  /**
   * @swagger
   * /users/{userId}:
   *    delete:
   *     tags:
   *     - users
   *     description: This should return all users
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userId
   *         description: user id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User deleted
   *       404:
   *         description: User not found
   */
  app.delete("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(3),
    UsersController.removeById
  ]);
};

module.exports = initializeDeleteRoutes;
