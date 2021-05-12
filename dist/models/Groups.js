"use strict";
/**
 * Define User model
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSchema = void 0;
const Database_1 = require("../providers/Database");
// Define the Group Schema
exports.GroupSchema = new Database_1.default.Schema({
    name: {
        trim: true,
        type: String,
        required: true,
        lowercase: true
    },
    avtarImage: {
        trim: true,
        type: String,
        required: true,
        lowercase: true
    },
    createdByName: {
        trim: true,
        type: String,
        required: true,
        lowercase: true
    },
    createdById: Number,
    userId: String,
    groupsMembers: {
        groupId: String,
        userNumber: String,
        userId: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});
// Password hash middleware
exports.GroupSchema.pre('save', function (_next) {
    const user = this;
    this.picture = `https://gravatar.com/avatar/${this.firstname} ${this.lastname}`;
});
const Group = Database_1.default.model('Group', exports.GroupSchema);
exports.default = Group;
//# sourceMappingURL=Groups.js.map