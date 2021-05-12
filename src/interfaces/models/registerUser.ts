import { Document } from 'mongoose';

/**
 * Define interface for GroupMembre Model
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

export interface IRegisterUser extends Document {
    userId: string; // userid which is foreign key from user table couchdb
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

// tslint:disable-next-line:align
export default IRegisterUser;
