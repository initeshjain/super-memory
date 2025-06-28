---

# 🧠 Super Memory — Store Memories, Talk to Them Later

**Super Memory** is an AI-powered application that lets users save memories as simple text entries and later retrieve or discuss them via a conversational chatbot. It blends the power of **vector search** with **generative AI** to help you reflect, recall, and reconnect with your thoughts.

---

## ✨ Features

* **Memory Textbox Input:** Users can add any memory via a clean and minimal input interface.
* **Conversational Recall:** Interact with your past memories through a chatbot experience.
* **RAG Architecture:** Combines retrieval of stored vectorized memories with generative responses to offer meaningful and personalized conversations.
* **High-Quality Embeddings:** Uses Google’s `text-embedding-004` model for accurate semantic representation.
* **Vector Store Integration:** Powered by **Qdrant** for fast and efficient similarity search.
* **Modern UI/UX:** Built with **Next.js** and **Tailwind CSS** for a smooth, responsive user interface.
* **Scalable Backend:** Modular backend architecture using **Node.js**, **LangChain**, and background **BullMQ workers**.
* **Secure Authentication:** Seamlessly integrated with **Clerk** for user management.
* **Fully Containerized:** Deploy effortlessly using **Docker Compose**.

---

## 🛠 Tech Stack

* **Frontend:** Next.js, Tailwind CSS, React, TypeScript
* **Backend:** Node.js, Express, LangChain, BullMQ
* **Embeddings:** `text-embedding-004` (Google Generative AI)
* **Chat Model:** `gemini-1.5-flash`
* **Vector Store:** Qdrant
* **Authentication:** Clerk
* **Containerization:** Docker, Docker Compose

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/initeshjain/super-memory.git
cd super-memory
```

---

### 2. Configure Environment Variables

#### Client (`client/.env`)

```bash
cd client
cp .env.example .env
```

Update the file with your **Clerk** keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_live_YOUR_SECRET_KEY
```

---

#### Server (`server/.env`)

```bash
cd ../server
cp .env.example .env
```

Update the file with your **Google API Key** for Gemini:

```env
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
```

You can also add other environment values such as:

```env
QDRANT_URL=http://qdrant:6333
VALKEY_HOST=valkey
VALKEY_PORT=6379
```

---

### 3. Start the Application

Use Docker Compose to run the full stack:

```bash
docker compose up --build
```

This will:

* Launch the client (`http://localhost:3000`)
* Start the backend API (`http://localhost:8000`)
* Spin up background workers for memory processing
* Start Qdrant and Redis (via Valkey)

---

### 4. Usage

1. Go to `http://localhost:3000`
2. Log in or sign up using Clerk
3. Type a memory in the input box and click “Memory”
4. Wait for it to be processed in the background
5. Open the chat to ask questions like:

   * "What did I write about my trip?"
   * "What new events or birthdays are coming?"

---

## 🤝 Contributions Welcome

Have ideas or improvements? Feel free to:

* Submit a PR
* Open issues
* Suggest features

Let's build Super Memory together! 🧠

---
