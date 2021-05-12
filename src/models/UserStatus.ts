import mongoose from '../providers/Database';
import IUserStatus from '../interfaces/models/userStatus';

// Define the Group Schema
export const UserStatusSchema = new mongoose.Schema(
    {
        userId: Number, //  user id which is couchdb user id
        userNumber: Number, // number of the phone whome to send
        sendMessage: { type: Number, default: 0 }, // if 0 then dont send message if 1 then send push messages
        deviceToken: String // device token for ios
    },
    {
        timestamps: true
    }
);

const UserStatus = mongoose.model<IUserStatus>('UserStatus', UserStatusSchema);

export default UserStatus;
