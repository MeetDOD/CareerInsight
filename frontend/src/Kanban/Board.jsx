import React, { useEffect, useState } from 'react'
import Column from './Column'
import DeleteCard from './DeleteColumn'

const Board = () => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        const storedCards = localStorage.getItem("kanbanCards");
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("kanbanCards", JSON.stringify(cards));
    }, [cards]);

    return (
        <div
            style={{ borderColor: `var(--borderColor)` }}
            className="border-2 px-7 rounded-xl border-dashed flex h-full w-full flex-col gap-6 py-7 md:flex-row">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Column title="To Do" headingColor="red-500" column="todo" cards={cards} setCards={setCards} />
                <Column title="In Progress" headingColor="yellow-500" column="doing" cards={cards} setCards={setCards} />
                <Column title="Completed" headingColor="green-500" column="done" cards={cards} setCards={setCards} />
                <DeleteCard setCards={setCards} />
            </div>
        </div>

    )
}

export default Board
