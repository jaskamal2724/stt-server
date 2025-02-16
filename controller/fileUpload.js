import fs from 'fs';
import FormData from "form-data"
import axios from "axios"
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function AudiofielUpload(req, res) {
    const prisma = new PrismaClient();

    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const formData = new FormData();
        formData.append("audio", fs.createReadStream(req.file.path));

        const response = await axios.post(
            "https://api.deepinfra.com/v1/inference/openai/whisper-large",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${process.env.DEEPINFRA_API_KEY}`,
                    ...formData.getHeaders(),
                },
            }
        );

        if (response) {
            async function createUser() {
                const { data, error } = await supabase.from("User").insert({ transcription: response.data.text }).select("transcription")
                console.log(data?.[0].transcription);
                res.status(200).json(data?.[0].transcription);
            }

            createUser();
        }
        else {
            return res.status(400).json({ msg: "Api not responded" })
        }

        fs.unlinkSync(req.file.path);
        return
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }


   
}










