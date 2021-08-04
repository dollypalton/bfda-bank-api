const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const auth = require("./controllers/auth")
const pageRoute = require('./routes')


const app = express()
const PORT = 3000;

app.use(express.json())
app.use(pageRoute)

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`)
})


