import express from 'express';
import z from 'zod';

export const app = express();

const sumInput = z.object({
    a: z.number(),
    b: z.number()
})

app.use(express.json());

app.post("/sum",(req,res)=>{
    const parsedInput = sumInput.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(400).json({
            message:"Incorrect inputs"
        })
    }
    const a = parsedInput.data.a;
    const b = parsedInput.data.b;
    const answer = a + b;

    res.json({
        answer
    })
})