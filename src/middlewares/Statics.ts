/**
 * Defines all the app-statics
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

import * as path from 'path';
import * as express from 'express';

import Log from './Log';

class Statics {
    public static mount(_express: express.Application): express.Application {
        Log.info("Booting the 'Statics' middleware...");

        // Loads Options
        const options = { maxAge: 31557600000 };

        // Load Statics
        _express.use(
            '/public',
            express.static(path.join(__dirname, '../../public'), options)
        );

        // Load NPM Statics
        _express.use(
            '/vendor',
            express.static(path.join(__dirname, '../../node_modules'), options)
        );

        // File Storage
        _express.use(
            '/groupImages',
            express.static(path.join(__dirname, 'images/groupImages'))
        );

        return _express;
    }
}

export default Statics;
