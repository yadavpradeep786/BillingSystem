import lodash from 'lodash';
import product from './product';
import statusCodes from '../../config/statuscodes';


export default class ProductHandler {
    constructor() {
    }

    /**
    * creatProduct method will accept input as productparameters
    * @param body: Product Details to create a record
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    async createProduct(body, cb) {
        try {
            global.dbController.insert('products', body, (productData) => {
                if (productData.status) {
                    var response = {
                        status: true,
                        result: { productid: productData.result.data }
                    }
                    cb && cb(response, statusCodes.SUCCESSFULLY_CREATED);
                } else {
                    cb && cb(productData, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in creatProduct handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
    * getProducts method will return all the created products
    * @param params: limit and offset for paginition
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    getProducts(params, cb) {
        try {
            global.dbController.find('products', {}, params, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in getProducts handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
    * updateProduct method will update the selected product
    * @param productid: Selected product id
    * @param body: parameters need to update
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    updateProduct(productid, body, cb) {
        try {
            global.dbController.update('products', { _id: productid }, body, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in updateProduct handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
    * getProductByID method will return the selected product details
    * @param productid: Selected product id
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    getProductByID(productid, cb) {
        try {
            global.dbController.findOne('products', { _id: global.dbController.convertIdToObjectID(productid) }, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in getProductByID handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
    * getProductByName method will return the selected product details
    * @param productName: Selected product name
    * @param cb : to return response
    * @author  Pradeep
    * @version 1.0
    */
    getProductByName(productName, cb) {
        try {
            global.dbController.findOne('products', { 'productName': productName }, (response) => {
                if (response.status) {
                    cb && cb(response, statusCodes.OK);
                } else {
                    cb && cb(response, statusCodes.FORBIDDEN_REQUEST);
                }
            });
        } catch (e) {
            console.log("error catched in getProductByName handler ", e.message);
            var error = {
                status: false,
                result: { message: e.message }
            };
            cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}