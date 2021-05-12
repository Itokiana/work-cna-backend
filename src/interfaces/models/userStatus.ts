import { Document } from 'mongoose';

/**
 * Define interface for GroupMembre Model
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

export interface IUserStatus extends Document {
    userId: Number; //  user id which is couchdb user id
    userNumber: Number; // number of the phone whome to send
    sendMessage: Number; // if 0 then dont send message if 1 then send push messages
    deviceToken: String; // device token for ios
}

// tslint:disable-next-line:align
export default IUserStatus;
