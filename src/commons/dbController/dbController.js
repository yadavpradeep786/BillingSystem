/**
 * The DBController Class holds all db related operations
    * @author  Pradeep Yadav
    * @version 1.0
*/

import mongoConfig from './index'
var ObjectID = require('mongodb').ObjectID

export default class DBController {
	constructor() {
		this.connection = mongoConfig.getConnection()
	}

	/**
     * The insert method will insert document in  given collection name
     * @param collectionName: mongoose collection name
     * @param payload: document to insert
     * @context: Quried user context 
     * @author  Pradeep Yadav
     * @version 1.0
    */
	insert(collectionName, payload, cb) {
		try {
			new this.connection.models[collectionName](payload).save((err, doc) => {
				if (err) {
					// console.log('err while insert record: ', JSON.stringify(err))
					var message = ''
					for(var key in err.errors) {
						message = err.errors[key].message
						// console.log('message', err.errors[key].message)
					}
					cb && cb({
						status: false,
						result: {message:message}
					})
				} else {
					cb && cb({
						status: true,
						result: {data:doc._doc._id}
					})
				}
			})
		} catch (e) {
			cb && cb({
				status: false,
				result: {message:e.message}
			})
		}
	}

	/**
     * The findwithoptions method will fetch array of records based on the input query and options
     * @param collectionName: mongoose collection name
     * @param query: mongoose query
     * @param options: mongoose options
     * @param cb: callback to return db response 
     * @author  Pradeep Yadav
     * @version 1.0
    */
	findwithOptions(collectionName, query, options, params, cb) {
		try {
			if (!collectionName) {
				cb && cb({
					status: false,
					result: {message:'CollectionName is required'}
				})
				return
			}
			this.connection.models[collectionName].find(query, options).skip(parseInt(params.offset)).limit(parseInt(params.limit)).exec((err, docs) => {
				if (err) {  
					cb && cb({
						status: false,
						result: {message:err.message}
					})
				} else {
					cb && cb({
						status: true,
						result: {data:docs}
					})
				}
			})
		} catch (e) {
			cb && cb({
				status: false,
				result: {message:e.message}
			})
		}
	}

	/**
     * The find method will fetch array of records based on the input query
     * @param collectionName: mongoose collection name
     * @param query: mongoose query
     * @param cb: callback to return db response 
     * @author  Pradeep Yadav
     * @version 1.0
    */
	find(collectionName, query, params, cb) {
		try {
			if (!collectionName) {
				cb && cb({
					status: false,
					result: {message:'CollectionName is required'}
				})
				return
			}
			if (!params.sort) {
				params['sort'] = {}
			}
            
			this.connection.models[collectionName].find(query).sort(params.sort).skip(parseInt(params.offset)).limit(parseInt(params.limit)).exec((err, docs) => {
				if (err) {         
					var message = ''     
					for(var key in err.errors) {
						message = err.errors[key].message
						// console.log('message', err.errors[key].message)
					}
					cb && cb({
						status: false,
						result: {message:message}
					})
				} else {
					cb && cb({
						status: true,
						result: {data:docs}
					})
				}
			})
		} catch (e) {
			cb && cb({
				status: false,
				result: {message:e.message}
			})
		}
	}

	/**
     * The findOne method will find record based on the input query
     * @param collectionName: mongoose collection name
     * @param query: mongoose query
     * @param cb: callback to return db response
     * @author  Pradeep Yadav
     * @version 1.0
    */
	findOne(collectionName, query, cb) {
		try {
			this.connection.collection(collectionName).findOne(query, (err, doc) => {
				if (err || doc == null) {
					cb && cb({
						status: false,
						result: {message: err}
					})
				} else {
					cb && cb({
						status: true,
						result: {data:doc}
					})
				}
			})
		} catch (e) {
			cb && cb({
				status: false,
				result: {message:e.message}
			})
		}
	}

	/**
     * The update method will update record based on the input query
     * @param collectionName: mongoose collection name
     * @param query: mongoose query
     * @param payload: data to update
     * @param cb: callback to return db response
     * @author  Pradeep Yadav
     * @version 1.0
    */
	update(collectionName, query, payload, cb) {
		var resp = {}
		var options = {new: true}
		try {
			this.connection.models[collectionName].findOneAndUpdate(query, payload, options).exec((err, doc) => {
				if(err || doc == null){    
					resp = {
						status:false,
						result: {message:err}
					}
				}else {
					resp = {
						status: true,
						result: {data:doc}
					}
				}
				cb && cb(resp)
			})
		} catch (e) {
			// console.log(e.message)
			var error = {
				status:false,
				message:e.message
			}
			cb && cb(error)
		}
	}

