//  const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// const app = express();

const signUp = (req, res) => {
  const userData = req.body;

  if (!userData.userRole) userData.userRole = "customer";
  if (!userData.accountType) userData.accountType = "savings";
  if (!userData.accountBalane) userData.accountBalane = 0;

  const dataStore = JSON.parse(fs.readFileSync("src/datastore.json"));

  if (!userData.username || !userData.password)
    return res
      .status(401)
      .json({ message: "Please input username or password!" });

  let user;
  dataStore.forEach((customer) => {
    if (userData.username === customer.username) {
      user = true;
    } else {
      user = false;
    }
  });

  if (user) {
    return res.status(201).json({
      message: "User already exists!",
    });
  }

  const hashedPassword = bcrypt.hashSync(userData.password);
  userData.password = hashedPassword;

  const token = jwt.sign(
    { user: userData.username, role: userData.accountBalance },
    "RANDOM_TOKEN_SECRET",
    {
      expiresIn: "10m",
    }
  );
  console.log(userData.userBalance);

  dataStore.push(userData);
  fs.writeFileSync("src/datastore.json", JSON.stringify(dataStore, null, 2));

  return res.status(200).json({
    message: "User registered succesfully!",
    data: token,
  });
};

const signIn = (req, res) => {
  const userData = req.body;
  const dataStore = JSON.parse(fs.readFileSync("src/datastore.json"));

  if (!userData.username || !userData.password)
    return res
      .status(401)
      .json({ message: "Please input username or password!" });

  const user = dataStore.find(function checkUsername({ username }) {
    return username === userData.username;
  });

  if (!user) {
    return res.status(401).json({
      message: "User does not exists!",
    });
  }

  const ispasswordvalid = bcrypt.compareSync(userData.password, user.password);

  if (!ispasswordvalid)
    return res.status(421).json({ message: "Input correct password" });

  const token = jwt.sign(
    { user: userData.username, role: user.userRole },
    "RANDOM_TOKEN_SECRET",
    {
      expiresIn: "10m",
    }
  );

  return res.status(200).json({
    message: "Login Successful!",
    data: token,
  });
};

module.exports = { signUp, signIn };
