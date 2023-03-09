import { NextFunction, Request, Response } from "express";

export type Endpoint = {
    url: string;
    method: string;
    handler(req: Request, res: Response, next: NextFunction): Promise<any>;
}