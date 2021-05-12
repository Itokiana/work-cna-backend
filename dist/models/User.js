"use strict";
/**
 * Define User model
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const crypto = require("crypto");
const bcrypt = require("bcrypt-nodejs");
const Database_1 = require("../providers/Database");
// Define the User Schema
exports.UserSchema = new Database_1.default.Schema({
    email: {
        trim: true,
        index: true,
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: Date,
    facebook: { type: String },
    twitter: { type: String },
    google: { type: String },
    github: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    steam: { type: String },
    tokens: Array,
    firstname: {
        trim: true,
        type: String,
        required: true
    },
    lastname: {
        trim: true,
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: 'Homme',
        enum: ['Homme', 'Femme']
    },
    label: {
        trim: true,
        default: '',
        type: String
    },
    bio: {
        trim: true,
        default: '',
        type: String
    },
    geolocation: {
        type: String
    },
    website: {
        type: String
    },
    picture: {
        trim: true,
        default: '',
        type: String
    }
}, {
    timestamps: true
});
// Password hash middleware
exports.UserSchema.pre('save', function (_next) {
    const user = this;
    this.picture = `https://gravatar.com/avatar/${this.firstname} ${this.lastname}`;
    if (!user.isModified('password')) {
        return _next();
    }
    bcrypt.genSalt(10, (_err, _salt) => {
        if (_err) {
            return _next(_err);
        }
        bcrypt.hash(user.password, _salt, null, (_err, _hash) => {
            if (_err) {
                return _next(_err);
            }
            user.password = _hash;
            return _next();
        });
    });
});
// Custom Methods
// Get user's full billing address
exports.UserSchema.methods.billingAddress = function () {
    const fulladdress = `${this.fullname.trim()} ${this.geolocation.trim()}`;
    return fulladdress;
};
// Compares the user's password with the request password
exports.UserSchema.methods.comparePassword = function (_requestPassword, _cb) {
    bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
        return _cb(_err, _isMatch);
    });
};
// User's gravatar
exports.UserSchema.methods.fullname = function () {
    return `${this.firstname} ${this.lastname}`;
};
// User's gravatar
exports.UserSchema.methods.gravatar = function (_size) {
    if (!_size) {
        _size = 200;
    }
    const url = 'https://gravatar.com/avatar';
    if (!this.email) {
        return `${url}/?s=${_size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `${url}/${md5}?s=${_size}&d=retro`;
};
const User = Database_1.default.model('User', exports.UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map