/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 *   - name: Auth
 *     description: Operations about auth
 *
 * /login:
 *   x-swagger-router-controller: user
 * /logout:
 *   x-swagger-router-controller: user
 */
const authService = require('../../helpers/auth_service');
/**
 * User auth flow paths
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     description: This endpoint is for log in a user in with his/her email and password.
 *     operationId: loginUser
 *     parameters:
 *       - name: body
 *         required: true
 *         in: body
 *         schema:
 *           type: object
 *           required:
 *             - login
 *             - password
 *           properties:
 *             login:
 *               description: The user login
 *               type: string
 *             password:
 *               description: The password for login in clear text
 *               type: string
 *             grant_type:
 *               description: Type of authentication used to login
 *               type: string
 *             refresh_token:
 *               description: Refresh token associated with user auth request
 *               type: string
 *             rsa_key_id:
 *               description: RSA Key ID associated with user auth request
 *               type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *           $ref: "#/definitions/LoginResponse"
 *       404:
 *         $ref: "#/responses/404"
 *       500:
 *         $ref: "#/responses/500"
 */
exports.loginUser = async (req, res) => {

};

/**
 * @swagger
 * /logout:
 *   get:
 *     tags: [Auth]
 *     description: Logout user
 *     operationId: logoutUser
 *     security:
 *       - auth_token: []
 *     responses:
 *       200:
 *         description: successful operation
 *       403:
 *         $ref: "#/responses/403"
 *       500:
 *         $ref: "#/responses/500"
 */
exports.logoutUser = async (req, res) => {
    try {
        const {id: user_id} = req.user;
        const affected = await authService.endUserSessions({user_id});

        res.status(200).send({affected_rows: affected});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};
