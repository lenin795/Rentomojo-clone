const user =require('./schemma')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcryptjs')
require('dotenv').config()

const register =async(newuser)=>{
    const exist=await user.findOne({username:newuser.username})
    if(exist) 
        return null
    const create=new user(newuser)
    await create.save()
    return create

}
const login=async(obj)=>{
    const {username,password}=obj
    const exists =await user.findOne({username})
    if(!exists||!(await bcrypt.compare(password,exists.password)))
        return null
    const token=jwt.sign({"logged":username},process.env.SECRET_KEY,{expiresIn:'1hr'})
    return token
}

module.exports = {register,login}