// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const fs = require("fs");

// const app = express();

//  AUTHENTICATE USER AS ADMIN
//  verify email and password
//  verify user as admin
//  give acess to credit/debit users

const userBalance = (req, res) => {
  const userData = req.body;

  const dataStore = JSON.parse(fs.readFileSync("src/datastore.json"));

  const customer = dataStore.find(function checkUsername({ username }) {
    return username === userData.customer;
  });

  if (!customer) return res.status(401).json({ message: "customer not found" });

  if (userData.action === "creditUser") {
    customer.accountBalance += userData.amount;
  } else if (userData.action === "debitUser") {
    customer.accountBalance -= userData.amount;
  }
  fs.writeFileSync("src/datastore.json", JSON.stringify(dataStore, null, 2));
  return res.status(200).json({
    message: "customer account balance has been updated successfully",
  });
};

module.exports = userBalance;
