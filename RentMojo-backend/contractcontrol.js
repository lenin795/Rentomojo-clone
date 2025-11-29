const atlasrouter = require('express').Router();
const dao=require('./contract')
const { tokenVerification, roleVerification } = require('./middleware');

atlasrouter.get('/',tokenVerification ,roleVerification,async(res,req)=>{
    const records = await dao.getAllRecords();
    res.json(records);
})

atlasrouter.post('/' , async(req, res) => {
    const newRecord = req.body;
    const createdRecord = await dao.createRecord(newRecord);
    res.json(createdRecord);
});

atlasrouter.patch('/:id',tokenVerification ,roleVerification, async(req, res) => {
    const usereg = req.params.usereg;
    const updatedRecord = req.body;
    const result = await dao.updateRecord(usereg, updatedRecord);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Record not found' });
    }
});

atlasrouter.delete('/:id',tokenVerification , roleVerification,async(req, res) => {
    const usereg = req.params.usereg;
    const result = await dao.deleteRecord(usereg);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

module.exports = atlasrouter;