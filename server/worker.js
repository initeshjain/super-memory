import { Worker } from 'bullmq'
import { QdrantVectorStore } from "@langchain/qdrant"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { TaskType } from "@google/generative-ai"
import dotenv from "dotenv"
import { qdrant, valkey } from "./constants.js";
import { Document } from '@langchain/core/documents'

dotenv.config()

const worker = new Worker(
    'memory-process-queue',
    async (job) => {
        try {
            console.info(`Job: ${job.data}`)
            const data = JSON.parse(job.data)

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

            await vectorStore.addDocuments([
                new Document({
                    pageContent: data.memory,
                    metadata: {
                        dateAdded: Date.now()
                    }
                })
            ])
            console.log('All docs are added to vector store')
        } catch (e) {
            console.error("error: ", e)
        }
    },
    {
        concurrency: 100, connection: {
            host: valkey.host,
            port: valkey.port
        }
    }
)