import { Document } from 'mongoose';

/**
 * Define interface for GroupMembre Model
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

export interface IChat extends Document {
    nick: String; //senderId
    msg: String; //receiverId
    img: String;
    receiver: String;
    imgFlag: Number;
    isImgDownloaded: Number;
    created: Date;
    chatId: String;
    readUnreadFlg: Number;
    groupId: String;
    groupOwnerId: Number;
    groupMemberId: String;
    groupName: String;
    senderName: String;
    senderImage: String;
    isBlocked: Number;
    loginUserId: String;
}

// tslint:disable-next-line:align
export default IChat;
