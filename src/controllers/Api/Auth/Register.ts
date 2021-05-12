/**
 * Define the Register API logic
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

import User from '../../../models/User';

class Register {
    public static perform(req, res): any {
        req.assert('firstname', 'firstname cannot be blank').notEmpty();
        req.assert('lastname', 'lastname cannot be blank').notEmpty();
        req.assert('email', 'E-mail cannot be blank').notEmpty();
        req.assert('email', 'E-mail is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.assert('password', 'Password length must be atleast 8 characters').isLength({ min: 7 });
        req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

        const errors = req.validationErrors();
        if (errors) {
            return res.json({
                error: errors,
                body: req.body
            });
        }

        const _firstname = req.body.firstname;
        const _lastname = req.body.lastname;

        const _email = req.body.email;
        const _password = req.body.password;

        const user = new User({
            firstname: _firstname,
            lastname: _lastname,
            email: _email,
            password: _password
        });

        User.findOne({ email: _email }, (err, existingUser) => {
            if (err) {
                return res.json({
                    error: err
                });
            }

            if (existingUser) {
                return res.json({
                    error: ['Account with the e-mail address already exists.']
                });
            }

            user.save((err) => {
                if (err) {
                    return res.json({
                        error: err
                    });
                }

                return res.json({
                    message: ['You have been successfully registered with us!']
                });
            });
        });
    }
}

export default Register;