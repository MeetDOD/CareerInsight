const Company = require("../Models/company.model");
const User = require("../Models/user.model");

const createcompanydetails = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).send(company);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getcompanydetails = async (req, res) => {
  try {
    const company = await Company.find();
    res.json(company);
  } catch (error) {
    res.status(400).send;
  }
};

const getcompanydetail = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.json(company);
  } catch (error) {
    res.status(400).send;
  }
};

const updatecompanydetails = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(company);
  } catch (error) {
    res.status(404).send({ message: "Company not found" });
  }
};

const deletecompanydetails = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).send("Company not found");
    }
    res.send(company);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createcompanydetails,
  getcompanydetails,
  getcompanydetail,
  updatecompanydetails,
  deletecompanydetails,
};
