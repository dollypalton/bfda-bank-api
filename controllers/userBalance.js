const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const fs = require("fs")

const app = express()


//AUTHENTICATE USER AS ADMIN
//verify email and password
//verify user as admin
//give acess to credit/debit users

const userBalance = (req, res) => {
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
    const ispasswordvalid = bcrypt.compareSync(userData.password, user.password)

    if (!ispasswordvalid) return res.status(421).json({ message: "Input correct password" })

    if (user.userRole !== "admin") return res.status(401).json({
        message: "user does not have access"
    })

    const customer = dataStore.find(function ({ username }) {
        return username === userData.customer
    })

    if (!customer) return res.status(401).json({ message: "customer not found" })

    if (userData.action === "creditUser") {
        customer.accountBalance += userData.amount
    } else if (userData.action === "debitUser") {
        customer.accountBalance -= userData.amount
    }
    fs.writeFileSync("datastore.json", JSON.stringify(dataStore, null, 2))
    return res.status(200).json({ message: "account balance has been updated successfully" })


}


module.exports = userBalance