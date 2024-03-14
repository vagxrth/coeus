import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import { OpenAI } from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});




const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        message: 'Hello from Coeus!',
    })
});

app.post("/", async (req, res) => {
    try {
        const promt = req.body.promt;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            prompt: `${promt}`,
            temperature: 0,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
});

app.listen(3000, () => console.log('Server is running on port http://localhost:3000'));