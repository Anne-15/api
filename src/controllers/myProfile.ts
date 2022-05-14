import dbconnection from "..";
import { Client } from "../entity/Client";

const myProfile = async (res, req) => {
  dbconnection.then(async (connection) => {
    let userRepository = await connection
      .getRepository(Client)
      .findOne({ id: req.params.id });

    return res.send(userRepository);
  });
};

export default myProfile;
