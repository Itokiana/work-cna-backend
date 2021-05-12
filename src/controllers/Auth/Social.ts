/**
 * Handle all your social auth routesß
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

class Social {
    public static googleCallback(req, res): any {
        return res.redirect('/account');
    }
}

export default Social;