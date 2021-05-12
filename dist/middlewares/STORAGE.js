"use strict";
/**
 * Enables the CORS
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
class STORAGE {
    getLocal() {
        return multer_1.default({
            destination: (req, file, cb) => {
                cb(null, 'uploads/');
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });
    }
}
exports.default = new STORAGE();
//# sourceMappingURL=STORAGE.js.map