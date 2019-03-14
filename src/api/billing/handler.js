import statusCodes from '../../config/statuscodes'
// import products from '../products/product'
import moment from 'moment'

export default class BillingHandler {

	/**
	 * fetchBill method will accept input as billing parameters
	 * @param body: Billing Details to create a record
	 * @param cb : to return response
	 * @author  Pradeep
	 * @version 1.0
	*/
	async fetchBill(body, context, cb) {
		try {
			let groceriesTotal = null,
				nonGroceriesTotal = null,
				discountByUser = await this.getDisCountByUser(context.userData)

			body.forEach((item, index) =>  {
				global.dbController.findOne('products',	{ _id: global.dbController.convertIdToObjectID(item.productid) }, (productData) => {
					if (productData.status) {
						if (productData.result.data.productType == 'GROCERIES') {
							groceriesTotal += productData.result.data.productPrice * item.quantity
						} else {
							nonGroceriesTotal += productData.result.data.productPrice * item.quantity
						}
						if(body.length == index+1) {
							let nonGroceriesDiscount = null, 
								total = null, 
								discountForAll = null
							
							nonGroceriesDiscount = nonGroceriesTotal * discountByUser / 100
							total = groceriesTotal + nonGroceriesTotal - nonGroceriesDiscount
							discountForAll = Math.floor(total / 100) * 5
							total = total - discountForAll
					
							cb && cb({
								status: true,
								result: {
									'Groceries Total': groceriesTotal,
									'Non Groceries Total without discount': nonGroceriesTotal,
									'Discount % By User': discountByUser,
									'Non Groceries Discount': nonGroceriesDiscount,
									'Non Groceries Total after discount': nonGroceriesTotal-nonGroceriesDiscount,
									'Discount on total @5%': discountForAll,
									'Amount to be paid': total
								}
							}, statusCodes.OK)
						}
					} else {
						let error = {
							status: false,
							result: { message: `Unable to fetch product with id- ${item.productid }. Please cross-check the id.` }
						}
						cb && cb(error, statusCodes.BAD_REQUEST)
						return
					}
				})
			})
		} catch (e) {
			// console.log('error catched in fetchBill handler ', e.message)
			let error = {
				status: false,
				result: { message: e.message }
			}
			cb && cb(error, statusCodes.INTERNAL_SERVER_ERROR)
		}
	}
	
	getDisCountByUser(userData) {
		if (userData.rolesDetails[0].roleName == 'EMPLOYEE') {
			return 30
		} else if (userData.rolesDetails[0].roleName == 'AFFILIATE') {
			return 10
		} else if (moment().subtract(2, 'years').isAfter(userData.createdAt)) {
			return 5
		} else {
			return 0
		}
	}
}