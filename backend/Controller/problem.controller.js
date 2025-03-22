const Problem = require("../Models/problems.model");
const User = require("../Models/user.model");
const axios = require("axios");

// Create and Save a new Problem

const addproblem = async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create and save many problems
const addproblems = async (req, res) => {
  try {
    const problems = await Problem.insertMany(req.body);
    res
      .status(201)
      .json({ message: "Problems created successfully", problems });
  } catch (error) {
    res.status(500).json({ message: "Error creating problems", error });
  }
};

// Retrieve and return all problems from the database.
const getproblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Find a single problem with an id
const getproblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    res.json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// check code

const checkCode = async (req, res) => {
  const { problemId, sourceCode, languageId } = req.body;

  try {
    // Fetch the problem from the database
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    let testResults = [];

    // Execute user code against all test cases
    for (let testCase of problem.testCases) {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: sourceCode,
          language_id: languageId,
          stdin: testCase.input,
        },
        {
          headers: {
            "x-rapidapi-key": process.env.JUDGE0_API_KEY,
            "x-rapidapi-host": "judge029.p.rapidapi.com",
            "content-type": "application/json",
          },
        }
      );

      // Wait for execution to complete
      const token = response.data.token;
      console.log("token", token);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Small delay

      // Fetch execution result
      const result = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        {
          headers: {
            "x-rapidapi-key": process.env.JUDGE0_API_KEY,
            "x-rapidapi-host": "judge029.p.rapidapi.com",
            "content-type": "application/json",
          },
        }
      );

      // Compare output with expected output
      const output = result.data.stdout?.trim() || "";
      const expected = testCase.expectedOutput.trim();
      const passed = output === expected;

      testResults.push({
        input: testCase.input,
        expectedOutput: expected,
        actualOutput: output,
        status: passed ? "Passed" : "Failed",
      });
    }

    // Return test case results
    res.json({ testResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addproblem,
  getproblems,
  getproblem,
  checkCode,
  addproblems,
};
