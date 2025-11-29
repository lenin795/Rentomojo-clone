const app=require('express')()
const auth = require('./usercontrol')
const parser = require('body-parser')
const mongo =require('./connection')
const db=require('./contractcontrol')
app.use(parser.json())
const PORT=5000

const cors = require('cors');
app.use(cors());


app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
})

mongo()
app.use('/auth',auth)
app.use('/db',db)