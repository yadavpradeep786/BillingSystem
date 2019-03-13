import lodash from 'lodash';
import roles from './role';
import statusCodes from '../../config/statuscodes';


export default class RoleHandler {
    constructor() {
    }

    /**
    * creatRole method will accept input as roleparameters
    * @param body: Role Details to create a record
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    async createRole(body, cb) {
        try {
            global.dbController.insert('roles', body, (roleData) => {
                if (roleData.status) {
                    var response = {
                        status: true,
                        result: { roleid: roleData.result.data }
                    }
                    cb && cb(response, statusCodes.SUCCESSFULLY_CREATED);
                } else {
                    cb && cb(roleData, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in creatRole handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
    * getRoles method will return all the created roles
    * @param params: limit and offset for paginition
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    getRoles(params, cb) {
        try {
            global.dbController.find('roles', {}, params, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in getRoles handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
    * updateRole method will update the selected role
    * @param roleid: Selected role id
    * @param body: parameters need to update
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    updateRole(roleid, body, cb) {
        try {
            global.dbController.update('roles', { _id: roleid }, body, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in updateRole handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
    * getRoleByID method will return the selected role details
    * @param roleid: Selected role id
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    getRoleByID(roleid, cb) {
        try {
            global.dbController.findOne('roles', { _id: global.dbController.convertIdToObjectID(roleid) }, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in getRoleByID handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
    * getRoleByName method will return the selected role details
    * @param roleName: Selected role name
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    getRoleByName(roleName, cb) {
        try {
            global.dbController.findOne('roles', { 'roleName': roleName }, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in getRoleByName handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}