import mongoose from '../providers/Database';
import IGroupsMembers from '../interfaces/models/groupsMember';

// Define the Group Schema
export const GroupMemberSchema = new mongoose.Schema({
    userId: { type: String }, // userid which is foreign key from user table couchdb
    groupId: { type: String }, //  Group id  foreigh key from group table
    userNumber: { type: String }, // User phone number
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const GroupMembers = mongoose.model<IGroupsMembers>(
    'GroupMember',
    GroupMemberSchema
);

export default GroupMembers;
