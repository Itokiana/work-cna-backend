import { Document } from 'mongoose';

/**
 * Define interface for GroupMembre Model
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

export interface IGroupsMembers extends Document {
    userId: string;
    groupId: string;
    userNumber: string;

    createdAt: Date;
    updatedAt: Date;
}

// tslint:disable-next-line:align
export default IGroupsMembers;
