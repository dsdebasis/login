const mongoose = require('mongoose');
const {Schema} = mongoose;
const JWT = require('jsonwebtoken')
const userSchema = new Schema({
name:{
  type:String,
  required:[true,'user name is required'],
  trim:true
},
email:{
  type:String,
  required:[true,'email id is required'],
  lowercase:true,
  unique:[true,'account alrady exists']
  
},
password:{
  type:String,
  select:false
},
forgotPasswordToken:{
  type:String
},
forgotPasswordExpiryDate:{
  type:Date
},
},{timestamps:true
 
});

userSchema.methods={
  jwtToken(){
    return JWT.sign(
      {id:this._id,email:this.email},
      process.env.SECRET,
      {expiresIn:'24h'}
    )
  }
}

const userModel = mongoose.model('user',userSchema);
module.exports=  userModel;