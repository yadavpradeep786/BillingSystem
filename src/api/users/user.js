import mongoose from 'mongoose'
import validate from 'mongoose-validator'
import timestamps from 'mongoose-timestamp'
import utils from '../../commons/utils/index'
const Schema = mongoose.Schema
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const userSchema = new Schema({

	email: {
		type: String,
		required: true,
		unique: 'Email Already Exist',
		validate: [
			validate({
				validator: 'isEmail',
				passIfEmpty: true,
				message: 'Please Enter Valid Email',
			}),
		]
	},

	password: {
		type: String,
		required: true,
		validate: [
			validate({
				validator: 'matches',
				arguments: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
				message: 'Password must be minimum eight characters, at least one upper case letter, at least one lower case letter, at least one digit, at least one special character',
			}),
		]
	},

	firstName: {
		type: String,
		required: false,
		validate: [
			validate({
				validator: 'isLength',
				arguments: [3, 50],
				message: 'First Name should be between {ARGS[0]} and {ARGS[1]} characters'
			}),
		]
	},

	lastName: {
		type: String,
		required: false,
		validate: [
			validate({
				validator: 'isLength',
				arguments: [3, 50],
				message: 'First Name should be between {ARGS[0]} and {ARGS[1]} characters'
			}),
		],
	},

	userrole: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'roles',
		required: true
	},

	isActive: {
		type: Boolean,
		default: false
	},

	isSystemDefined: {
		type: Boolean,
		default: false
	}
})

userSchema.plugin(beautifyUnique)
userSchema.plugin(timestamps)

userSchema.pre('save', function (next) {
	var user = this
	if (!user.isModified('password')) {
		return next()
	}
	var hash = utils.createPasswordHash(user.password)
	user.password = hash
	next()
})

export default mongoose.model('users', userSchema, 'users')