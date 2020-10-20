import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const validateId = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params || req.query;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "Invalid Id "});

    return next();
}

export default validateId;