const RentalContract=require('./contractSchema')

const getAllRecords = async()=>{
    return await RentalContract.find()
}
const createRecord = async(newRecord) => {
    const contract = new RentalContract(newRecord)
    await contract.save()
    return contract;
}
const updateRecord = async(usereg, updatedRecord) => {
    try{
        const updated = await RentalContract.findOneAndUpdate({regno: usereg}, updatedRecord, {new:true});
        return updated;
    }catch(err){
        console.error(err);
        return null;
    }
}
const deleteRecord = async(usereg) => {
    try{
        const deleted = await RentalContract.findOneAndDelete({regno: usereg});
        return deleted;
    }catch(err){
        console.error(err)
        return null;
    }
}
module.exports = { getAllRecords, createRecord, updateRecord, deleteRecord };