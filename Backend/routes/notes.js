import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();  

const router = express.Router();

router.post('/notes',authMiddleware,async(req,res)=>{
    const {title,content} = req.body;
    try{
        const note = await prisma.note.create({
            data:{
                title,
                content,
                userId:req.user.id
            }
        })
        res.status(201).json(note);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/notes',authMiddleware,async(req,res)=>{
    try{
        const notes = await prisma.note.findMany({
            where:{
                userId:req.user.id
            }
        })
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.put('/notes/:id',authMiddleware,async(req,res)=>{
    const {id} = req.params;
    const {title,content} = req.body;
    try{
        const updatedNote = await prisma.note.update({
            where:{
                id:parseInt(id),
                userId:req.user.id
            },
            data:{
                title,
                content
            }
        })
        res.status(200).json(updatedNote);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.delete('/notes/:id',authMiddleware,async(req,res)=>{
    const {id} = req.params;
    try{
        await prisma.note.delete({
            where:{
                id:parseInt(id),
                userId:req.user.id
            }
        })
        res.status(200).json({message:"Note deleted successfully"});    
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;
