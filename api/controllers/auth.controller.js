import Admin from "../models/admin.model.js";
import bcryptjs from 'bcryptjs';

export const register = async (req, res) => {

    const {adminName , password} =  req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newAdmin = new Admin ({adminName, password : hashedPassword});
     await newAdmin.save();
     res.status(201).json('Admin create success!!');
};