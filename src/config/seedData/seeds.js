import User from '../../api/users/user';
import Roles from '../../api/roles/role';
import lodash from 'lodash';

let defaultCompanyID = '';
let platformAdminRoleID = '';

async function insertDefaultUser() {
    // inserting platform admin default user
    let defaultUser = {
        firstName: "",
        middleName: "",
        lastName: "",
        name: "platformadmin",
        mobileNumber: "9999999999",
        email: "platformadmin@gmail.com",
        userName: "platformadmin@gmail.com",
        password: "Yadav@123",
        isActive: true,
        isSystemDefined: true,
        userrole: platformAdminRoleID,
    };

    let userDetails = await new Promise((resolve) => {
        global.dbController.upsert("users", { email: defaultUser.email }, defaultUser, (result) => {
            resolve(result);
        });
    });

    if (!userDetails.status) {
        console.log("Problem in creating platform admin");
    }
}

async function insertDefaultRoles() {
    let platformAdminRole = {
        roleName: "platformadmin",
        displayName: "Platform Admin",
        isSystemDefined: true,
    };

    let roleDetails = await new Promise((resolve) => {
        global.dbController.upsert('roles', { roleName: "platformadmin" }, platformAdminRole, (result) => {
            resolve(result);
        });
    });

    if (!roleDetails.status) {
        console.log("Problem in creating platform admin role:", JSON.stringify(roleDetails));
    }
    platformAdminRoleID = roleDetails.result.data;
}

export default async function insertSeedData() {
    await insertDefaultRoles();
    await insertDefaultUser();
}