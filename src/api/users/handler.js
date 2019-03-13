import users from './user';
import statusCodes from '../../config/statuscodes';

export default class UserHandler {
    constructor() {
    }

    /**
     * createUser method will accept input as userparameters
     * @param body: User Details to create a record
     * @param cb : to return response
     * @author  Pradeep
     * @version 1.0
     */
    createUser(body, cb) {
        try {
            global.dbController.insert('users', body, (userData) => {
                if (userData.status) {
                    cb && cb(userData, statusCodes.SUCCESSFULLY_CREATED);
                } else {
                    cb && cb(userData, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in createUser handler ", e.message);
            var error = {
                status: false,
                result: { err: e.message }
            }
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    updateUser(userid, body, cb) {
        try {
            global.dbController.update('users', { _id: userid }, body, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in updateUser handler ", e.message);
            var error = {
                status: false,
                result: { err: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * getUsers method will return list of users
     * @param params: limit and offset for paginition
     * @param cb : to return response
     * @author  Pradeep
     * @version 1.0
     */
    getUsers(params, cb) {
        try {
            global.dbController.find('users', {}, params, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in getUsers handler ", e.message);
            var error = {
                status: false,
                result: {
                    message: e.message
                }
            }
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * getUserByID method will return the selected user details
     * @param userid: Selected user id
     * @param cb : to return response
     * @author  Pradeep
     * @version 1.0
     */
    getUserByID(userid, cb) {
        var query = {
            _id: global.dbController.convertIdToObjectID(userid)
        }
        this.getUserDetails(query, cb);
    }

    getUserDetails(query, cb) {
        try {
            var newQuery = [
                { $match: query },
                {
                    $lookup: {
                        from: "roles",
                        localField: 'userrole',
                        foreignField: "_id",
                        as: "rolesDetails"
                    }
                },
                {
                    $addFields: {
                        rolesDetails: {
                            $map: {
                                input: "$rolesDetails",
                                as: "rolesDetails",
                                in: {
                                    _id: "$$rolesDetails._id",
                                    roleName: "$$rolesDetails.roleName",
                                    displayName: "$$rolesDetails.displayName"
                                }
                            }
                        }
                    }
                }
            ];
            global.dbController.aggregate('users', newQuery, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            })
        } catch (e) {
            console.log("error catched in getUserDetails handler ", e.message);
            var error = {
                status: false,
                result: {
                    message: e.message
                }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}