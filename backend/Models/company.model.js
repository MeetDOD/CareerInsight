const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  logo: String,
  Role: [String],
  rounds: [String],
  preparationTips: [String],
  references: [String],
});

module.exports = mongoose.model("Company", companySchema);
