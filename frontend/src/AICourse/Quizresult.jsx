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

const Quizresult = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
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
            Quiz Results
          </h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {quizResults.length > 0 ? (
              quizResults.map((quiz) => (
                <div
                  key={quiz._id}
                >
                  <Card
                    className="relative rounded-md overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 group flex flex-col h-full hover:-translate-y-1"
                    style={{
                      backgroundImage: `url(${quiz.course.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: "150px",
                      borderColor: `var(--borderColor)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-black/30 to-transparent z-0 transition-opacity group-hover:opacity-90"></div>

                    <div className="relative z-10 flex flex-col h-full p-4 text-white">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg font-semibold flex justify-between items-center">
                          <span className="line-clamp-1 bg-primary rounded-md px-2 py-1">Quiz: {quiz.course.courseName}</span>
                          <span className="ml-2 bg-primary rounded-md px-2 py-1 ">
                            {quiz.score}/{quiz.questions.length}
                          </span>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="mt-auto p-0">
                        <div className="flex flex-row gap-2">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              navigate(`/viewcourse/${quiz.course._id}/careerinsight/${quiz.course.courseName}`)
                            }
                            className="flex-1 border"
                          >
                            View Courses
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                className="flex-1"
                                onClick={() => setSelectedQuiz(quiz)}
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent
                              className="max-h-[90vh] max-w-[90vw] md:max-w-[600px] lg:max-w-[800px] overflow-y-auto"
                              style={{
                                borderColor: `var(--borderColor)`,
                                backgroundColor: `var(--background-color)`,
                              }}
                            >
                              <DialogHeader>
                                <DialogTitle>
                                  Quiz Details for {selectedQuiz?.course.courseName}
                                </DialogTitle>
                              </DialogHeader>

                              {selectedQuiz?.questions.map((q, index) => (
                                <div
                                  key={index}
                                  className={`rounded-xl p-4 shadow-sm border transition-all duration-300 hover:shadow-md ${q.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
                                    }`}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                                      {index + 1}. {q.questionText}
                                    </h3>
                                    <div
                                      className={`px-2 ml-2 py-0.5 text-xs font-medium rounded-full ${q.isCorrect ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                        }`}
                                    >
                                      {q.isCorrect ? "Correct" : "Incorrect"}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 mt-1 text-sm">
                                    <div
                                      className={`flex items-center justify-center w-6 h-6 rounded-full ${q.isCorrect ? "bg-green-500" : "bg-red-500"
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
                                    <div className="flex items-center gap-2 mt-1 text-sm">
                                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                                        <CircleCheck className="text-white" size={16} />
                                      </div>
                                      <span className="text-gray-700 dark:text-gray-300">
                                        <strong>Correct Answer:</strong> {q.correctAnswer}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
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
