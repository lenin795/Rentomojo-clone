const mongoose =require('mongoose')

const bcrypt=require('bcryptjs')

const userSchema=mongoose.Schema({
    "username":{type:String,require:true,unique:true},
    "name":{type:String},
    "emailid":{type:String},
    "password":{type:String,require:true}
})
userSchema.pre('save', async function(){
    if(!this.isModified('password'))return 
    const salted = await bcrypt.genSalt(12)
    this.password = await bcrypt.hashSync(this.password,salted)
})
const user=mongoose.model('user',userSchema)

module.exports=user