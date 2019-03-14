import mongoose from 'mongoose'
import validate from 'mongoose-validator'
import timestamps from 'mongoose-timestamp'
const Schema = mongoose.Schema
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const productSchema = new Schema({
	productName: {
		type: String,
		required: true,
		unique: 'Product Name Already Exists',
		validate: [
			validate({
				validator: 'isLength',
				arguments: [3, 10],
				message: 'First Name should be between {ARGS[0]} and {ARGS[1]} characters'
			}),
		]
	},

	productType:{
		type: String,
		required: true  
	},

	productPrice:{
		type: Number,
		required: true  
	},
    
	isSystemDefined:{
		type: Boolean,
		default: false
	},

	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: false
	},

	isActive: {
		type: Boolean,
		default: false
	}
})

productSchema.plugin(beautifyUnique)
productSchema.plugin(timestamps)
export default mongoose.model('products', productSchema, 'products')