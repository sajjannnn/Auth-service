import { prisma } from "../../lib/prisma"
import bcrypt from "bcryptjs"

const register = async (req,res) => {
    const { name, email, university, course, semester, password } = req.body;
    res.json({message: "User registered successfully", user: { name, email, university, course, semester }});

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

    res.status(201).json({message: "User registered successfully", user: newUser});
}    
export { register };