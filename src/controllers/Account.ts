/**
 * Handler for Account
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

import { IRequest, IResponse } from '../interfaces/vendors';

class Account {
    public static index(req: IRequest, res: IResponse): void {
        return res.render('pages/dashboard', {
            title: 'Home'
        });
    }
}

export default Account;