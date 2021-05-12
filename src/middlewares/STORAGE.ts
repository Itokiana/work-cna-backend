/**
 * Enables the CORS
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

import multer from 'multer';

class STORAGE {
    public getLocal() {
        return multer({
            destination: (req, file, cb) => {
                cb(null, 'uploads/');
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });
    }
}

export default new STORAGE();