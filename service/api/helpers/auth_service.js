const config = require('../../../config');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const Models = require('../../../db/models');

class AuthService {
    constructor() {
        this._secretJWT = config.auth.secretJWT;
        this._secretPWD = config.auth.secretPWD;
        this._jwtExpiresIn = config.auth.expiresIn;
        this._secretRefreshJWT = config.auth_refresh.secretJWT;
        this._refreshJwtExpiresIn = config.auth_refresh.expiresIn;
    }

    /**
     * @param{Object} user - { email, login, id }
     * @return{String}
     */
    createJWT(user) {
        return jwt.sign({
            ...user,
            login_date: new Date().toISOString()
        }, this._secretJWT, {
            expiresIn: this._jwtExpiresIn,
        });
    }

    /**
     * @param{Object} info - { ip_address }
     * @return{String}
     */
    createRefreshJWT(info) {
        return jwt.sign({
            ...info,
            login_date: new Date().toISOString()
        }, this._secretRefreshJWT, {
            expiresIn: this._refreshJwtExpiresIn,
        });
    }

    /**
     * @param{String} hash
     * @return{Object} - { email, login, id }
     */
    verifyJWT(hash) {
        try {
            return jwt.verify(hash, this._secretJWT);
        } catch (err) {
            return null;
        }
    }

    /**
     * @param{String} hash
     * @return{Object} - { ip }
     */
    verifyRefreshJWT(hash) {
        try {
            return jwt.verify(hash, this._secretRefreshJWT);
        } catch (err) {
            return null;
        }
    }

    /**
     * Create new user session
     *
     * @param {Object} - { user_id, sid, ip_address, refresh_token }
     * @return {Promise}
     */
    createUserSession({ user_id, sid, ip_address, refresh_token }) {

    }

    /**
     * End all user sessions with provided user_id or sid
     *
     * @param{Object} - { user_id, sid }
     * @return {Promise}
     */
    endUserSessions({ user_id = 0, sid = '' }) {

    }

    /**
     * End user session with provided id
     *
     * @param{Object} - { id }
     * @return {Promise}
     */
    endUserSession({ id = 0 }) {

    }
}


module.exports = new AuthService();
