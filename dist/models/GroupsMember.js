"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMemberSchema = void 0;
const Database_1 = require("../providers/Database");
// Define the Group Schema
exports.GroupMemberSchema = new Database_1.default.Schema({
    userId: { type: String },
    groupId: { type: String },
    userNumber: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const GroupMembers = Database_1.default.model('GroupMember', exports.GroupMemberSchema);
exports.default = GroupMembers;
//# sourceMappingURL=GroupsMember.js.map