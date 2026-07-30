import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import cvRoutes from './routes/cvRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/cvs', cvRoutes)

app.use(errorHandler)

export default app
