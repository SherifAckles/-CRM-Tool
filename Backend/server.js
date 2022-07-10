require('dotenv').config()
import express from 'express'
const app = express()
import { connect, connection } from 'mongoose'

connect(process.env.DATABASE_URL)
const db = connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(3000, () => console.log('Server Started'))
