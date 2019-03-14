import User from '../../api/users/user';
import Roles from '../../api/roles/role';
import products from '../../api/products/product';
import lodash from 'lodash';

let defaultEmpID = null;
let defaultAffID = null;

async function insertDefaultUsers() {
    // inserting admin default emp
    let defaultUser = {
        firstName: "Pradeep",
        lastName: "Yadav",
        email: "emp01@gmail.com",
        password: "123456",
        isActive: true,
        isSystemDefined: true,
        userrole: defaultEmpID,
    };

    let userDetails = await new Promise((resolve) => {
        global.dbController.upsert("users", { email: defaultUser.email }, defaultUser, (result) => {
            resolve(result);
        });
    });

    if (!userDetails.status) {
        console.log("Problem in creating default emp");
    }
    
    // inserting admin default aff
    let defaultAff = {
        firstName: "Rahul",
        lastName: "Yadav",
        email: "aff01@gmail.com",
        password: "123456",
        isActive: true,
        isSystemDefined: true,
        userrole: defaultAffID,
    };

    let userDetailsAff = await new Promise((resolve) => {
        global.dbController.upsert("users", { email: defaultAff.email }, defaultAff, (result) => {
            resolve(result);
        });
    });

    if (!userDetailsAff.status) {
        console.log("Problem in creating default admin");
    }
}

async function insertDefaultRoles() {
    let defaultEmp = {
        roleName: "EMPLOYEE",
        displayName: "EMPLOYEE",
        isSystemDefined: true,
        isActive: true
    };
    let defaultAff = {
        roleName: "AFFILIATE",
        displayName: "AFFILIATE",
        isSystemDefined: true,
        isActive: true
    };

    let roleDetailsEmp = await new Promise((resolve) => {
        global.dbController.upsert('roles', { roleName: "EMPLOYEE" }, defaultEmp, (result) => {
            resolve(result);
        });
    });

    let roleDetailsAff = await new Promise((resolve) => {
        global.dbController.upsert('roles', { roleName: "AFFILIATE" }, defaultAff, (result) => {
            resolve(result);
        });
    });

    if (!roleDetailsEmp.status) {
        console.log("Problem in creating AFFILIATE role:", JSON.stringify(roleDetailsEmp));
    }

    if (!roleDetailsAff.status) {
        console.log("Problem in creating emp role:", JSON.stringify(roleDetailsAff));
    }

    defaultEmpID = roleDetailsEmp.result.data;
    defaultAffID = roleDetailsAff.result.data;
}

async function insertDefaultProducts() {
    let products = [{
        productName: 'Apple',
        productType: 'FRUIT',
        productPrice: 50,
        isSystemDefined: true,
        isActive: true
    },{
        productName: 'Banana',
        productType: 'FRUIT',
        productPrice: 20,
        isSystemDefined: true,
        isActive: true
    },{
        productName: 'Perfume',
        productType: 'BEAUTY',
        productPrice: 220,
        isSystemDefined: true,
        isActive: true
    },{
        productName: 'Aloe Vera Gel',
        productType: 'BEAUTY',
        productPrice: 134,
        isSystemDefined: true,
        isActive: true
    },{
        productName: 'Biscuit',
        productType: 'BEVERAGES',
        productPrice: 22,
        isSystemDefined: true,
        isActive: true
    },{
        productName: 'Chana',
        productType: 'GROCERIES',
        productPrice: 73,
        isSystemDefined: true,
        isActive: true
    },{
        productName: 'Rice',
        productType: 'GROCERIES',
        productPrice: 88,
        isSystemDefined: true,
        isActive: true
    },{
        productName: 'Dal',
        productType: 'GROCERIES',
        productPrice: 105,
        isSystemDefined: true,
        isActive: true
    }]
    await new Promise((resolve) => {
        products.forEach(product => {
            try {
                global.dbController.upsert('products', { productName: product.productName }, product, (result) => {
                    if(!result.status)
                        console.log("Problem in creating default product:", JSON.stringify(result));
                    else
                        console.log("Product created - ", result.result.data)
                });
            } catch(err) {
                console.log("Exception in creating product:", product.productName, JSON.stringify(err.message));
            }
        })
        resolve(null)
    });
}

export default async function insertSeedData() {
    await insertDefaultRoles();
    await insertDefaultUsers();
    await insertDefaultProducts();
}