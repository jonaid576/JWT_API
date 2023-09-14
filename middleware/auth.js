const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        throw new UnauthenticatedError('No token provided')
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        const { id, name } = decoded
        req.user = { id, name }
        next()
    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access this route")
    }
}

module.exports = { authMiddleware }