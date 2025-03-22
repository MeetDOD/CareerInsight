import { Badge } from '@/components/ui/badge';
import Loader from '@/services/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AllCodingQuestions = () => {

    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/problems/getproblems`);
            setQuestions(data);
            setLoading(false);
            console.log(data);
        }
        fetchQuestions();
    }, [])
    return (
        <div>
            <h1 className="text-center text-3xl font-bold my-4">All Coding Questions</h1>

            <div className="flex flex-row flex-wrap gap-2">
                {questions.map((question) => (
                    <div key={question._id} className="flex flex-row">
                        <Badge>{question.type}</Badge>
                    </div>
                ))}
            </div>

            {loading ? <h1><Loader /></h1> : (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4" tyle={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                    {questions.map(question => (
                        <div key={question._id} className="brder shadow-md p-4 rounded-md">
                            <h1 className="text-xl font-bold">{question.title}</h1>
                            <p>{question.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AllCodingQuestions
