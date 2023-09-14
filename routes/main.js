const express = require('express')
const mainRouter = express.Router()

const { login, dashboard } = require('../controllers/main')
const { authMiddleware } = require('../middleware/auth')

mainRouter.route('/dashboard').get(authMiddleware, dashboard)
mainRouter.route('/login').post(login)

module.exports = { mainRouter }