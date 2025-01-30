const { chatSession } = require("./geminiModel")

let industryInsights = null;

const fetchIndustryInsights = async () => {
    try {
      const prompt = `
        Analyze the current state of the software developer industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
        {
          "salaryRanges": [
            { "role": "string", "min": number, "max": number, "median": number, "location": "india" }
          ],
          "growthRate": number,
          "demandLevel": "High" | "Medium" | "Low",
          "topSkills": ["skill1", "skill2"] //top 5 skills,
          "marketOutlook": "Positive" | "Neutral" | "Negative",
          "keyTrends": ["trend1", "trend2"],
          "recommendedSkills": ["skill1", "skill2"]
        }
        IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
        Include at least 5 common roles for salary ranges.
        Growth rate should be a percentage.
        Include top 5 trends and top 10 recommendedSkills in demand.
      `;
  
      const result = await chatSession.sendMessage(prompt);
      const responseText = result.response.text();
      industryInsights = JSON.parse(responseText.replace('```json', '').replace('```', ''));
      console.log("Industry insights updated:", industryInsights);
    } catch (error) {
      console.error("Error fetching insights:", error.message);
    }
  }
  
  const getIndustryInsights = () => {
    return industryInsights || { message: "Insights not available yet." };
  }

  module.exports = {fetchIndustryInsights,getIndustryInsights}