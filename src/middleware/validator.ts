import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { BadRequestError } from "../error/Errors";


export function validateReqQuery(schema: Schema){
    return (req: Request, res:Response, next: NextFunction)=>{
        const {error, value} = schema.validate(req.query);
        if(error){
            next(new BadRequestError(error.message));
        }
        req.query = value;
        next();
    }
}

export function validateReqParams(schema: Schema){
    return (req: Request, res:Response, next: NextFunction)=>{
        const {error, value} = schema.validate(req.params);
        if(error){
            next(new BadRequestError(error.message));
        }
        req.params = value;
        console.log(req.params);
        next();
    }
}

export function validateReqBody(schema: Schema){
    return (req: Request, res:Response, next: NextFunction)=>{
        const {error, value} = schema.validate(req.body);
        if(error){
            next(new BadRequestError(error.message));
        }
        req.body = value;
        next();
    }
}