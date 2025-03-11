import { FiPlus } from "react-icons/fi";
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AddCard = ({ column, setCards }) => {
    const [text, seText] = useState("");
    const [adding, setAdding] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const newCard = {
            category: column,
            title: text.trim(),
            id: Math.random().toString()
        }

        setCards((prev) => [...prev, newCard]);
        toast.success("Card added successfully");
        setAdding(false);
    };


    return (
        <div>
            {adding ?
                <motion.form layout onSubmit={handleSubmit} className="my-3">
                    <Textarea onChange={(e) => seText(e.target.value)}
                        autoFocus
                        placeholder="Add new task..."
                        className='inputField shadow-sm'
                    />
                    <div className='mt-3 flex items-center justify-end gap-1.5'>
                        <button onClick={() => setAdding(false)} className='px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-300'>
                            Close
                        </button>
                        <button type='submit' className='border px-3 py-1.5 text-xs text-neutral-950 flex items-center gap-1.5 rounded bg-neutral-50 transition-colors hover:bg-neutral-300'>
                            <span>Add</span>
                            <FiPlus />
                        </button>
                    </div>
                </motion.form>
                :
                <motion.button layout onClick={() => setAdding(true)}
                    className='w-full flex items-center gap-1.5 py-3 text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-300'>
                    Add Card
                    <FiPlus />
                </motion.button>
            }
        </div>
    )
}

export default AddCard
