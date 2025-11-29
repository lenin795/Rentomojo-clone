const router =require('express').Router();
const rest=require('./users')

router.post('/signup',async(req,res)=>{
    const newuser=req.body;
    const created =await rest.register(newuser);
    if(!created) return rest.status(400).send('user already exists')
        res.status(201).send(created);
})
router.post('/signin',async(req,res)=>{
    const returned = await rest.login(req.body)
    if(!returned)
        res.status(401).json({error:`${req.body.username} unauthorized`})
    res.status(200).json({message:returned})
})

module.exports=router;