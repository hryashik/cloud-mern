const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.routes')
const app = express()
const config = require('./config/default.json')
const corsMiddleware = require('./middleware/cors-middleware')

app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
  try {
    await mongoose.connect(config.dbUrl)
    app.listen(config.serverPort, () => console.log(`Server starts on ${config.serverPort}`))
  } catch (e) {
    console.log(e)
  }
}

start()
