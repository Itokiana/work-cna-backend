"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPushMessageSchema = void 0;
const Database_1 = require("../providers/Database");
// Define the Group Schema
exports.UserPushMessageSchema = new Database_1.default.Schema({
    deviceToken: String,
    sendMessage: { type: Number, default: 0 } // if user is in background then set to 1 if foreground then set to 0
}, {
    timestamps: true
});
const UserPushMessage = Database_1.default.model('UserPushMessage', exports.UserPushMessageSchema);
exports.default = UserPushMessage;
//# sourceMappingURL=UserPushMessage.js.map