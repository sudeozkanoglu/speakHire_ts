import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.json({success: false, message: "Not Authorized Login Again"});
    }

    const token = authHeader.split(" ")[1];
    try {
        const token_decode = jwt.verify(token!, process.env.JWT_SECRET!) as { id: string };
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error"})
    }
}

export default authMiddleware;