import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LeetcodeQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    const fetchLeetcodeQuestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/fetchleetcodequestions`
        );
        console.log(response.data);

        setQuestions(response.data);
        setFilteredQuestions(response.data);
      } catch (error) {
        console.error("Error fetching LeetCode questions:", error);
      }
    };

    fetchLeetcodeQuestions();
  }, []);

  const handleFilterChange = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);

    if (selectedDifficulty === "All") {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(
        questions.filter((q) => q.difficulty === selectedDifficulty)
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">LeetCode Questions</h1>

      <div className="mb-5">
        <Select onValueChange={handleFilterChange} defaultValue="All">
          <SelectTrigger className="inputField">
            <SelectValue placeholder="Select Difficulty" />
          </SelectTrigger>
          <SelectContent style={{
            backgroundColor: `var(--background-color)`,
            color: `var(--text-color)`,
            borderColor: `var(--borderColor)`,
          }}>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card
            key={question.title}
            className="border rounded-lg shadow-md"
            style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex justify-between">
                <span>{question.title}</span>
                <span
                  className={
                    question.difficulty === "Easy"
                      ? "text-green-500 bg-green-50 rounded-full px-3 border-green-500 border"
                      : question.difficulty === "Medium"
                        ? "text-yellow-500 bg-yellow-50 rounded-full px-3 border-yellow-500 border"
                        : "text-red-500 bg-red-50 rounded-full px-3 border-red-500 border"
                  }
                >
                  {question.difficulty}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => window.open(question.url, "_blank")}
                className="w-full"
              >
                Solve on LeetCode
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeetcodeQuestions;
