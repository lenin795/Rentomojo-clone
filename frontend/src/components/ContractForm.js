import { useState } from "react";
import { createContract } from "../api/contractApi";

function ContractForm() {
    const [form, setForm] = useState({
        userId: "",
        subscriptionId: "",
        deposit: "",
        startDate: "",
        endDate: ""
    });

    const token = "";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createContract(form, token);
            alert("Contract Created Successfully!");
            console.log(res.data);
        } catch (err) {
            alert("Error creating contract");
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
            <h2>Create Rental Contract</h2>

            <input name="userId" placeholder="User ID" onChange={handleChange} required />
            <input name="subscriptionId" placeholder="Subscription ID" onChange={handleChange} required />
            <input name="deposit" type="number" placeholder="Deposit" onChange={handleChange} required />

            <label>Start Date</label>
            <input name="startDate" type="date" onChange={handleChange} required />

            <label>End Date</label>
            <input name="endDate" type="date" onChange={handleChange} required />

            <button type="submit">Create Contract</button>
        </form>
    );
}

export default ContractForm;
