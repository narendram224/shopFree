const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:'User'},
        name:{type:String,required: [true, 'Enter a username.'],},
        add1:String,
        add2:String,
        city:{type:String,required: [true, 'Enter a city']},
        state:{type:String,required: [true, 'Enter a state']},
        country:{type:String,required: [true, 'Enter a country']},
        postalCode:{type:Number,required: [true, 'Enter a postal code']},
        mobile:{type:Number,required: [true, 'Enter a mobile']}

});
module.exports = mongoose.model('address',addressSchema);