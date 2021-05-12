/**
 * Define Facebook OAuth2
 *
 * @author Hary Itokiana RAJOELISON JOSUE <itokiana@sayna.io>
 */

import { Strategy } from 'passport-facebook';
import axios from 'axios';
import User from '../../models/User';
import Locals from '../../providers/Locals';

// Make request to Facebook graph API for to get Facebook user data
async function getFacebookUserData(accessToken: String, userId: String): Promise<any> {
    const { data } = await axios({
        url: `https://graph.facebook.com/v10.0/${userId}`,
        method: 'get',
        headers: { 'access_token': accessToken },
        params: {
            fields: ['id', 'name', 'email', 'first_name', 'last_name', 'picture', 'friends'].join(','),
            access_token: accessToken
        }
    });
    return data;
}

class Facebook {
    public static async init(_passport: any): Promise<any> {
        _passport.use(
            new Strategy(
                {
                    clientID: process.env.FACEBOOK_APP_ID,
                    clientSecret: process.env.FACEBOOK_APP_SECRET,
                    callbackURL: `${Locals.config().url}/auth/facebook/callback`,
                    passReqToCallback: true
                },
                async (req, accessToken, refreshToken, profile, done) => {

                    const userData = await getFacebookUserData(accessToken, profile.id);

                    if (req.user) {
                         User.findOne({ facebook: profile.id }, (err, existingUser) => {
                             if (err) {
                                 return done(err);
                             }

                             if (existingUser) {
                                 req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                                 return done(err);
                             } else {
                                 User.findById(req.user.id, (err, user) => {
                                     if (err) {
                                         return done(err);
                                     }

                                     user.facebook = profile.id;
                                     user.tokens.push({ kind: 'facebook', accessToken });
                                     user.firstname = userData.first_name;
                                     user.lastname = userData.last_name;
                                     user.picture = userData.picture.data.url
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
                    } else {
                         User.findOne({ facebook: profile.id }, (err, existingUser) => {
                             if (err) {
                                 return done(err);
                             }

                             if (existingUser) {
                                 return done(null, existingUser);
                             }

                             const user = new User();
                             // Twitter does not provides the user's e-mail address.
                             // We can "fake" a twitter email address as follows:
                             user.email = userData.email || `itokiana@sayna.io`;
                             user.firstname = userData.first_name;
                             user.lastname = userData.last_name;
                             user.facebook = profile.id;
                             user.picture = userData.picture.data.url
                             user.tokens.push({ kind: 'facebook', accessToken });
                             user.fullname = profile.displayName;
                             user.save((err) => {
                                 done(err, user);
                             });
                         });
                    }
                }
            )
        );
    }
}

export default Facebook;
