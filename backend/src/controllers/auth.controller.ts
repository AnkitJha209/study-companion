import { Request, Response } from "express";
import { prisma } from "../utils/dbClient";

export const signIn = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: (error as any).message
        })
    }
}