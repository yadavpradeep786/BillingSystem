import utils from '../../commons/utils/index';
import UserHandler from '../../api/users/handler';

class ContextHandler {
    constructor() {
    }

    async getUserContext(req, authOrSecDef, token, cb) {
        console.log('Inside getUserContext');
        var error = {
            status: false,
            result: { message: "Invalid Token", isInvalidToken: true },
            statusCode: statuscodes.UNAUTHORIZED_REQUEST
        };

        if (!token) {
            return cb(error);
        }

        utils.asyncverifyJWTtoken(token, 'login', (tokenResponse) => {
            if (!tokenResponse.status) {
                return cb(error);
            }

            var userHandler = new UserHandler();
            userHandler.getUserByID(contextuserid, (response) => {
                if (response.status) {
                    var contextuserid = tokenResponse && tokenResponse.result && tokenResponse.result.userid;

                    var userData = response.result && response.result.data[0];
                    // console.log("loggedIn userData - ", userData);
                    if(userData) {
                        req.context = {
                            userid: userData._id,
                            roleData: userData.userroles[0],
                            userData: userData
                        };
                    if (userData.isActive) {
                        return cb(null);
                    } else {
                        cb(error);
                    }
                } else {
                    error.result.userNotFound = true;
                    return cb(error);
                }
            });
        });

        return cb(null);
    }
}