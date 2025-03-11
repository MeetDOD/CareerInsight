import React from 'react'
import { AiOutlineStar } from "react-icons/ai";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

const problem = {
    "title": "Find the Missing Number",
    "difficulty": "Easy",
    "likes": 99,
    "dislikes": 19,
    "starred": false,
    "image": "",
    "problemStatement": "You are given an array of n distinct numbers taken from 0, 1, 2, ..., n. Since the array is missing one number from the range, your task is to find and return the missing number.",
    "examples": [
        {
            "id": 1,
            "inputText": "nums = [3, 0, 1]",
            "outputText": "2",
            "explanation": "Numbers from 0 to 3 are [0, 1, 2, 3]. The missing number is 2.",
            "img": "https://img.jagranjosh.com/images/2023/July/2872023/find-the-missing-number-in-7-seconds.jpg"
        },
        {
            "id": 2,
            "inputText": "nums = [9,6,4,2,3,5,7,0,1]",
            "outputText": "8",
            "explanation": "Numbers from 0 to 9 are [0,1,2,3,4,5,6,7,8,9]. The missing number is 8.",
            "img": "https://img.jagranjosh.com/images/2024/April/3042024/maths-puzzles-find-missing-number.webp"
        }
    ],
    "constraints": "<li>1 <= n <= 10<sup>4</sup></li><li>0 <= nums[i] <= n</li><li>All the numbers in <code>nums</code> are unique.</li>"
};

const ProblemDescription = () => {
    return (
        <div className='min-h-screen pr-6 py-3 overflow-y-auto' >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `var(--borderColor)` }}>
                <h1 className="text-xl font-semibold">{problem.title}</h1>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                    {problem.difficulty}
                </span>
            </div>

            <div className="flex flex-wrap md:flex-row space-x-0  mt-4 gap-3">
                <button className="flex items-center justify-center w-full md:w-auto space-x-1 bg-blue-100 border border-blue-500 hover:bg-blue-200 text-white px-3 py-2 rounded-lg">
                    <BiSolidLike className="text-blue-500" size={20} />
                    <span className="text-blue-500">{problem.likes}</span>
                </button>
                <button className="flex items-center justify-center w-full md:w-auto space-x-1 bg-red-100  border border-red-500 hover:bg-red-200 text-white px-3 py-2 rounded-lg">
                    <BiSolidDislike className="text-red-500" size={20} />
                    <span className="text-red-500">{problem.dislikes}</span>
                </button>
                <button className="flex items-center justify-center w-full md:w-auto space-x-1 bg-yellow-100 border border-yellow-500 hover:bg-yellow-200 text-white px-3 py-2 rounded-lg">
                    <AiOutlineStar className="text-yellow-500" size={20} />
                    <span className="text-yellow-500">Save</span>
                </button>
            </div>

            <div className="mt-6 p-5 rounded-lg border shadow-sm" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                <h2 className="text-lg font-semibold">Problem Statement:</h2>
                <p
                    className="mt-2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
                />
            </div>

            <div className="flex py-4 h-[calc(100vh-94px)] ">
                <div className="w-full max-w-3xl mx-auto">
                    <div className="mt-4 space-y-6">
                        {problem.examples.map((example, index) => (
                            <div key={example.id} className="border p-4 rounded-lg shadow-sm" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                                <p className="text-lg font-semibold mb-2">Example {index + 1}:</p>

                                {example.img && (
                                    <img
                                        src={example.img}
                                        alt="Example"
                                        className="mt-3 rounded-lg shadow-sm border"
                                        style={{ borderColor: `var(--borderColor)` }}
                                    />
                                )}

                                <div className="courseSection p-4 mt-3 rounded-lg shadow-sm">
                                    <pre className="border-l-4 pl-4 text-sm whitespace-pre-wrap" style={{ borderColor: `var(--borderColor)` }}>
                                        <strong className="text-green-400">Input: </strong> {example.inputText}
                                        <br />
                                        <br />
                                        <strong className="text-blue-400">Output: </strong> {example.outputText}
                                        <br />
                                        <br />
                                        {example.explanation && (
                                            <>
                                                <strong className="text-yellow-400">Explanation: </strong> {example.explanation}
                                            </>
                                        )}
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 border p-5 rounded-lg shadow-sm" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                        <h2 className="text-lg font-semibold ">Constraints</h2>
                        <ul
                            className="list-disc list-inside mt-2"
                            dangerouslySetInnerHTML={{ __html: problem.constraints }}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProblemDescription