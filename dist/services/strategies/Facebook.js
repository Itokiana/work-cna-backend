"use strict";
/**
 * Define Facebook OAuth2
 *
 * @author Hary Itokiana RAJOELISON JOSUE <itokiana@sayna.io>
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
const passport_facebook_1 = require("passport-facebook");
const axios_1 = require("axios");
const User_1 = require("../../models/User");
const Locals_1 = require("../../providers/Locals");
// Make request to Facebook graph API for to get Facebook user data
function getFacebookUserData(accessToken, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios_1.default({
            url: `https://graph.facebook.com/v10.0/${userId}`,
            method: 'get',
            headers: { 'access_token': accessToken },
            params: {
                fields: ['id', 'name', 'email', 'first_name', 'last_name', 'picture', 'friends'].join(','),
                access_token: accessToken
            }
        });
        return data;
    });
}
class Facebook {
    static init(_passport) {
        return __awaiter(this, void 0, void 0, function* () {
            _passport.use(new passport_facebook_1.Strategy({
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: `${Locals_1.default.config().url}/auth/facebook/callback`,
                passReqToCallback: true
            }, (req, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
                const userData = yield getFacebookUserData(accessToken, profile.id);
                if (req.user) {
                    User_1.default.findOne({ facebook: profile.id }, (err, existingUser) => {
                        if (err) {
                            return done(err);
                        }
                        if (existingUser) {
                            req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                            return done(err);
                        }
                        else {
                            User_1.default.findById(req.user.id, (err, user) => {
                                if (err) {
                                    return done(err);
                                }
                                user.facebook = profile.id;
                                user.tokens.push({ kind: 'facebook', accessToken });
                                user.firstname = userData.first_name;
                                user.lastname = userData.last_name;
                                user.picture = userData.picture.data.url;
                                user.fullname = user.fullname || profile.displayName;
                                user.email = userData.email || `itokiana@sayna.io`;
                                user.save((err) => {
                                    if (err) {
                                        return done(err);
                                    }
                                    req.flash('info', { msg: 'Facebook account has been linked.' });
                                    return done(err, user);
                                });
                            });
                        }
                    });
                }
                else {
                    User_1.default.findOne({ facebook: profile.id }, (err, existingUser) => {
                        if (err) {
                            return done(err);
                        }
                        if (existingUser) {
                            return done(null, existingUser);
                        }
                        const user = new User_1.default();
                        // Twitter does not provides the user's e-mail address.
                        // We can "fake" a twitter email address as follows:
                        user.email = userData.email || `itokiana@sayna.io`;
                        user.firstname = userData.first_name;
                        user.lastname = userData.last_name;
                        user.facebook = profile.id;
                        user.picture = userData.picture.data.url;
                        user.tokens.push({ kind: 'facebook', accessToken });
                        user.fullname = profile.displayName;
                        user.save((err) => {
                            done(err, user);
                        });
                    });
                }
            })));
        });
    }
}
exports.default = Facebook;
//# sourceMappingURL=Facebook.js.map