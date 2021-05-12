"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSchema = void 0;
const Database_1 = require("../providers/Database");
// Define the Group Schema
exports.ChatSchema = new Database_1.default.Schema({
    nick: String,
    msg: String,
    img: String,
    receiver: String,
    imgFlag: Number,
    isImgDownloaded: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
    chatId: String,
    readUnreadFlg: Number,
    groupId: String,
    groupOwnerId: Number,
    groupMemberId: String,
    groupName: String,
    senderName: String,
    senderImage: String,
    isBlocked: { type: Number, default: 0 },
    loginUserId: String
}, {
    timestamps: true
});
const Chat = Database_1.default.model('Chat', exports.ChatSchema);
exports.default = Chat;
//# sourceMappingURL=Chat.js.map