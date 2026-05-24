import { prisma } from "../../lib/prisma"
import bcrypt from "bcryptjs"
import {generateToken} from "../utils/generateToken"

const register = async (req,res) => {
    const { name, email, university, course, semester, password } = req.body;
    // res.json({message: "User registered successfully", user: { name, email, university, course, semester }});

    const user = await prisma.user.findUnique({
        where : {email}
    })

    if(user){
        return res.status(400).json({message: "user already exist"})
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            university,
            course,
            semester,
            password: hashedPassword
        }
    })
       const token = await generateToken(user.id, res)
    res.status(201).json({message: "User registered successfully", user: newUser, token});
}   

const login = async (req,res) => {
    const {email, password } = req.body;

    const user = await prisma.user.findUnique({
        where : {email}
    })

    if(!user){
        return res.status(400).json({message: "Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"})
    }
    
    const token = await generateToken(user.id, res)
    res.json({message: "Login successful", user, token});

}

const logout = async (req,res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
    })
    res.status(200).json({message: "Logout successful"});
}
export { register, login, logout };