import Admin from "../models/admin.model.js";
import bcryptjs from 'bcryptjs';

export const register = async (req, res, next) => {

    const {adminName , password} =  req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newAdmin = new Admin ({adminName, password : hashedPassword});
    try {
         await newAdmin.save();
         res.status(201).json('Admin create success!!');
        
     } catch (error) {
        next(error);
     }
};