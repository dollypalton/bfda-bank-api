const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const fs = require("fs")

const app = express()



const signUp = (req, res) => {
    const userData = req.body

    if (!userData.userRole) userData.userRole = "customer"
    if (!userData.accountType) userData.accountType = "savings"
    if (!userData.accountBalane) userData.accountBalane = 0

    const dataStore = JSON.parse(fs.readFileSync("datastore.json"))

    if (!userData.username || !userData.password) return res.status(401).json({ message: "Please input username or password!" })

    let userExist
    dataStore.forEach(user => {
        if (userData.username === user.username) {
            userExist = true
        } else {
            userExist = false
        }
    });

    if (userExist) {
        return res.status(201).json({
            message: "User already exists!"
        })
    }

    let hashedPassword = bcrypt.hashSync(userData.password)
    userData.password = hashedPassword

    console.log(dataStore)

    dataStore.push(userData)
    fs.writeFileSync("datastore.json", JSON.stringify(dataStore, null, 2))

    return res.status(200).json({
        message: "User registered succesfully!"
    })
}




const signIn = (req, res) => {
    const userData = req.body
    const dataStore = JSON.parse(fs.readFileSync("datastore.json"))


    if (!userData.username || !userData.password) return res.status(401).json({ message: "Please input username or password!" })


    user = dataStore.find(function ({ username }) {
        return username === userData.username

    })

    if (!user) {
        return res.status(401).json({
            message: "User does not exists!"
        })
    }
    console.log(user.password)
    const ispasswordvalid = bcrypt.compareSync(userData.password, user.password)
    console.log(ispasswordvalid)
    if (!ispasswordvalid) return res.status(421).json({ message: "Input correct password" })

    const token = jwt.sign({ user: userData.username }, "secret", { expiresIn: "5m" })

    return res.status(200).json({
        message: "Login Successful!",
        data: token,
    })
}



module.exports = { signUp, signIn }