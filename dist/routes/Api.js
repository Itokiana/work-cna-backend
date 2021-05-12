"use strict";
/**
 * Define all your API web-routes
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressJwt = require("express-jwt");
const Locals_1 = require("../providers/Locals");
const Login_1 = require("../controllers/Api/Auth/Login");
const Register_1 = require("../controllers/Api/Auth/Register");
const RefreshToken_1 = require("../controllers/Api/Auth/RefreshToken");
// Chat
const SetUserStatus_1 = require("../controllers/Api/Chat/SetUserStatus");
const Group_1 = require("../controllers/Api/Chat/Group");
const CORS_1 = require("../middlewares/CORS");
// const upload = multer({
//     dest: 'images/',
//     inMemory: true,
//     storage: storage.getLocal()
// });
const router = express_1.Router();
// Auth
router.post('/auth/login', Login_1.default.perform);
router.post('/auth/register', Register_1.default.perform);
router.post('/auth/refresh-token', expressJwt({ secret: Locals_1.default.config().appSecret }), RefreshToken_1.default.perform);
// Chat
// router.post('/chat/getFile', upload.single('uploadFile'));
router.get('/chat/setUserStatus', SetUserStatus_1.default.perform);
router.post('/chat/createGroup', CORS_1.default.mount, Group_1.default.perform);
exports.default = router;
//# sourceMappingURL=Api.js.map