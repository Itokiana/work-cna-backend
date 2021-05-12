/**
 * Define all your API web-routes
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

import { Router } from 'express';
import * as expressJwt from 'express-jwt';

import Locals from '../providers/Locals';

// Auth
import HomeController from '../controllers/Api/Index';
import LoginController from '../controllers/Api/Auth/Login';
import RegisterController from '../controllers/Api/Auth/Register';
import RefreshTokenController from '../controllers/Api/Auth/RefreshToken';

// Chat
import SetUserStatus from '../controllers/Api/Chat/SetUserStatus';
import Group from '../controllers/Api/Chat/Group';
import cors from '../middlewares/CORS';

// TODO Mettre dans un fichier séparé la variable Upload
import multer from 'multer';
import storage from '../middlewares/STORAGE';
// const upload = multer({
//     dest: 'images/',
//     inMemory: true,
//     storage: storage.getLocal()
// });

const router = Router();

// Auth
router.post('/auth/login', LoginController.perform);
router.post('/auth/register', RegisterController.perform);
router.post(
    '/auth/refresh-token',
    expressJwt({ secret: Locals.config().appSecret }),
    RefreshTokenController.perform
);

// Chat
// router.post('/chat/getFile', upload.single('uploadFile'));
router.get('/chat/setUserStatus', SetUserStatus.perform);
router.post('/chat/createGroup', cors.mount, Group.perform);

export default router;