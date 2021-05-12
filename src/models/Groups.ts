/**
 * Define User model
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt-nodejs';

import mongoose from '../providers/Database';
import IGroups from '../interfaces/models/groups';

// Define the Group Schema
export const GroupSchema = new mongoose.Schema(
    {
        name: {
            trim: true,
            type: String,
            required: true,
            lowercase: true
        }, // Name of the group
        avtarImage: {
            trim: true,
            type: String,
            required: true,
            lowercase: true
        }, // Image of the group ( this will be uploaded physically and then stored as path)
        createdByName: {
            trim: true,
            type: String,
            required: true,
            lowercase: true
        },
        createdById: Number, // creator of the group its phone number
        userId: String, // unique user id from mongodb
        groupsMembers: {
            groupId: String, //  Group id  foreigh key from group table
            userNumber: String, // User phone number
            userId: String, // userid which is foreign key from user table mongodb
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now }
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
);

// Password hash middleware
GroupSchema.pre<IGroups>('save', function (_next) {
    const user = this;

    this.picture = `https://gravatar.com/avatar/${this.firstname} ${this.lastname}`;
});

const Group = mongoose.model<IGroups>('Group', GroupSchema);

export default Group;
