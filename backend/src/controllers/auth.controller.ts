import { Request, Response } from "express";
import { prisma } from "../utils/dbClient";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = async (req: Request, res: Response) => {
    try {

        // zod validation for proper input
        const {name, username, email, password, interests} = req.body
        const user = await prisma.user.findFirst({
            where:{
                OR:[
                    {email},
                    {username} 
                ]
            }
        })
        if(user){
            res.status(400).json({
                success: false,
                message: "User already exist with this username or email id"
            })
            return
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data:{
                name,
                username,
                email,
                password: hashPassword,
                interests
            },
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
                interests: true
            }    
        })

        res.status(201).json({
            success:true,
            message: "User created successfully",
            user: newUser
        })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: (error as any).message
        })
    }
}


export const signIn = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const userExist = await prisma.user.findUnique({
            where:{email}
        })

        if(!userExist){
            res.status(404).json({
                success: false,
                message: "No user exist with this email"
            })
            return
        }

        if(await bcrypt.compare(password, userExist.password)){
            const payload = {
                id: userExist.id,
                username: userExist.username,
                email: userExist.email
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
                expiresIn: '30d'
            })

            res.status(200).cookie('token', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            }).json({
                success: true,
                message: "Signed In successfully",
                token
            })
        }else{
            res.status(401).json({
                success: false,
                message: "Invalid Password"
            })
            return
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as any).message
        })
    }
}