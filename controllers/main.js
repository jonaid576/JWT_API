const { CustomAPIError } = require("../errors/custom-error")
const jwt = require('jsonwebtoken')
const BadRequest = require("../errors/bad-request")
require('dotenv').config()
const { StatusCodes } = require("http-status-codes")

const login = async (req, res) => {
    const { name, password } = req.body
    // console.log(req.body)
    if (!name || !password) {
        // console.log('no username & password')
        return res.status(StatusCodes.BAD_REQUEST).send("Please provide email and password")
        // throw new BadRequest('Please provide email and password')
    }
    const token = jwt.sign({ id: Date.now(), name }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    // console.log(req.headers)
    const { name } = req.user
    const luckyNumber = Math.floor(Math.random() * 100)
    return res.status(200).json({ msg: `Hello, ${name}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = { login, dashboard }