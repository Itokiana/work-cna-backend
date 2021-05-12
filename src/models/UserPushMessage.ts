import mongoose from '../providers/Database';
import IUserPushMessage from '../interfaces/models/userPushMessage';

// Define the Group Schema
export const UserPushMessageSchema = new mongoose.Schema(
    {
        deviceToken: String, // Device Token
        sendMessage: { type: Number, default: 0 } // if user is in background then set to 1 if foreground then set to 0
    },
    {
        timestamps: true
    }
);

const UserPushMessage = mongoose.model<IUserPushMessage>(
    'UserPushMessage',
    UserPushMessageSchema
);

export default UserPushMessage;
