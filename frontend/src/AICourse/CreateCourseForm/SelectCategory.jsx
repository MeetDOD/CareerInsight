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
                        className={`space-y-2 flex flex-col p-4 border hover:scale-95 transition-all shadow-md hover:shadow-lg items-center rounded-xl hover:border-primary cursor-pointer ${category === item.name && 'border border-primary scale-95 transition-all'}`}
                    >
                        <h1 className='p-2 bg-primary text-white rounded-lg'>{item.icon}</h1>
                        <h1 className='text-primary font-bold text-lg'>{item.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectCategory;
