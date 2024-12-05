import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const ToipcDescription = ({ topic, setTopic, description, setDescription }) => {
    return (
        <div className='my-20 mx-20 lg:mx-44'>
            <div className='flex flex-col gap-3'>
                <Label>Write the topic for which you want to generate a course</Label>
                <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g: Python Course, Latest Trends, Health Care etc..."
                    className="inputField"
                />
            </div>

            <div className='mt-10 flex flex-col gap-3'>
                <Label>Tell us more about the course to get more detail</Label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter the detail description of the course..."
                    className="inputField"
                />
            </div>
        </div>
    );
};

export default ToipcDescription;
