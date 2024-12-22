import { userState } from '@/store/auth'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const CourseRecommendation = () => {

    const user = useRecoilValue(userState);
    const [recommendedCourses, setRecommendedCourses] = useState([]);

    useEffect(() => {
        if (user?.techstack?.length) {
            fetch(`${import.meta.env.VITE_BASE_URL}/api/usercourse/recommendations`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    setRecommendedCourses(data.recommendedCourses);
                    console.log(data.recommendedCourses)
                })
                .catch(err => {
                    console.error('Error fetching recommended courses:', err);
                });
        }
    }, [user]);

    return (
        <div className='mt-10'>
            <div className="text-center my-10">
                <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                    Tailored courses for You
                </h1>
                <p className="text-lg font-semibold my-3 tracking-tighter text-gray-500">
                    Best courses from careerinsight which Perfectly align to your tech stack
                </p>
            </div>
        </div>
    )
}

export default CourseRecommendation
