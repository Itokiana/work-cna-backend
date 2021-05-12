"use strict";
/**
 * Handler for Account
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    static index(req, res) {
        return res.render('pages/dashboard', {
            title: 'Home'
        });
    }
}
exports.default = Account;
//# sourceMappingURL=Account.js.map