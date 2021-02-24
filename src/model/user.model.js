const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
   username: {
       type: String,
       required: [true, 'Enter a username.'],
       unique: [true, 'That username is taken.'],
       lowercase: true,
       validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
},
    email: {
          type: String,
          require: [true, 'Enter an email address.'],
          unique: [true, 'That email address is taken.'],
          lowercase: true,
          validate: [validator.isEmail, 'Enter a valid email address.']
},
     password: {
        type: String,
        required: [true, 'Enter a password.'],
        minLength: [6, 'Password should be at least six characters']
},
    // picture: String,
    isSeller:{type:Boolean,default:false},
    created:{type:Date,default:Date.now}

//     passwordConfirm: {
//         type: String,
//         required: [true, 'Retype your password.'],
//         validate: {
//             validator: function(el) {
//             return el === this.password;
//         }, message: 'Passwords don\'t match.'
//     }
//   }
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
//schema middleware to apply before saving
// UserSchema.pre('save', async function(next) {
//     this.password = await bcrypt.hash(this.password, 12);
//       next();
// });
UserSchema.pre('save',function(next){
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password,10,function (err,hash) {
        if (err)return next(err);
        user.password = hash;
        next();
    });
});
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

UserSchema.methods.gravity =(size)=>{
    if (!this.size) size =200;
}

UserSchema.methods.gravatar = (size)=>{
    if(!this.size) size = 200;
    if(!this.email)
    {
        return 'https://gravatar.com/avatar/?s' + size + '&d = retro';
       }
    else{
       var md5  = crypto.createHash('md5').update(this.email).digest('hex');
       return 'https://gravatar.com/avatar/'+md5+ '?s' +size+ '&d=retro'; 
    } 
   }
const User = mongoose.model('User', UserSchema);
module.exports = User;