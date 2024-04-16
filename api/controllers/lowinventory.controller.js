import Listing from '../models/listing.model.js';
import LowInventory from '../models/lowinventory.model.js';
import { errorHandler } from '../utils/error.js';

export const createLowInventory = async (req, res, next) => {
  try {
    const lowinventory = await LowInventory.create(req.body);
    return res.status(201).json(lowinventory);
  } catch (error) {
    next(error);
  }
};

export const deleteLowInventory = async (req, res, next) => {
  const lowinventory = await LowInventory.findById(req.params.id);

  if (!lowinventory) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== lowinventory.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await LowInventory.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateLowInventory = async (req, res, next) => {
  const lowinventory = await LowInventory.findById(req.params.id);
  if (!lowinventory) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== lowinventory.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedLowInventory = await LowInventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedLowInventory);
  } catch (error) {
    next(error);
  }
};

export const getLowInventory = async (req, res, next) => {
  try {
    const lowinventory = await LowInventory.findById(req.params.id);
    if (!lowinventory) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(lowinventory);
  } catch (error) {
    next(error);
  }
};
export const getLowInventorys = async (req, res, next) => {

};

