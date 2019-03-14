import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserHandler from '../../api/users/handler';
import config from '../../config/index';
import statusCodes from '../../config/statuscodes';
import utils from '../../commons/utils/index';
import { userInfo } from 'os';

class LoginHandler {
    constructor() {
        this.initalizeStrategies();
    }

    /**
     * The loginWithPassword method will validate username and password and give response 
     * @param req: express request object
     * @param res: express response object
     * @author  Pradeep
     * @version 1.0
    */
    loginWithPassword(req, res, next) {
        passport.authenticate('local', (err, response) => {
            console.log(err, response)
            //  Passport Error (If username or passwords are empty strings passport throwing it's own error)
            if (response == false || response == undefined) {
                var result = {
                    message: "Invalid Username or Password"
                };
                res.status(statusCodes.UNAUTHORIZED_REQUEST).send({
                    status: false,
                    result: result
                });
                return;
            }
            if (!response.status) {
                res.status(statusCodes.UNAUTHORIZED_REQUEST).send(response);
            } else {
                var token = utils.createJWTtoken(response.result, 'login');
                var result = {
                    data: { userAuthToken: token }
                };
                res.status(statusCodes.OK).send({
                    status: true,
                    result: result
                });
            }
        })(req, res, next);
    }

    /**
     * The initalizeStrategies method will initalize all the passport Strategies
     * @author  Pradeep
     * @version 1.0
     */
    initalizeStrategies() {
        if (config.authConfig.local) {
            this.initalizeLocalStrategy();
        }
    }

    /**
     * The initalizeLocalStrategy method will initalize local strategy
     * @author  Pradeep
     * @version 1.0
     */
    initalizeLocalStrategy() {
        var self = this;
        passport.use(new LocalStrategy(
            (username, password, done) => {
                self.authenticateUser(username, password, (result) => {
                    return done(null, result)
                });
            }
        ));
    }

    /**
     * The authenticateUser method will validate username and password from passport and respond
     * @param username: username to be validated
     * @param password: password to be verified
     * @param cb: callback to send response
     * @author  Pradeep
     * @version 1.0
    */
    authenticateUser(username, password, cb) {
        try {
            if (username == "" || password == "") {
                cb && cb({
                    status: false,
                    result: {
                        message: "Invalid Username or Password"
                    }
                });
                return;
            }
            var userHandler = new UserHandler();
            userHandler.getUserByEmail(username.toLowerCase(), (response) => {
                if (!response.status) {
                    cb && cb({ status: false, result: { message: "User Not Found" } });
                } else if (response.result && response.result.data[0] && response.result.data[0].isActive) {
                    var userDetails = response.result.data[0];
                    var result = utils.verifyPasswordHash(password, userDetails.password);
                    if (result.status) {
                        cb && cb({
                            status: true,
                            result: { userid: userDetails._id }
                        });
                    } else {
                        cb && cb(result);
                    }
                } else {
                    cb && cb({ status: false, result: { message: "User Not Found." } });
                }
            });

        } catch (e) {
            var error = {
                status: false,
                result: e.message
            };
            cb && cb(error);
        }
    }
}

var loginHandler = new LoginHandler();
export default loginHandler;