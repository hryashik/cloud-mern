const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.routes')
const filesRouter = require('./routes/files.routes')
const usersRouter = require('./routes/users.routes')
const app = express()
const config = require('./config/default.json')
const corsMiddleware = require('./middleware/cors-middleware')
const fileUpload = require('express-fileupload')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/files', filesRouter)
app.use('/api/users', usersRouter)

const start = async () => {
  try {
    await mongoose.connect(config.dbUrl)
    app.listen(config.serverPort, () => console.log(`Server starts on ${config.serverPort}`))
  } catch (e) {
    console.log(e)
  }
}
start()
