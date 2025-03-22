import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const itemsPerPage = 9;

    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const categories = [...new Set(courses.map(course => course.category))];
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    const durations = ['4 Hours', '2 Hours', '6 Hours'];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
        const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.courseLevel);
        const matchesDuration = selectedDurations.length === 0 || selectedDurations.includes(course.duration);
        console.log(matchesLevel, matchesCategory, matchesDuration, " matched data");
        return matchesSearch && matchesCategory && matchesLevel && matchesDuration;
    });

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/usercourse/getallcourses`);
                setCourses(response.data.courses.reverse());
            } catch (err) {
                toast.error("Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handlePageClick = (page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    const paginatedCourses = filteredCourses?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "CAREERINSIGHT | COURSES";
    }, []);

    console.log(selectedLevels, selectedCategories, selectedDurations, "data");
    console.log("courses", courses)

    return (
        <div>
            <div className='flex flex-col items-center gap-2 my-10 px-4 '>
                <h1 className='text-2xl md:text-3xl font-bold text-center'>
                    Latest <span className='text-primary'>Courses</span>
                </h1>
                <p className='text-center text-lg opacity-90 tracking-tight'>
                    Explore our newest courses designed to help you gain essential skills and advance your career.
                </p>
                <div className="w-full mt-4 relative">
                    <Input
                        type="text"
                        placeholder="Search courses by name or category..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-10 inputField"
                    />
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 px-4 ">
                <div className="md:w-64 space-y-4" style={{
                    position: 'sticky',
                    top: '20px',
                    height: 'calc(100vh - 40px)'
                }}>
                    <div className="border rounded-lg p-4" style={{ borderColor: `var(--borderColor)` }}>
                        <h3 className="font-semibold mb-3">Categories</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category} className="flex items-center gap-2">
                                    <Checkbox
                                        checked={selectedCategories.includes(category)}
                                        onCheckedChange={(checked) => {
                                            setSelectedCategories((prev) =>
                                                checked
                                                    ? [...prev, category]
                                                    : prev.filter((c) => c !== category)
                                            );
                                            setCurrentPage(1);
                                        }}
                                    />
                                    <span>{category}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border rounded-lg p-4" style={{ borderColor: `var(--borderColor)` }}>
                        <h3 className="font-semibold mb-3">Course Level</h3>
                        <div className="space-y-2">
                            {levels.map((level) => (
                                <div key={level} className="flex items-center gap-2">
                                    <Checkbox
                                        checked={selectedLevels.includes(level)}
                                        onCheckedChange={(checked) => {
                                            setSelectedLevels((prev) =>
                                                checked
                                                    ? [...prev, level]
                                                    : prev.filter((l) => l !== level)
                                            );
                                            setCurrentPage(1);
                                        }}
                                    />
                                    <span>{level}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border rounded-lg p-4" style={{ borderColor: `var(--borderColor)` }}>
                        <h3 className="font-semibold mb-3">Course Duration</h3>
                        <div className="space-y-2">
                            {durations.map((duration) => (
                                <div key={duration} className="flex items-center gap-2">
                                    <Checkbox
                                        checked={selectedDurations.includes(duration)}
                                        onCheckedChange={(checked) => {
                                            setSelectedDurations((prev) =>
                                                checked
                                                    ? [...prev, duration]
                                                    : prev.filter((d) => d !== duration)
                                            );
                                            setCurrentPage(1);
                                        }}
                                    />
                                    <span>{duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 8 }).map((index) => (
                                <div
                                    key={index}
                                    className="p-2 shadow-md rounded-lg border border-gray-300"
                                    style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                                >
                                    <Skeleton className="w-full h-40 rounded-lg skle" />
                                    <div className="py-4 space-y-2">
                                        <div>
                                            <Skeleton className="h-6 w-3/4 mb-2 skle" />
                                        </div>
                                        <div className='flex justify-between'>
                                            <Skeleton className="h-4 w-1/2 skle" />
                                            <Skeleton className="h-4 w-16 skle" />
                                        </div>
                                        <Skeleton className="h-3 w-full skle" />
                                        <Skeleton className="h-3 w-24 skle" />
                                        <Skeleton className="h-3 w-60 skle" />
                                    </div>
                                    <Skeleton className="h-10 w-full skle" />
                                </div>
                            ))}
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Found</h3>
                            <p className="text-gray-500">
                                No courses match your selected filters. Try adjusting your search criteria.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            {paginatedCourses?.map((course) => (
                                <div
                                    key={course._id}
                                    to={`/viewcourse/${course._id}`}
                                    className="p-2 shadow-md rounded-lg overflow-hidden border border-gray-300 transition duration-300 hover:-translate-y-2"
                                    style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                                >
                                    <img
                                        src={course.thumbnail}
                                        alt={course.courseName}
                                        className="w-full rounded-lg h-40 object-cover"
                                    />
                                    <div className="py-4 space-y-2">
                                        <div className="text-lg font-bold line-clamp-2">
                                            CareerInsight: {course.courseName}
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary'>
                                                {course.category}
                                            </div>
                                            <div className='font-bold text-xs flex flex-row items-center gap-1 text-green-400'>
                                                <div className="w-2 h-2 bg-green-400 rounded-full border border-green-600"></div>
                                                {course.duration}
                                            </div>
                                        </div>
                                        <div className="text-xs font-semibold text-gray-500">
                                            Published At: {format(new Date(course.createdAt), 'MMMM d, yyyy')}
                                        </div>
                                    </div>
                                    <div>
                                        <Link to={`/viewcourse/${course._id}/careerinsight/${course.courseName}`}>
                                            <Button className="w-full">More Details</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredCourses?.length > 0 &&
                        <div className="flex justify-center items-center mt-6 gap-2">
                            <Button
                                onClick={() => handlePageClick(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Previous
                            </Button>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handlePageClick(index + 1)}
                                    className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <Button
                                onClick={() => handlePageClick(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Next
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
