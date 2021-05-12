import { Document } from 'mongoose';

/**
 * Define interface for GroupMembre Model
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

export interface IUserPushMessage extends Document {
    deviceToken: string; // Device Token
    sendMessage: number;
}

// tslint:disable-next-line:align
export default IUserPushMessage;
