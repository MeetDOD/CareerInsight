import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import AppSidebar from "@/Dashboard/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, CircleX } from "lucide-react";
import Loader from "@/services/Loader";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { userState } from "@/store/auth";
import { useRecoilValue } from "recoil";

const Quizresult = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    const getQuizResults = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/getquizresults`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setQuizResults(response.data.quizResults);
        console.log(response.data.quizResults);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      } finally {
        setLoading(false);
      }
    };
    getQuizResults();
  }, []);

  const toggleExpand = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };

  if (loading) {
    return <Loader />
  }

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
                  Industry Insights
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-5">
            <span className="text-primary">{user?.fullName}</span> Quiz Results
          </h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {quizResults.length > 0 ? (
              quizResults.map((quiz) => (
                <div key={quiz._id}>
                  <Card className="group relative flex flex-col overflow-hidden rounded-xl border shadow-md transition hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: `var(--background-color)`, borderColor: `var(--borderColor)` }}>
                    <div className="flex items-center gap-4 p-4">
                      <img
                        src={quiz.course.thumbnail}
                        alt="Course Thumbnail"
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-semibold line-clamp-1 px-3 py-1 rounded-md" style={{ color: `var(--text-color)` }}>
                            Quiz: {quiz.course.courseName}
                          </h2>
                          <span className="text-sm bg-primary text-white px-3 py-1 rounded-md">
                            {quiz.score}/{quiz.questions.length}
                          </span>
                        </div>

                        <div className="mt-4 flex gap-3">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              navigate(`/viewcourse/${quiz.course._id}/careerinsight/${quiz.course.courseName}`)
                            }
                            className="w-full"
                          >
                            View Course
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => setSelectedQuiz(quiz)}
                                className="w-full"
                              >
                                View Details
                              </Button>
                            </DialogTrigger>

                            <DialogContent className="max-h-[90vh] max-w-[90vw] md:max-w-[600px] lg:max-w-[800px] overflow-y-auto dark:bg-gray-900">
                              <DialogHeader>
                                <DialogTitle>
                                  Quiz Details - {selectedQuiz?.course.courseName}
                                </DialogTitle>
                              </DialogHeader>

                              <div className="space-y-4 mt-4">
                                {selectedQuiz?.questions.map((q, index) => (
                                  <div
                                    key={index}
                                    className={`rounded-lg p-4 border shadow-sm transition-all duration-300 ${q.isCorrect
                                      ? "border-green-400 bg-green-50"
                                      : "border-red-400 bg-red-50"
                                      }`}
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                                        {index + 1}. {q.questionText}
                                      </h3>
                                      <span
                                        className={`text-xs px-2 py-1 rounded-full font-medium ${q.isCorrect
                                          ? "bg-green-200 text-green-800"
                                          : "bg-red-200 text-red-800"
                                          }`}
                                      >
                                        {q.isCorrect ? "Correct" : "Incorrect"}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2 text-sm">
                                      <div
                                        className={`w-6 h-6 flex items-center justify-center rounded-full ${q.isCorrect ? "bg-green-500" : "bg-red-500"
                                          }`}
                                      >
                                        {q.isCorrect ? (
                                          <CircleCheck className="text-white" size={16} />
                                        ) : (
                                          <CircleX className="text-white" size={16} />
                                        )}
                                      </div>
                                      <span className="text-gray-700 dark:text-gray-300">
                                        <strong>Your Answer:</strong> {q.userAnswer}
                                      </span>
                                    </div>

                                    {!q.isCorrect && (
                                      <div className="flex items-center gap-2 mt-2 text-sm">
                                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500">
                                          <CircleCheck className="text-white" size={16} />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">
                                          <strong>Correct Answer:</strong> {q.correctAnswer}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

              ))
            ) : (
              <p className="text-gray-600 text-center">No quiz results found.</p>
            )}
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
};

export default Quizresult;
