const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:"User",required: [true, 'Owner id is required']},
    title:{type:String,required: [true, 'title of review is required']},
    description:{type:String,required: [true, 'description id is required']},
    rating:{type:Number,default:0},
    created:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Review',ReviewSchema);