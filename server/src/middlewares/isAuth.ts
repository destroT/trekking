import { Request, Response, NextFunction} from 'express';

const isAuth = (req:Request, res:Response, next:NextFunction) => {
    if(!req.session!.userId) {
        console.log('Invalid access');
        res.status(401);
        return res.json({ msg: "Access denied!" });
    }
    return next();
}

export default isAuth;