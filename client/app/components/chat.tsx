'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as React from 'react'

interface IDoc {
    pageContent?: string
    metadata?: {
        source?: string
        pdf?: {
            version?: string
            info?: {
                PDFFormatVersion?: string
                IsAcroFormPresent?: boolean
                IsXFAPresent?: boolean
                Creator?: string
                Producer?: string
                CreationDate?: string
            }
            metadata?: null | string
            totalPages?: number
        }
        loc?: {
            pageNumber?: number
        }
    }
    id?: string
}

interface IChatMessage {
    role: 'assistance' | 'user'
    content?: string
    documents?: IDoc[]
}

const ChatComponent: React.FC = () => {

    const [message, setMessage] = React.useState<string>('')
    const [messages, setMessages] = React.useState<IChatMessage[]>([])

    const handleSendChatMessage = async () => {
        const msg = message
        setMessage("")
        setMessages(prev => [...prev, {
            role: "user",
            content: msg
        }])

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat?memory=${msg}`)
        const data = await res.json()

        setMessages(prev => [...prev, {
            role: "assistance",
            content: data.result,
            documents: data.docs
        }]
        )


    }

    return <div className='p-4 flex justify-center'>

        <div>
            <div className='pb-32'>
                {messages.map((msg, index) => (
                    <div key={index} className="flex w-full my-2">
                        {msg.role === 'assistance' ? (
                            <div className="ml-auto px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex">
                                <h5 className="text-gray-900 text-sm font-normal leading-snug">
                                    {msg.content}
                                </h5>
                            </div>
                        ) : (
                            <div className="mr-auto px-3 py-2 bg-indigo-600 rounded justify-end">
                                <h5 className="text-white text-sm font-normal leading-snug">
                                    {msg.content}
                                </h5>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        <div className='fixed bottom-6 min-w-100 flex gap-3'>
            <Input value={message} onChange={e => setMessage(e.target.value)} placeholder='Type your message here' />
            <Button onClick={handleSendChatMessage} disabled={!message.trim()}>Send</Button>
        </div>
    </div>
}

export default ChatComponent