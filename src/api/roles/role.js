import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import timestamps from 'mongoose-timestamp';
import utils from '../../commons/utils/index';
const Schema = mongoose.Schema;
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const roleSchema = new Schema({
    roleName: {
        type: String,
        required: true,
        unique: 'Role Name Already Exists',
        validate: [
            validate({
                validator: 'isLength',
                arguments: [3, 10],
                message: 'First Name should be between {ARGS[0]} and {ARGS[1]} characters'
            }),
        ]
    },

    displayName:{
        type: String,
        required: false  
    },
    
    isSystemDefined:{
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: false
    }
});

roleSchema.plugin(beautifyUnique);
roleSchema.plugin(timestamps);
export default mongoose.model('roles', roleSchema, 'roles');