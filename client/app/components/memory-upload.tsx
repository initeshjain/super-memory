'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FileUploadComponent: React.FC = () => {

    const [memoryText, setMemoryText] = React.useState("");

    const onButtonClick = async () => {
        if (memoryText.trim() === "") return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/memory/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ memory: memoryText }),
            });

            const data = await response.json();
            setMemoryText("");
            alert(data.message);
        } catch (error) {
            alert('Failed to add memory');
            console.error(error);
        }
    }

    return (
        <div className="shadow-2xl flex flex-col gap-4 justify-center items-center p-6 bg-white rounded-2xl border border-gray-200 max-w-2xl mx-auto">
            <textarea
                className="w-full h-32 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
                placeholder="Write your memory..."
                value={memoryText}
                onChange={(e) => setMemoryText(e.target.value)}
            />
            <Button
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition"
                onClick={onButtonClick}
            >
                <Plus className="w-5 h-5" />
                Memory
            </Button>
        </div>
    )
}

export default FileUploadComponent