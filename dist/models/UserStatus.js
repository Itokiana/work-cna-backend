"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatusSchema = void 0;
const Database_1 = require("../providers/Database");
// Define the Group Schema
exports.UserStatusSchema = new Database_1.default.Schema({
    userId: Number,
    userNumber: Number,
    sendMessage: { type: Number, default: 0 },
    deviceToken: String // device token for ios
}, {
    timestamps: true
});
const UserStatus = Database_1.default.model('UserStatus', exports.UserStatusSchema);
exports.default = UserStatus;
//# sourceMappingURL=UserStatus.js.map