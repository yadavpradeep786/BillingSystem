import UserHandler from './handler';

export const createUser = (req, res) => {
    var userHandler = new UserHandler();
    userHandler.createUser(req.body, (response, statusCode) => {
        res.status(statusCode).send(response);
    });
}

export const updateUser = (req, res) => {
    var userHandler = new UserHandler();
    var userid = req.swagger.params.userid.value;
    userHandler.updateUser(userid, req.createUserbody, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
}

export const getUserByID = (req, res) => {
    var userHandler = new UserHandler();
    var userid = req.swagger.params.userid.value;
    userHandler.getUserByID(userid, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
}

export const getUsers = (req, res) => {
    console.log("IN")
    var userHandler = new UserHandler();
    userHandler.getUsers(req.query, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
}