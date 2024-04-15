import Sitems from "../models/sitem.moduel.js";
import { errorHandler } from '../utils/error.js';

 export const createSitems = async (req, res, next) => {

    try {
        const sitems = await Sitems.create(req.body);
        return res.status(201).json(sitems);
    } catch (error) {
        next(error);
    };
 };

 export const deleteSitems = async (req, res, next) => {
    const sitems = await Sitems.findById(req.params.id);

    if(!sitems){
        return next(errorHandler(404, 'supplier item not found !'));
    }

    if(req.supplier.id !== sitems.supplierRef){
        return next(errorHandler(401, 'you can delete your own supplier item'));
    }
    try {   
        await Sitems.findByIdAndDelete(req.params.id);
        res.status(200).json('Supplier itmes hs been deleted!');
    } catch (error) {
        next(error);
    }
 };
 
 export const updateSitems = async (req, res, next) => {
    const sitems = await Sitems.findById(req.params.id);
    if(!sitems){
        return next(errorHandler(404, 'Supplier item not found !'));
    }
    if(req.supplier.id !== sitems.supplierRef) {
        return next(errorHandler(401, 'you can only update your own accounrt!!'));
    }
    try {
        const updateSitems = await Sitems.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        );
        res.status(200).json(updateSitems);
    } catch (error) {
        next(error);
    }
 }; 
 export const getSitems = async (req, res, next) => {

    try {
        const sitems = await Sitems.findById(req.params.id);
        if(!sitems){
            return next(errorHandler(404, 'supplier items not found!'));
        }
        res.status(200).json(sitems);
    } catch (error) {
        next(error);
    }
 }
 