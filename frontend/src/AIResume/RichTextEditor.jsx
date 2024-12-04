import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React, { useContext, useState } from 'react'
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnUnderline,
    BtnUndo,
    Editor,
    EditorProvider,
    Separator,
    Toolbar
} from 'react-simple-wysiwyg';
import { BsRobot } from "react-icons/bs";
import { chatSession } from '@/services/GeminiModel';
import { ResumeInfoContext } from '@/context/ResumeContext';
import { ImSpinner2 } from "react-icons/im";

const RichTextEditor = ({ onRichTextEditorChange, index }) => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [value, setvalue] = useState();
    const [loading, setLoading] = useState(false);

    const summeryGenerater = async () => {
        if (!resumeInfo.experience[index].title) {
            alert("Please fill the position title")
            return;
        }
        console.log(resumeInfo?.experience[index].title)
        setLoading(true);
        const prompt = `I am working on my resume. Based on the following job title: "${resumeInfo?.experience[index].title}", generate 5-7 bullet points that summarize key achievements and responsibilities related to this job. Please return the result in valid HTML <ul> and <li> format, so that I can directly use it in my resume's experience section. Ensure the bullet points are concise, impactful, and relevant to the job title provided.
        The response should be in the following format:
        <ul>
          <li>Your first bullet point here</li>
          <li>Your second bullet point here</li>
          <li>Your third bullet point here</li>
          <li>Your fourth bullet point here</li>
          <li>Your fifth bullet point here</li>
          <li>Your sixth bullet point here (optional)</li>
          <li>Your seventh bullet point here (optional)</li>
        </ul>
        `;
        try {
            const result = await chatSession.sendMessage(prompt);
            const res = result.response.text();
            setvalue(res.replace('```html', '').replace('```', ''));
        } catch (error) {
            console.error("Error generating summary: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex justify-between '>
                <Label className='text-sm'>Summary</Label>
                <Button
                    onClick={summeryGenerater}
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="border border-primary text-primary flex gap-1.5 mb-3"
                    disabled={loading}
                >
                    <BsRobot size={20} />
                    {loading ? <ImSpinner2 size={20} className='animate-spin' /> : 'Generate from AI'}
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => { setvalue(e.target.value); onRichTextEditorChange(e) }}>
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider >
        </div>
    )
}

export default RichTextEditor
