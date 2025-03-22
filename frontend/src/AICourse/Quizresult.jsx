import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Quizresult = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [expandedQuiz, setExpandedQuiz] = useState(null);

  useEffect(() => {
    // Fetch quiz results
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
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      }
    };
    getQuizResults();
  }, []);

  const toggleExpand = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Quiz Results</h1>
      <div className="space-y-4">
        {quizResults.length > 0 ? (
          quizResults.map((quiz) => (
            <Card key={quiz._id} className="border p-4 rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex justify-between">
                  <span>{quiz.course.courseName}</span>
                  <span className="text-green-600">
                    {quiz.score}/{quiz.questions.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  onClick={() => toggleExpand(quiz._id)}
                  className="w-full"
                >
                  {expandedQuiz === quiz._id ? "Hide Details" : "View Details"}
                </Button>
                {expandedQuiz === quiz._id && (
                  <div className="mt-4 space-y-3">
                    {quiz.questions.map((q, index) => (
                      <div
                        key={index}
                        className={`p-3 border-l-4 rounded-md ${
                          q.isCorrect
                            ? "border-green-500 bg-green-100"
                            : "border-red-500 bg-red-100"
                        }`}
                      >
                        <p className="font-medium">
                          {index + 1}. {q.questionText}
                        </p>
                        <p>
                          <strong>Your Answer:</strong> {q.userAnswer}
                          {q.isCorrect ? " ✅" : " ❌"}
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
  );
};

export default Quizresult;
