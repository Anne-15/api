import dbconnection from "..";
import { Retailer } from "../entity/Retailer";

export const signUpRetail = (req, res) => {
//get data from request body
    const {
        full_name,
        email,
        password,
        phone_number,
        business_name,
        business_description
    }: {
        full_name: string;
        email: string;
        password: string;
        phone_number: number;
        business_name: string;
        business_description: string;
    } = req.body;
    try {
        if(!(full_name && email && password && phone_number && business_name && business_description)){
            throw {Error: "Incomplete details"};
        }
        //strong password checking
        //encrypt password
        //adding a user
        dbconnection
        .then(async(connection) => {
            let retail = new Retailer();
            retail.full_name = full_name;
            retail.email = email;
            retail.password = password;
            retail.phone_number = phone_number;
            retail.business_name = business_name;
            retail.business_description = business_description

            await connection.manager.save(retail).then((retail) => {
                res.status(200).send({"User added ": retail.full_name})
            });
        })
        .catch((error) => {
        //duplicate email check
            if(error.code == "23505"){
                res.status(400).send({"Error": "Account with that email already exists"});
            }else{
                res.status(408).send({"Error": "error"});
                console.log(error);
            }
    });
    }catch (error) {
        res.status(400).send(error);
}
}
