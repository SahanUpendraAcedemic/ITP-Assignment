import Staff from "../models/staff.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utills/error.js";
import Jwt from "jsonwebtoken";

export const register = async(req,res,next)=>{
    const {name,id,type,number,email,address,joindate,shift,license,password} = req.body;

    // Create an object to hold only the required fields
    const staffData = {
        name,
        id,
        type,
        number,
        email,
        address,
        joindate,
        
    };

    // If username and password are provided, include them in the staffData object
    if(license){staffData.license = license}

    // Handle null values for password
    if (password !== null && password !== undefined) {
        staffData.password = bcryptjs.hashSync(password, 10);
    }

    try {
        // Create a new staff instance with the staffData object
        const newStaff = new Staff(staffData);
        await newStaff.save();
        res.status(201).json({message:"Staff member created successfully"});
    } catch (error) {
        next(error);
    }
};


export const login = async(req,res,next)=>{
    const {email,password} = req.body;

    try {
        const validUser = await Staff.findOne({email});
        if (!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong username or password'));
        const token = Jwt.sign({id : validUser._id}, process.env.Jwt_SECRET);
        const {password: hashedPassword, ...rest}= validUser._doc;
        const expiryDate = new Date(Date.now()+3600000);
        res.cookie('access_token', token, {httpOnly:true,expires:expiryDate}).status(200).json(rest);
    } catch (error) {
       next(error) ;
    }
};
