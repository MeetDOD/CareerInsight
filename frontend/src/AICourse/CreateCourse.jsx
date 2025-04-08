import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { MdTopic } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { Button } from "@/components/ui/button";
import SelectCategory from "./CreateCourseForm/SelectCategory";
import ToipcDescription from "./CreateCourseForm/ToipcDescription";
import SelectOptions from "./CreateCourseForm/SelectOptions";
import { chatSession } from "@/services/GeminiModel";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  categoryState,
  descriptionState,
  optionsState,
  responseState,
  topicState,
} from "@/store/courseState";
import { useRecoilState } from "recoil";
import fetchRelevantImage from "@/services/ThumbnailGenerator";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";
import axios from "axios";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import AppSidebar from "@/Dashboard/AppSidebar";

const CreateCourse = () => {
  const [activeIndex, setactiveIndex] = useState(0);
  const [category, setCategory] = useRecoilState(categoryState);
  const [topic, setTopic] = useRecoilState(topicState);
  const [description, setDescription] = useRecoilState(descriptionState);
  const [options, setOptions] = useRecoilState(optionsState);
  const [thumbnail, setThumbnail] = useState(null);
  const [response, setResponse] = useRecoilState(responseState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(import.meta.env.VITE_CREATECOURSE_PROMPT);

  const stepperOptions = [
    {
      id: 1,
      nameCategory: "Category/Domain",
      icon: <BiSolidCategory size={25} color="#101010" />,
    },
    {
      id: 2,
      nameCategory: "Topic/Description",
      icon: <MdTopic size={25} color="#101010" />,
    },
    {
      id: 3,
      nameCategory: "Options",
      icon: <IoMdOptions size={25} color="#101010" />,
    },
  ];

  const handleSubmit = async () => {
    try {
      const checktrail = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/checktrails/createcourse`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (checktrail.status === 200) {
        setLoading(true);
        const formData = {
          category,
          topic,
          description,
          ...options,
        };

        const createCoursePrompt = import.meta.env.VITE_CREATECOURSE_PROMPT;

        const prompt = `${createCoursePrompt}

            ### Course Details:
            - **Category**: ${formData.category}
            - **Topic**: ${formData.topic}
            - **Description**: ${formData.description}
            - **Course Level**: ${formData.difficulty}
            - **Course Duration**: ${formData.duration}
            - **Number of Chapters**: ${formData.chapters}
            - **Language**: ${formData.language}

            ### JSON Response Structure:
            {
                "courseName": "Course Title Here",
                "description": "Detailed course description here.",
                "topic": "Specific topic here.",
                "category": "Category name here.",
                "courseLevel": "Difficulty level here.",
                "duration": "Total course duration here.",
                "language": "Language here.",
                "chapters": [
                    {
                        "chapterName": "Chapter 1 Title",
                        "aboutChapter": "Brief description of Chapter 1.",
                        "duration": "Duration of Chapter 1"
                    },
                    {
                        "chapterName": "Chapter 2 Title",
                        "aboutChapter": "Brief description of Chapter 2.",
                        "duration": "Duration of Chapter 2"
                    }
                ]
            }

            ### Requirements:
            1. **Mandatory Fields**: All fields listed above are required. No field should be left empty.
            2. **Consistent Format**: Ensure the response is in **valid JSON format** only.
            3. **Meaningful Content**: Provide meaningful values for all fields. Placeholder text or empty strings are not acceptable.
            4. **Chapters**: Generate exactly ${formData.chapters} chapters, each with unique and relevant details.
            `;

        try {
          const result = await chatSession.sendMessage(prompt);
          const data = await result.response.text();
          const cleanedData = data.replace(/```json|```/g, "");
          const parsedResponse = JSON.parse(`[${cleanedData}]`);

          const imageUrl = await fetchRelevantImage(formData.topic);
          setThumbnail(imageUrl);
          setResponse(parsedResponse);
          navigate("/courselayout", {
            state: { courseData: parsedResponse, thumbnail: imageUrl },
          });
        } catch (error) {
          console.error("Error generating summary: ", error);
        } finally {
          setLoading(false);
        }
      } else if (checktrail.status === 400) {
        toast.error(
          "You have exhausted your free trials. Please upgrade to premium to continue."
        );
        navigate("/pricing");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(
          "You have exhausted your free trials. Please upgrade to premium to continue."
        );
        navigate("/pricing");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `CAREERINSIGHT | CREATE A COURSE`;
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
        <div className="flex items-center gap-2 mb-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block font-semibold">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  className="font-semibold"
                  style={{ color: `var(--text-color)` }}
                >
                  Create a Course
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center mt-10">
            <h2 className="text-4xl text-primary font-bold tracking-tight">
              Create Course
            </h2>
            <p className="text-lg mt-2 font-semibold tracking-tighter text-gray-500">
              Enter the details properly and accurate to get the desire response
              from AI
            </p>
            <div className="flex mt-20">
              {stepperOptions.map((item, index) => (
                <div className="flex items-center">
                  <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                    <div
                      className={`bg-gray-200 p-3 rounded-full ${activeIndex >=
                        index && "bg-primary"}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h2 className="hidden font-bold md:block md:text-sm">
                        {item.nameCategory}
                      </h2>
                    </div>
                  </div>

                  {index != stepperOptions?.length - 1 && (
                    <div
                      className={`h-1 mb-0 md:mb-5 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex -
                        1 >=
                        index && "bg-violet-600"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {activeIndex == 0 ? (
            <SelectCategory category={category} setCategory={setCategory} />
          ) : activeIndex == 1 ? (
            <ToipcDescription
              topic={topic}
              setTopic={setTopic}
              description={description}
              setDescription={setDescription}
            />
          ) : activeIndex == 2 ? (
            <SelectOptions options={options} setOptions={setOptions} />
          ) : null}

          <div className="mt-20">
            <div className="flex justify-between mt-10">
              <Button
                className="border"
                variant="secondary"
                size="lg"
                disabled={activeIndex == 0}
                onClick={() => setactiveIndex(activeIndex - 1)}
              >
                Previous
              </Button>

              {activeIndex < 2 && (
                <Button
                  size="lg"
                  onClick={() => setactiveIndex(activeIndex + 1)}
                  disabled={
                    (activeIndex === 0 && !category) ||
                    (activeIndex === 1 && (!topic || !description)) ||
                    activeIndex === 2
                  }
                >
                  Next
                </Button>
              )}

              {activeIndex === 2 && (
                <motion.div
                  className="relative p-[2px] rounded-lg mb-3"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "200% 50%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  style={{
                    background:
                      "linear-gradient(90deg, #ff00ff, #00ffff, #ff0, #ff00ff)",
                    backgroundSize: "200% 200%",
                  }}
                >
                  <Button
                    onClick={handleSubmit}
                    type="button"
                    size="sm"
                    disabled={loading}
                    className="relative z-10 bg-primary hover:bg-primary/50 text-white border-none w-full flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <ImSpinner2 size={20} className="animate-spin" /> Generating
                        layout from AI ...
                      </>
                    ) : (
                      <>
                        <BsStars size={20} /> Generate layout from AI
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CreateCourse;
