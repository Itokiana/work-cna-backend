import mongoose from '../providers/Database';
import IRegisterUser from '../interfaces/models/registerUser';

// Define the Group Schema
export const RegisterUserSchema = new mongoose.Schema(
    {
        userId: String, // userid which is foreign key from user table couchdb
        status: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
);

const RegisterUser = mongoose.model<IRegisterUser>(
    'RegisterUser',
    RegisterUserSchema
);

export default RegisterUser;
