import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { chatSession } from "@/services/GeminiModel";
import Loader from "@/services/Loader";
import axios from "axios";

const QuizDialog = ({ open, onClose, course }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  console.log(course);
  console.log(answers);

  const generateQuiz = async () => {
    setLoading(true);
    const prompt = `
        Generate a quiz based on the following course information:
        - Category: ${course.category}
        - Description: ${course.description}
        
        Output a JSON object with exactly 5 questions. 
        Each question should have:
        - "id": A unique identifier (number).
        - "question": The question text.
        - "options": An array of 4 options.
        - "correct": The correct answer (one of the options).
        
        Output format:
        {
            "questions": [
                {
                    "id": 1,
                    "question": "What is the capital of France?",
                    "options": ["Paris", "Berlin", "Madrid", "Rome"],
                    "correct": "Paris"
                },
                {
                    "id": 2,
                    "question": "Which language runs in a web browser?",
                    "options": ["Java", "C++", "Python", "JavaScript"],
                    "correct": "JavaScript"
                }
            ]
        }
        `;

    try {
      const result = await chatSession.sendMessage(prompt);
      const data = await result.response.text();

      const cleanedData = data.replace(/```json|```|`/g, "").trim();

      const parsedResponse = JSON.parse(cleanedData);

      if (parsedResponse.questions && Array.isArray(parsedResponse.questions)) {
        setQuestions(parsedResponse.questions);
        console.log(parsedResponse.questions);
      } else {
        console.error("Unexpected response format:", parsedResponse);
        toast.error("Invalid quiz format. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      toast.error("Error generating quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      generateQuiz();
    }
  }, [open]);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  //   const handleSubmit = async () => {
  //     const unanswered = questions.some((q) => !answers[q.id]);

  //     if (unanswered) {
  //       toast.error("Please answer all questions before submitting.");
  //       return;
  //     }

  //     let score = 0;
  //     questions.forEach((q) => {
  //       if (answers[q.id] === q.correct) {
  //         score += 1;
  //       }
  //     });

  //     try {
  //       await axios.post(
  //         `${import.meta.env.VITE_BASE_URL}/api/user/savecoursemarks`,
  //         {
  //           courseid: course._id,
  //           marks: score,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );

  //       toast.success("Quiz submitted successfully! Your score: " + score);
  //     } catch (error) {
  //       console.error("Error saving marks:", error);
  //       toast.error("Failed to save quiz results.");
  //     }

  //     setSubmitted(true);
  //     onClose();
  //   };

  const handleSubmit = async () => {
    const unanswered = questions.some((q) => !answers[q.id]);

    if (unanswered) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/savecoursemarks`,
        {
          courseid: course._id,
          answers,
          questions,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(
        `Quiz submitted! Score: ${response.data.score}/${questions.length}`
      );
    } catch (error) {
      console.error("Error saving quiz results:", error);
      toast.error("Failed to save quiz results.");
    }

    setSubmitted(true);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl"
        style={{
          borderColor: `var(--borderColor)`,
          backgroundColor: `var(--background-color)`,
        }}
      >
        <DialogHeader>
          <DialogTitle>Quiz for {course.courseName}</DialogTitle>
          <DialogDescription>
            Answer the following questions carefully. Select only one option per
            question.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : (
            questions.map((q) => (
              <div
                key={q.id}
                className="p-4 border-2 border-dashed border-primary rounded-lg mr-4"
              >
                <h3 className="text-lg font-semibold">
                  {q.id}. {q.question}
                </h3>
                <RadioGroup
                  className="mt-2"
                  value={answers[q.id] || ""}
                  onValueChange={(value) => handleSelect(q.id, value)}
                >
                  {q.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem
                        id={`q${q.id}-${idx}`}
                        value={option}
                        checked={answers[q.id] === option}
                      />
                      <label
                        htmlFor={`q${q.id}-${idx}`}
                        className="cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))
          )}
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button className="border" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Generating..." : "Submit Quiz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
