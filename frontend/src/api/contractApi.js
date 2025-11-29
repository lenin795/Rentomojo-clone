import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",   // your backend URL
});

export const createContract = (data, token) =>
    API.post("/log", data, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
    });
