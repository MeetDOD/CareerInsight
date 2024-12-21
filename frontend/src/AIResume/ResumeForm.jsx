import React, { useState } from 'react'
import PersonalDetailForm from './formcomponents/PersonalDetailForm'
import { Button } from '@/components/ui/button'
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import SummeryForm from './formcomponents/SummeryForm';
import ExperienceForm from './formcomponents/ExperienceForm';
import EducationForm from './formcomponents/EducationForm';
import SkillForm from './formcomponents/SkillForm';
import DonwloadResume from './DonwloadResume';
import { useNavigate } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import FontStyle from './FontStyle';
import { FaHome } from 'react-icons/fa';

const ResumeForm = () => {
    const [activeForm, setActiveForm] = useState(1);
    const [enableNext, setEnableNext] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/dashboard");
    }
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4 sm:gap-2">
                <div className="flex gap-2">
                    <Button onClick={handleNavigate} size="sm" className="flex gap-2">
                        <FaHome size={20} />
                    </Button>
                    <ThemeColor />
                    <FontStyle />
                </div>

                <div className="flex gap-2">
                    {activeForm > 1 && (
                        <Button
                            size="sm"
                            className="flex gap-2"
                            onClick={() => setActiveForm(activeForm - 1)}
                        >
                            <IoMdArrowRoundBack size={20} />
                            Back
                        </Button>
                    )}
                    {activeForm < 6 && (
                        <Button
                            disabled={!enableNext}
                            className="flex gap-2"
                            onClick={() => setActiveForm(activeForm + 1)}
                            size="sm"
                        >
                            Next <IoMdArrowRoundForward size={20} />
                        </Button>
                    )}
                </div>
            </div>

            {activeForm == 1 ? <PersonalDetailForm enableNext={(v) => setEnableNext(v)} />
                : activeForm == 2 ? <SummeryForm />
                    : activeForm == 3 ? <ExperienceForm />
                        : activeForm == 4 ? <EducationForm />
                            : activeForm == 5 ? <SkillForm />
                                : activeForm == 6 ? <DonwloadResume />
                                    : null
            }
        </div>
    )
}

export default ResumeForm
