const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
        name: {type:"String",lowercase:true},
        category:{type:Schema.Types.ObjectId,ref:"Category"},
        owner: {type:Schema.Types.ObjectId,ref:"User"},
        reviews:[{type:Schema.Types.ObjectId,ref:"Review"}],
        image:String,
        description:{type:String,lowercase:true},
        price:Number,
        created:{type:Date,default:Date.now}
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});
// the above conversion for the virtual func
// method that not save the data into db but calc somthing and showing into schema
ProductSchema.virtual('avarageRating').get(function (){
    let rating =0;
    if(this.reviews.length>0) rating =0;
    else{
        this.reviews.map((review)=>{
            rating += review.rating;
        })
        rating=rating/this.reviews.length;
    }
    return rating;
});
// add the plugin into Schema
ProductSchema.plugin(deepPopulate);

// export the module
let Model = mongoose.model('Product',ProductSchema);
module.exports  = Model;