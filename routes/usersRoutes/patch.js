var UsersController = require("../../controllers/users.controller");
var PermissionMiddleware = require("../../middlewares/permissions/permissions.middleware");
var ValidationMiddleware = require("../../middlewares/validation/validation.middleware");

const initializePatchRoutes = app => {
  /**
   * @swagger
   * /users/{userId}:
   *    patch:
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
   *     requestBody:
   *        content:
   *         'application/json':
   *           schema:
   *             type: "object"
   *     responses:
   *       200:
   *         description: User patched
   *       404:
   *         description: User not found
   */
  app.patch("/users/:userId", [
    UsersController.patchById
  ]);
};

module.exports = initializePatchRoutes;
