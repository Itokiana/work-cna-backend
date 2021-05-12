import IGroupsMembers from './groupsMember';
import { Document } from 'mongoose';
/**
 * Define interface for Group Model
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

export interface IGroups extends Document {
    name: string;
    userId: string;
    avtarImage: string;
    createdByName: string;

    createdById: number;

    groupsMember: IGroupsMembers;

    createdAt: Date;
    updatedAt: Date;
}

export default IGroups;
