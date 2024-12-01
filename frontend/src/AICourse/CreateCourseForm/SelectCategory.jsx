import { Label } from '@/components/ui/label';
import categorylist from '@/data/categorylist';
import React from 'react';

const SelectCategory = ({ category, setCategory }) => {
    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    return (
        <div className='my-20 px-10 md:px-20'>
            <Label>Select the course category</Label>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5'>
                {categorylist.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleCategoryChange(item.name)}
                        className={`flex flex-col gap-5 p-5 border items-center rounded-lg hover:border-primary bg-white hover:bg-violet-100 cursor-pointer ${category === item.name && 'border-primary bg-violet-100'}`}
                    >
                        <h1>{item.icon}</h1>
                        <h1 className='text-primary font-semibold'>{item.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectCategory;
