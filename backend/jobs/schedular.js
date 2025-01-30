const cron = require("node-cron");
const { fetchIndustryInsights } = require("./industryInsights");

cron.schedule("0 0 * * *", () => {
    console.log("Fetching latest industry insights...");
    fetchIndustryInsights();
});

fetchIndustryInsights();