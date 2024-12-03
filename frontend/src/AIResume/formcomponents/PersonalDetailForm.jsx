import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResumeInfoContext } from '@/context/ResumeContext'
import React, { useContext } from 'react'

const PersonalDetailForm = ({ enableNext }) => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);

    const handleInputChange = (e) => {
        enableNext(false);
        const { name, value } = e.target;
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }

    const onSave = (e) => {
        e.preventDefault();
        enableNext(true);
    }
    return (
        <div className='p-5 rounded-lg shadow-lg border-t-primary border-t-8 bg-white'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic Information</p>
            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <Label className='text-sm'>First Name</Label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label className='text-sm'>Last Name</Label>
                        <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <Label className='text-sm'>Job Title</Label>
                        <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <Label className='text-sm'>Address</Label>
                        <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label className='text-sm'>Phone</Label>
                        <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label className='text-sm'>Email Id</Label>
                        <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetailForm
