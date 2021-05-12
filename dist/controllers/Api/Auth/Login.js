"use strict";
/**
 * Define Login Login for the API
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const User_1 = require("../../../models/User");
class Login {
    static perform(req, res) {
        req.assert('email', 'E-mail cannot be blank').notEmpty();
        req.assert('email', 'E-mail is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.assert('password', 'Password length must be atleast 8 characters').isLength({ min: 7 });
        req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
        const errors = req.validationErrors();
        if (errors) {
            return res.json({
                errors
            });
        }
        const _email = req.body.email.toLowerCase();
        const _password = req.body.password;
        User_1.default.findOne({ email: _email }, (err, user) => {
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
            user.comparePassword(_password, (err, isMatch) => {
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
                const token = jwt.sign({ email: _email, password: _password }, res.locals.app.appSecret, { expiresIn: res.locals.app.jwtExpiresIn * 60 });
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
exports.default = Login;
//# sourceMappingURL=Login.js.map