	/**
     * The upsert method will update record / create if record not availiable based on the input query
     * @param collectionName: mongoose collection name
     * @param query: mongoose query
     * @param payload: data to update / insert
     * @param cb: callback to return db response
     * @author  Pradeep Yadav
     * @version 1.0
    */
	upsert(collectionName, query, payload, cb) {
		try {
			this.connection.models[collectionName].findOneAndUpdate(query, payload, {
				upsert: true,
				new: true,
				setDefaultsOnInsert: true
			}).exec((err, doc) => {
				if (err || doc == null) {  
					cb && cb({
						status: false,
						result: {message:err}
					})
				} else {
					cb && cb({
						status: true,
						result: {data:doc._doc._id}
					})
				}
			})
		} catch (e) {
			// console.log(e.message)
			cb && cb({
				status: false,
				result: {message:e.message}
			})
		}
	}

	/**
     * The aggregate method will join collections and give mixed output based on the input query
     * @param collectionName: mongoose collection name
     * @param query: mongoose query
     * @param cb: callback to return db response
     * @author  Pradeep Yadav
     * @version 1.0
    */
	aggregate(collectionName, query, cb) {
		try {
			this.connection.collection(collectionName).aggregate(query, (err, doc) => {
				if (err || doc == null) {  
					cb && cb({
						status: false,
						result: {message:err}
					})
				} else {
					cb && cb({
						status: true,
						result: {data:doc}
					})
				}
			})
		} catch (e) {
			// console.log(e)
			cb && cb({
				status: false,
				result: {message:e.message}
			})
		}
	}

	/**
     * The convertIdToObjectID method will convert _id to object
     * @param id: doc id
     * @author  Pradeep Yadav
     * @version 1.0
    */
	convertIdToObjectID(id) {
		if (!id) {
			return id
		}
		return new ObjectID(id) // wrap in ObjectID
	}

	/**
     * The count method will fetch count of records based on the input query
     * @param collectionName: mongoose collection name
     * @param query: mongoose query
     * @param cb: callback to return db response 
     * @author  Pradeep Yadav
     * @version 1.0
    */
	count(collectionName, query, cb) {
		try {
			if (!collectionName) {
				cb && cb({
					status: false,
					result: { message: 'CollectionName is required' }
				})
				return
			}
			this.connection.models[collectionName].count(query).exec((err, docs) => {
				if (err) {     
					var message = ''     
					for(var key in err.errors) {
						message = err.errors[key].message
						// console.log('message', err.errors[key].message)
					}
					cb && cb({
						status: false,
						result: {message:message}
					})
				} else {
					cb && cb({
						status: true,
						result: { data: docs }
					})
				}
			})
		} catch (e) {
			cb && cb({
				status: false,
				result: { message: e.message }
			})
		}
	}


	/**
     * The search method will fetch array of records based on the input query
     * @param collectionName: mongoose collection name
     * @param query: mongoose query
     * @param cb: callback to return db response 
     * @author  Pradeep Yadav
     * @version 1.0
    */

	search(collectionName, query, cb) {
		try {
			if (!collectionName) {
				cb && cb({
					status: false,
					result: { message: 'CollectionName is required' }
				})
				return
			}
			this.connection.models[collectionName].find(query).exec((err, docs) => {
				if (err) {     
					var message = ''     
					for(var key in err.errors) {
						message = err.errors[key].message
						// console.log('message', err.errors[key].message)
					}
					cb && cb({
						status: false,
						result: {message:message}
					})
				} else {
					cb && cb({
						status: true,
						result: { data: docs }
					})
				}
			})
		} catch (e) {
			cb && cb({
				status: false,
				result: { message: e.message }
			})
		}
	}

	/**
     * The delete method will remove the record based on the input query
     * @param collectionName: mongoose collection name
     * @param query: mongoose query
     * @param cb: callback to return db response
     * @author  Pradeep Yadav
     * @version 1.0
     */
	delete(collectionName, query, options, cb) {
		try {
			this.connection.collection(collectionName).remove(query, options, (err, doc) => {
				if (err || doc == null) {  
					cb && cb({
						status: false,
						result: {message: err}
					})
				} else {
					cb && cb({
						status: true,
						result: {data:doc}
					})
				}
			})
		} catch (e) {
			cb && cb({
				status: false,
				result: {message:e.message}
			})
		}
	}

}