"use strict";
/**
 * Refresh JWToken
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const Index_1 = require("../Index");
const User_1 = require("../../../models/User");
class RefreshToken extends Index_1.default {
    static perform(req, res) {
        const _token = RefreshToken.getToken(req);
        if (_token === '') {
            return res.json({
                error: ['Invalid Token!']
            });
        }
        const decode = jwt.decode(_token, res.locals.app.appSecret, { expiresIn: res.locals.app.jwtExpiresIn });
        User_1.default.findOne({ email: decode.email }, (err, user) => {
            if (err) {
                return res.json({
                    error: err
                });
            }
            if (!user) {
                return res.json({
                    error: ['User not found!']
                });
            }
            if (!user.password) {
                return res.json({
                    error: ['Please login using your social creds']
                });
            }
            user.comparePassword(decode.password, (err, isMatch) => {
                if (err) {
                    return res.json({
                        error: err
                    });
                }
                if (!isMatch) {
                    return res.json({
                        error: ['Password does not match!']
                    });
                }
                const token = jwt.sign({ email: decode.email, password: decode.password }, res.locals.app.appSecret, { expiresIn: res.locals.app.jwtExpiresIn * 60 });
                // Hide protected columns
                user.tokens = undefined;
                user.password = undefined;
                return res.json({
                    user,
                    token,
                    token_expires_in: res.locals.app.jwtExpiresIn * 60
                });
            });
        });
    }
}
exports.default = RefreshToken;
//# sourceMappingURL=RefreshToken.js.map