import statusCodes from '../../config/statuscodes';
import products from '../products/product';


export default class BillingHandler {
    constructor() {
    }

    /**
    * fetchBill method will accept input as billing parameters
    * @param body: Billing Details to create a record
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    async fetchBill(body, context, cb) {
        try {
            var groceriesTotal = null;
            var nonGroceriesTotal = null;
            var nonGroceriesDiscount = null;
            var total = null;
            var discountForAll = null;
            var response = {};
    
            var discountByUser = await this.getDisCountByUser(context.userData);
    
            for (let i = 0; i < body.length; i++) {
                let product = global.dbController.findOne('roles', { _id: global.dbController.convertIdToObjectID(body[i].productid) }, (productData) => {
                    if (productData.status) {
                        if (productData.data.productType == 'GROCERIES') {
                            groceriesTotal += productData.data.productPrice * body[i].quantity;
                        } else {
                            nonGroceriesTotal += productData.data.productPrice * body[i].quantity;
                        }
                    }
                });
            }
    
            nonGroceriesDiscount = nonGroceriesTotal * discountByUser / 100;
            total = groceriesTotal + nonGroceriesTotal - nonGroceriesDiscount;
            discountForAll = Math.floor(total / 100) * 5;
            total = total - discountForAll;
        
            var response = {
                status: true,
                result: {
                    nonGroceriesTotal: nonGroceriesTotal,
                    groceriesTotal: groceriesTotal,
                    discountByUser: discountByUser,
                    nonGroceriesDiscount: nonGroceriesDiscount,
                    discountForAll: discountForAll,
                    total: total,
                }
            }
            cb && cb(response, statusCodes.OK);
        } catch (e) {
            console.log("error catched in fetchBill handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    
    getDisCountByUser(userData) {
        console.log(userData.createdAt, " - ", new Date().now().setFullYear(-2))
        if (userData) {
            if (roleData.roleName == 'EMPLOYEE') {
                return 30;
            } else if (roleData.roleName == 'AFFILIATE') {
                return 10;
            } else if (userData.createdAt < new Date().now().setFullYear(-2)) {
                return 5;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

}