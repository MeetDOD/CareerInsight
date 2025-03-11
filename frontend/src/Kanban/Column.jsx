import React, { useState } from 'react'
import AddCard from './AddCard'
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const DropIndicator = ({ beforeId, column }) => {
    return (
        <div data-before-id={beforeId || -1} data-column={column} className='h-0.5 my-2 w-full opacity-0 bg-violet-400'>

        </div>
    )
}

const colorMap = {
    "red-500": "border-red-500",
    "yellow-500": "border-yellow-500",
    "green-500": "border-green-500"
};

const Card = ({ title, id, column, handleDragStart, color }) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                onDragStart={(e) => handleDragStart(e, { title, id, column })}
                layoutId={id}
                draggable="true"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}
                className={`relative cursor-grab rounded-md border border-t-8 p-4 shadow-sm transition-all duration-200 active:cursor-grabbing hover:shadow-md ${colorMap[color] || "border-gray-500"
                    }`}
            >
                <p className="text-sm font-medium">{title}</p>
            </motion.div>
        </>
    );
};


const Column = ({ title, headingColor, column, cards, setCards }) => {
    const [active, setActive] = useState(false);
    const filteredCards = cards.filter(card => card.category === column);

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData('cardId', card.id);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        highLightIndicator(e);
        setActive(true);
    }

    const handleDragLeave = () => {
        setActive(false);
        clearHighLights();
    }

    const handleDragEnd = (e) => {
        e.preventDefault();
        setActive(false);
        clearHighLights();

        const cardId = e.dataTransfer.getData('cardId');
        if (!cardId) return;

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.beforeId || "-1";

        if (before !== cardId) {
            setCards((prev) => {
                let copy = [...prev];
                let cardToTransfer = copy.find(card => card.id == cardId);

                if (!cardToTransfer) return prev;

                cardToTransfer = { ...cardToTransfer, category: column };

                copy = copy.filter(card => card.id != cardId);

                const moveToBack = before === "-1";

                if (moveToBack) {
                    copy.push(cardToTransfer);
                    toast.success("Card moved successfully");
                } else {
                    const insertAtIndex = copy.findIndex(el => el.id == before);
                    if (insertAtIndex === -1) return prev;
                    copy.splice(insertAtIndex, 0, cardToTransfer);
                }

                return copy;
            });
        }
    };

    const highLightIndicator = (e) => {
        const indicators = getIndicators();
        clearHighLights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    }

    const clearHighLights = (els) => {
        const indicators = els || getIndicators();
        indicators.forEach(indicator => {
            indicator.style.opacity = "0";
        })
    }

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        )

        return el;
    }

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    }
    return (
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md shrink-0">
            <div className={`mb-4 flex items-center justify-between bg-${headingColor} rounded-full py-3 px-6`}>
                <h3 className={`font-medium text-white`}>{title}</h3>
                <span className='rounded  text-white'>{filteredCards.length}</span>
            </div>
            <div onDrop={handleDragEnd} onDragLeave={handleDragLeave} onDragOver={handleDragOver} className={`h-full rounded-xl w-full transition-colors p-2 ${active ? "bg-violet-300/50" : "bg-neutral-800/0"}`}>
                {filteredCards.map(card => {
                    return <Card key={card.id} {...card} handleDragStart={handleDragStart} title={card.title} id={card.id} column={column} color={headingColor} />
                })}
                <DropIndicator beforeId="-1" column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    )
}

export default Column
