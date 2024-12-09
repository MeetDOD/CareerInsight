import React from 'react'
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

const CoursesPage = () => {
    const dummyCourses = [
        {
            id: 1,
            image: "https://media.licdn.com/dms/image/D4D12AQF26-NZ279EaA/article-cover_image-shrink_600_2000/0/1688018102545?e=2147483647&v=beta&t=Q9aUSt_UHzSqZYyDycri3s2kqVDlPc-YM0ZzlH2yfYc",
            title: "React Js for Beginners",
            instructor: "John Doe",
            date: "Dec 1, 2024",
        },
        {
            id: 2,
            image: "https://miro.medium.com/v2/resize:fit:1400/0*ZpjhBs0gR5oSd3Il",
            title: "Mastering C++",
            instructor: "Jane Smith",
            date: "Nov 20, 2024"
        },
        {
            id: 3,
            image: "https://miro.medium.com/v2/resize:fit:1200/1*QJnvahq_EBdUGjYQUYrhvA.png",
            title: "MongoDB Certification Prep",
            instructor: "Alice Johnson",
            date: "Nov 15, 2024",
            progress: "75%",
        },
        {
            id: 3,
            image: "https://miro.medium.com/v2/resize:fit:1200/1*QJnvahq_EBdUGjYQUYrhvA.png",
            title: "MongoDB Certification Prep",
            instructor: "Alice Johnson",
            date: "Nov 15, 2024",
            progress: "99%",
        },
    ];
    return (
        <div>
            <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {dummyCourses.map((course) => (
                    <Link
                        key={course.id}
                        className="p-2 shadow-md rounded-lg overflow-hidden border border-gray-300 hover:scale-95 transition-all hover:shadow-lg"
                        style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                    >
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full rounded-lg  h-40 object-cover"
                        />

                        <div className="p-4">
                            <h3 className="text-lg font-bold truncate">
                                {course.title}
                            </h3>
                            <p className="text-sm font-semibold flex items-center mt-2">
                                <FaUser size={15} className="mr-2" />
                                {course.instructor}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CoursesPage
