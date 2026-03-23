import express from 'express';
import z from 'zod';
import {prismaClient} from './db'
export const app = express();

app.use(express.json());
const sumInput = z.object({
    a: z.number(),
    b: z.number()
})

app.post("/sum",async(req,res)=>{
    const parsedInput = sumInput.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(400).json({
            message:"Incorrect inputs"
        })
    }
    const a = parsedInput.data.a;
    const b = parsedInput.data.b;
    const answer = a + b;

    const sum = await prismaClient.sum.create({
        data:{
            a: parsedInput.data.a,
            b: parsedInput.data.b,
            result: answer
        }
    })
    
    res.json({
        answer,
        id: sum.id
    })
})
