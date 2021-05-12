import mongoose from '../providers/Database';
import IChat from '../interfaces/models/chat';

// Define the Group Schema
export const ChatSchema = new mongoose.Schema(
    {
        nick: String, //senderId
        msg: String, //receiverId
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
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
