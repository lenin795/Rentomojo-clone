const mongoose = require('mongoose');

const ContractSchema = mongoose.Schema({
    "userId": {type: mongoose.Schema.Types.ObjectId,required:true, index: true },
    "subscriptionId": {type: mongoose.Schema.Types.ObjectId,required: true},
    "deposit": {type: Number,required: true,min: 0},
    "startDate": {type: Date,required: true},
    "endDate": { type: Date,required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },message: "End date must be after start date"}},
    "renewalAllowed": {type: Boolean,default: true},
    "signatureURL": {type: String, default: ""},
    "tdsApplicable": {type: Boolean,default: false}
}, {
    timestamps: true
});


ContractSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("RentalContract", ContractSchema);
