import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/usercourse/getallcourses`);
                setCourses(response.data.courses);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to fetch courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <Link
                        key={course._id}
                        to={`/viewcourse/${course._id}`}
                        className="p-2 shadow-md rounded-lg overflow-hidden border border-gray-300 hover:scale-95 transition-all hover:shadow-lg"
                        style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                    >
                        <img
                            src={course.thumbnail}
                            alt={course.courseName}
                            className="w-full rounded-lg h-40 object-cover"
                        />

                        <div className="p-4">
                            <h3 className="text-lg font-bold">
                                {course.courseName}
                            </h3>
                            <p className="text-sm font-semibold">
                                Category: {course.category}
                            </p>
                            <p className="text-sm font-semibold">
                                Duration: {course.duration}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
