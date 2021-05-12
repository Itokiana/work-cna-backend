"use strict";
/**
 * Define Group Group for the API
 *
 * @author Mike Christopher SYLVESTRE <mike.sylvestre@lyknowledge.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const jwt = require("jsonwebtoken");
const Index_1 = require("../Index");
const User_1 = require("../../../models/User");
const Groups_1 = require("../../../models/Groups");
const GroupsMember_1 = require("../../../models/GroupsMember");
class Group extends Index_1.default {
    static perform(req, res) {
        const _token = Group.getToken(req);
        if (_token === '') {
            return res.json({
                error: ['Invalid Token!']
            });
        }
        const decode = jwt.decode(_token, res.locals.app.appSecret, {
            expiresIn: res.locals.app.jwtExpiresIn
        });
        User_1.default.findOne({ email: decode.email }, (err, user) => {
            if (err) {
                return res.json({
                    error: err
                });
            }
            if (!user) {
                return res.json({
                    error: ['User not found!']
                });
            }
            let jsonData = url.parse(req.url).query;
            let jsonObject = JSON.parse(decodeURIComponent(jsonData));
            let newGroup = new Groups_1.default({
                name: jsonObject.groupName,
                avtarImage: jsonObject.groupImage,
                createdByName: jsonObject.createdByName,
                createrId: jsonObject.createrId,
                userId: jsonObject.userId
            });
            newGroup.save((err) => {
                if (err) {
                    return res.status(500).json({
                        errDetails: err,
                        errorcode: 505,
                        success: false
                    });
                }
                else {
                    // If there is no error.
                    for (var i = 0; i < jsonObject.groupMember.length; i++) {
                        var eachGroupMember = jsonObject.groupMember[i];
                        var userId = eachGroupMember.userID;
                        var phoneNumber = eachGroupMember.phoneNumber;
                        var newGroupMember = new GroupsMember_1.default({
                            groupId: newGroup.id,
                            userNumber: phoneNumber,
                            userId: userId
                        });
                        newGroupMember.save(function (errSave) { });
                    }
                    console.log('Done');
                    return res.status(200).json({
                        msg: 'Group created successfully.',
                        errorcode: 200,
                        groupImagePath: 'http://162.243.225.225:3001/groupImages/',
                        data: newGroup,
                        groupId: newGroup.id,
                        success: true
                    });
                }
            });
        });
    }
}
exports.default = Group;
//# sourceMappingURL=Group.js.map