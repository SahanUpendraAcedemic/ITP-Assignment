import Supplier from "../models/supplier.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register =  async(req, res, next) => {

    const { supplierName, email, phoneNumber, companyName, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newSupplier = new Supplier({ supplierName, email, phoneNumber, companyName, password: hashedPassword });
    try{
        await  newSupplier.save();
        res.status(201).json('Supplier create Successfully!!');
    }
    catch (error){
        next(error);
    }
  
};
export const login = async (req, res, next) => {

    const{supplierName, password} = req.body;
    try{
        const validSupplier = await Supplier.findOne({ supplierName });
        if (!validSupplier) return next(errorHandler(404, 'supplier not found!'));
        const validPassword = bcryptjs.compareSync(password, validSupplier.password);
        if(!validPassword)  return next(errorHandler(404, 'wrong credentials'));
        const token = jwt.sign({id: validSupplier._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validSupplier._doc;
        res
        .cookie('access_token', token, {httpOnly : true})
        .status(200)
        .json(rest);
    }catch (error){
        next(error);
    }
};
export const logOut = async (req, res, next) => {

    try {
       res.clearCookie('access_token');
       res.status(200).json('Supplier has been logge out !!'); 
    } catch (error) {
        next(error);
    }
};
