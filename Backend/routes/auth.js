import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

const router = express.Router();

//Signup route

router.post('/signup', async (req,res)=>{
    const {email, password} = req.body

    try {
        const ExistingUser = await prisma.user.findUnique({where: { email }})

        if(ExistingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: 'User created successfully', user : {id: user.id, email: user.email} });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//Login route

router.post('/login', async (req,res)=>{
    const {email, password} = req.body

    try{
        const user  = await prisma.user.findUnique({where: { email }});
        if(!user) {
            return res.status(400).json({ message: 'User doesnot exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(200).json({ message: 'Login successful', token, user: { id: user.id, email: user.email } });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;