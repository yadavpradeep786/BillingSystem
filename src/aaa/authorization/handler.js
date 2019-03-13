import lodash from 'lodash';
import utils from '../../commons/utils/index';
import statuscodes from '../../config/statuscodes'
import RoleHandler from '../../api/roles/handler';
// import UserSubscriptions from '../../api/subscriptions/userSubscriptions/handler';

class AuthorizationHanlder {
    constructor() {
    }

    authorizeRequest(req, authOrSecDef, cb) {
        var actionName = req.swagger.operation["x-security-scopes"][0];
        var resourceCode = req.swagger.operation["tags"][0];
        var error = {
            status: false,
            result: "Un Authorized Request",
            statusCode: statuscodes.UNAUTHORIZED_REQUEST
        };

        try {
            var contextuserid = req.context.userid;
            var role = await this.getContextRoles(subscriptionContext.result.data.roleId);
            if (!role.status) {
                return cb(error);
            }

        } catch (e) {
            console.log("error catched in authorizeRequest:", e.message);
            cb({
                status: false,
                result: e.message,
                statusCode: statuscodes.INTERNAL_SERVER_ERROR
            });
        }
    }

    async getContextRoles(roleid) {
        var roleHandler = new RoleHandler();
        const result = await new Promise((resolve) => {
            roleHandler.getRoleByID(roleid, (response) => {
                resolve(response)
            })
        });
        return result;
    }
}