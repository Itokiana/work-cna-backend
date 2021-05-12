"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserSchema = void 0;
const Database_1 = require("../providers/Database");
// Define the Group Schema
exports.RegisterUserSchema = new Database_1.default.Schema({
    userId: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});
const RegisterUser = Database_1.default.model('RegisterUser', exports.RegisterUserSchema);
exports.default = RegisterUser;
//# sourceMappingURL=RegisterUser.js.map