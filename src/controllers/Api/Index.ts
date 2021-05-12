/**
 * Define the API base
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

import Locals from '../../providers/Locals';

abstract class Api {

    protected static getToken(req): string {
        return (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') ? req.headers.authorization.split(' ')[1] : (req.query && req.query.token) ? req.query.token : '';
    }

}

export default Api;