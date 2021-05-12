"use strict";
/**
 * Defines the passport config
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const Local_1 = require("../services/strategies/Local");
const Google_1 = require("../services/strategies/Google");
const Twitter_1 = require("../services/strategies/Twitter");
const Facebook_1 = require("../services/strategies/Facebook");
const User_1 = require("../models/User");
const Log_1 = require("../middlewares/Log");
class Passport {
    mountPackage(_express) {
        _express = _express.use(passport.initialize());
        _express = _express.use(passport.session());
        passport.serializeUser((req, user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser((id, done) => {
            User_1.default.findById(id, (err, user) => {
                done(err, user);
            });
        });
        this.mountLocalStrategies();
        return _express;
    }
    mountLocalStrategies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Local_1.default.init(passport);
                Google_1.default.init(passport);
                Twitter_1.default.init(passport);
                yield Facebook_1.default.init(passport);
            }
            catch (_err) {
                Log_1.default.error(_err.stack);
            }
        });
    }
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('errors', { msg: 'Please Log-In to access any further!' });
        return res.redirect('/login');
    }
    isAuthorized(req, res, next) {
        const provider = req.path.split('/').slice(-1)[0];
        const token = req.user.tokens.find((token) => token.kind === provider);
        if (token) {
            return next();
        }
        else {
            return res.redirect(`/auth/${provider}`);
        }
    }
}
exports.default = new Passport;
//# sourceMappingURL=Passport.js.map