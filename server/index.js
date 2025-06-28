import express from 'express'
import cors from 'cors'
import { Queue } from 'bullmq'
import { QdrantVectorStore } from '@langchain/qdrant'
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { TaskType, GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"
import { qdrant, valkey } from "./constants.js"

dotenv.config()

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

const GENAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = GENAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const queue = new Queue("memory-process-queue", {
    connection: {
        host: valkey.host,
        port: valkey.port
    }
})

app.get('/', (req, res) => {
    return res.json({ status: 'ok' })
})

app.post('/memory/add', async (req, res) => {

    console.log(req.body)
    await queue.add(
        'memory',
        JSON.stringify({
            memory: req.body?.memory
        }))
    return res.json({ message: 'Memory Added' })
})

app.get('/chat', async (req, res) => {

    if (!req || !req.query || !req.query?.memory) {
        res.json({ message: 'please send query in param as /?q=<Your Query>' })
    }

    const userQuery = req.query.memory

    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004", // 768 dimensions
        apiKey: process.env.GOOGLE_API_KEY,
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "memory",
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url: qdrant,
            collectionName: "memory"
        }
    )

    const retriever = vectorStore.asRetriever({
        k: 2
    })

    const result = await retriever.invoke(userQuery);

    let context = ""
    if (result) {
        result.forEach(page => {
            context = context + "\n" + page.pageContent
        });
    }

    const SYSTEM_PROMPT = `
    You are a helpful AI assistance who answers the user query based on the available context from user pre-saved memories. And don't give answer less than 3 lines. Do not add verbs like Based on context provided...
    \n\n
    Context: ${context}
    \n\n
    UserQuery: ${userQuery}
    `

    const modelResponse = await model.generateContent([SYSTEM_PROMPT]);

    return res.json({ result: modelResponse.response.candidates[0].content.parts[0].text, docs: result })
})

app.listen(PORT, '0.0.0.0', () => console.info(`API server running on http://0.0.0.0:${PORT}`))
// app.listen(PORT, () => console.info(`API server running on http://0.0.0.0:${PORT}`))