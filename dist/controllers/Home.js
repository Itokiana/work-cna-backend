"use strict";
/**
 * Handler for Home
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Home {
    static index(req, res, next) {
        return res.render('pages/home', {
            title: 'Home'
        });
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map