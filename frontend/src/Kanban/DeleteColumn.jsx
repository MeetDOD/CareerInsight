import React, { useState } from 'react'
import { FaFireFlameCurved, FaTrash } from "react-icons/fa6";
import arrow from "../assets/down.png"
import { toast } from 'sonner';

const DeleteCard = ({ setCards }) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    }

    const handleDragLeave = () => {
        setActive(false);
    }

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData('cardId');
        setCards(prev => prev.filter(card => card.id !== cardId));
        setActive(false);
        toast.success("Card deleted successfully");
    }

    return (
        <div>
            <div className='flex items-center justify-center mb-4'>
                <img src={arrow} className='w-1/2' />
            </div>
            <div
                onDrop={handleDragEnd}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                className={`flex h-40 w-full max-w-xs mx-auto items-center justify-center rounded-lg border-2 text-3xl transition-all ${active ? "border-red-800 bg-red-800/20 text-red-500" : "border-primary bg-primary/20 text-primary"
                    }`}
            >
                {active ? <FaFireFlameCurved className="animate-bounce text-4xl" /> : <FaTrash className="text-3xl" />}
            </div>
        </div>
    )
}

export default DeleteCard
