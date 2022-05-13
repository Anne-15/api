import { Client } from "../entity/Client";

const Delete = (res, req) => {
    const { id } = req.params
    
    const foundUser = Client.find((user) => user.id == id);
    console.log(foundUser)
}

export default Delete;