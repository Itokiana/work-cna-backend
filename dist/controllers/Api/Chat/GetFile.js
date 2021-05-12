"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Index_1 = require("../Index");
class GetFile extends Index_1.default {
    static perform(req, res) {
        console.log('file' + JSON.stringify(req.file));
        let file = req.file, path = './images/', mimetype = file.mimetype, fileName = file.originalname;
        if (fileName != '') {
            console.log('File saved successfully.');
            let data = {
                message: 'File saved successfully.',
                errorCode: 200,
                groupImagePath: 'http://185.82.23.22:3001/groupImages/' + file.filename
            };
            res.json(data);
        }
        else {
            console.log('Error, unsaved file. Please try again.');
            let data = {
                message: 'Problem saving the file. Please try again.',
                errorCode: 400,
                groupImagePath: ''
            };
            res.json(data);
        }
    }
}
exports.default = GetFile;
//# sourceMappingURL=GetFile.js.map