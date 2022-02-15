const { Client } = require ("../entity/Client");
import jwt from "jsonwebtoken";
import dbconnection from "../index";
import express from "express";


const getClients = async (req, res) => {

    //get users email
    const decodeToken = jwt.decode(req.header("x-access-token"),{
        complete: true,
    });

    dbconnection.then(async(connection) => {
        let userRepository = connection.getRepository(Client);\

        await userRepository
        .find({email: decodeToken.payload.email})
        .then((client) => {
            const {
                id, 
                full_name, 
                email 
            }: {id: number; full_name: string; email: string;} = client[0];
            
            const logInUser = {id, full_name, email};
            res.send(logInUser);
    });
});
};
export default getClients;

