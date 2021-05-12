import Api from '../Index';
import { IRequest, IResponse } from '../../../interfaces/vendors';

class GetFile extends Api {
    public static perform(req: IRequest, res: IResponse) {
        console.log('file' + JSON.stringify(req.file));

        let file = req.file,
            path = './images/',
            mimetype = file.mimetype,
            fileName = file.originalname;

        if (fileName != '') {
            console.log('File saved successfully.');
            let data = {
                message: 'File saved successfully.',
                errorCode: 200,
                groupImagePath:
                    'http://185.82.23.22:3001/groupImages/' + file.filename
            };
            res.json(data);
        } else {
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

export default GetFile;
