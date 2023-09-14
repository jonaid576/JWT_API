require('dotenv').config()
require('express-async-errors')
const { notFound } = require('./middleware/not-found')
const { mainRouter } = require('./routes/main')

const express = require('express')
const { errorHandler } = require('./middleware/error-handler')
const app = express()

app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1', mainRouter)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

const start = () => {
    try {
        app.listen(port, () => console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()