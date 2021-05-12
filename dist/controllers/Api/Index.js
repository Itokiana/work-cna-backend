"use strict";
/**
 * Define the API base
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Api {
    static getToken(req) {
        return (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') ? req.headers.authorization.split(' ')[1] : (req.query && req.query.token) ? req.query.token : '';
    }
}
exports.default = Api;
//# sourceMappingURL=Index.js.map