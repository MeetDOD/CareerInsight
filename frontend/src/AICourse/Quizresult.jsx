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

const Quizresult = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
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
          <h1 className="text-2xl font-bold mb-5">Quiz Results</h1>
          <div className="space-y-4">
            {quizResults.length > 0 ? (
              quizResults.map((quiz) => (
                <Card key={quiz._id} className="border rounded-lg shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-2" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex justify-between" style={{ color: `var(--text-color)` }}>
                      <div>Quiz given for {quiz.course.courseName}</div>
                      <div
                      >
                        {quiz.score}/{quiz.questions.length}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row gap-2">
                      <Button variant="secondary" onClick={() => navigate("/courses")} className="w-full">
                        View Courses
                      </Button>
                      <Button
                        onClick={() => toggleExpand(quiz._id)}
                        className="w-full"
                      >
                        {expandedQuiz === quiz._id ? "Hide Details" : "View Details"}
                      </Button>
                    </div>
                    {expandedQuiz === quiz._id && (
                      <div className="mt-4 space-y-3">
                        {quiz.questions.map((q, index) => (
                          <div
                            key={index}
                            className={`p-3 border-l-4 rounded-md ${q.isCorrect
                              ? "border-green-500 bg-green-100"
                              : "border-red-500 bg-red-100"
                              }`}
                          >
                            <p className="font-medium">
                              {index + 1}. {q.questionText}
                            </p>
                            <p className="flex gap-2">
                              <strong>Your Answer:</strong> {q.userAnswer}
                              {q.isCorrect ? <CircleCheck className="text-green-500" /> : <CircleX className="text-red-500" />}
                            </p>
                            {!q.isCorrect && (
                              <p>
                                <strong>Correct Answer:</strong> {q.correctAnswer}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No quiz results found.</p>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Quizresult;
