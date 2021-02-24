const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    owner: {type:Schema.Types.ObjectId,ref:"User",required: [true, 'Owner id is required'],},
    totalPrice:{type:Number,default:0},
    Product:[
       { product:{type:Schema.Types.ObjectId,ref:"Product",required: [true, 'product id is required'],},
        quantity:{type:Number,default:0}
       }
    ]
})