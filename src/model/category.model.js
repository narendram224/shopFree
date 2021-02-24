const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// subcategories:[Categories],

let Categories = new Schema({
   subcategories : {
    name : String,
    model : String
     }
});

const categorySchema = new Schema({
    name:{type:String,unique:true,lowcase:true},
    created:{type:Date,default:Date.now}
});

module.exports =mongoose.model('Category',categorySchema);