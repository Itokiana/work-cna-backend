/**
 * Defines the passport config
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

import { Application } from 'express';
import * as passport from 'passport';

import LocalStrategy from '../services/strategies/Local';
import GoogleStrategy from '../services/strategies/Google';
import TwitterStrategy from '../services/strategies/Twitter';
import FacebookStrategy from '../services/strategies/Facebook';

import User from '../models/User';
import Log from '../middlewares/Log';

class Passport {
    public mountPackage(_express: Application): Application {
        _express = _express.use(passport.initialize());
        _express = _express.use(passport.session());

        passport.serializeUser < any, any > ((req, user: any, done) => {
            done(null, user.id);
        });

        passport.deserializeUser < any, any > ((id, done) => {
            User.findById(id, (err: any, user: any) => {
                done(err, user);
            });
        });

        this.mountLocalStrategies();

        return _express;
    }

    public async mountLocalStrategies(): Promise<void> {
        try {
            // LocalStrategy.init(passport);
            // GoogleStrategy.init(passport);
            // TwitterStrategy.init(passport);
            await FacebookStrategy.init(passport);
        } catch (_err) {
            Log.error(_err.stack);
        }
    }

    public isAuthenticated(req: any, res: any, next: any): any {
        if (req.isAuthenticated()) {
            return next();
        }

        req.flash('errors', { msg: 'Please Log-In to access any further!' });
        return res.redirect('/login');
    }

    public isAuthorized(req: any, res: any, next: any): any {
        const provider = req.path.split('/').slice(-1)[0];
        const token = req.user.tokens.find((token: any) => token.kind === provider);
        if (token) {
            return next();
        } else {
            return res.redirect(`/auth/${provider}`);
        }
    }
}

export default new Passport;