import bcryptjs from 'bcryptjs';
import Supplier from "../models/supplier.model.js";
import { errorHandler } from '../utils/error.js';
import Sitems from '../models/sitem.moduel.js';

export const test = (req, res) => {

    res.json({

        message: 'Api route is working !!',
    });
};

export const updateSupplier = async (req, res, next) => {

    if(req.supplier.id !== req.params.id) 
        return next (errorHandler (401, 'You can only update your account!!'));
    try{

        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedSupplier =  await Supplier.findByIdAndUpdate (req.params.id,{
            $set:{
                supplierName: req.body.supplierName,
                email : req.body.email,
                phoneNumber: req.body.phoneNumber,
                companyName: req.body.companyName,
                password: req.body.password,

            },
        },
         {new: true}
        );
        const {password, ...rest} = updatedSupplier._doc;

        res.status(200).json(rest);
    }catch (error){

        next(error);
    }
};

export const deleteSupplier = async (req, res, next) => {
    if(req.supplier.id !== req.params.id ) 
        return next(errorHandler(401, 'You can only delete your own account!!'));
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('supplier has been deleted !!');
    } catch (error) {
        next(error);
    }
};

export const getSupplierSitems = async (req, res, next) => {

    if(req.supplier.id  === req.params.id){
        try {
            const sitems = await Sitems.find({supplierRef: req.params.id});
            res.status(200).json(sitems);
        } catch (error) {
            next(error);
        }

    }else {
        return next (errorHandler(401, 'you can only view your own supplier items!!'));
    }
};