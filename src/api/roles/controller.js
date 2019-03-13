import RoleHandler from './handler';

export const createRole = (req, res) => {
    var body = req.body;
    var roleHandler = new RoleHandler();
    roleHandler.createRole(req.body, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
}

export const getRoles = (req, res) => {
    var roleHandler = new RoleHandler();
    roleHandler.getRoles(req.query, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
};


export const updateRole = (req, res) => {
    var roleHandler = new RoleHandler();
    var roleid = req.swagger.params.roleid.value;
    roleHandler.updateRole(roleid, req.body, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
};

export const getRoleByID = (req, res) => {
    var roleHandler = new RoleHandler();
    var roleid = req.swagger.params.roleid.value;
    roleHandler.getRoleByID(roleid, (result, statusCode) => {
        res.status(statusCode).send(result);
    });
};