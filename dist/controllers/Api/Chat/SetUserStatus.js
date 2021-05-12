"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Index_1 = require("../Index");
const url = require("url");
const UserPushMessage_1 = require("../../../models/UserPushMessage");
class SetUserStatus extends Index_1.default {
    static perform(req, res) {
        let jsonData = url.parse(req.url).query, jsonObject = JSON.parse(decodeURIComponent(jsonData));
        if (jsonObject.deviceToken != '' || jsonObject.deviceToken != null) {
            UserPushMessage_1.default.findOne({ deviceToken: jsonObject.deviceToken }, (err, _deviceData) => {
                if (err) {
                    return res.json({
                        errDetails: err,
                        errorcode: 505,
                        success: false
                    });
                }
                else {
                    if (_deviceData != null) {
                        // token id exist in this case update the flag
                        let conditions = {
                            deviceToken: jsonObject.deviceToken
                        }, update = {
                            sendMessage: jsonObject.sendMessage
                        }, options = { multi: true };
                        UserPushMessage_1.default.update(conditions, update, options, callback);
                        function callback(err, _numAffected) {
                            return res.json({
                                msg: 'Status of devices updated successfully.',
                                errorcode: 200,
                                numAffected: _numAffected,
                                success: true
                            });
                        }
                    }
                    else {
                        let _pushMsg = new UserPushMessage_1.default({
                            deviceToken: jsonObject.deviceToken,
                            sendMessage: jsonObject.sendMessage
                        });
                        _pushMsg.save((_errorPushMsg) => {
                            if (_errorPushMsg) {
                                return res.json({
                                    errDetails: _errorPushMsg,
                                    errorcode: 505,
                                    success: false
                                });
                            }
                            else {
                                return res.json({
                                    msg: 'Status of devices Inserted successfully.',
                                    errorcode: 200,
                                    success: true
                                });
                            }
                        });
                    }
                }
            });
        }
    }
}
exports.default = SetUserStatus;
//# sourceMappingURL=SetUserStatus.js.map