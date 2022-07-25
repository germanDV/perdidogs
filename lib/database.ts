import mongoose, { ConnectOptions } from 'mongoose'

const USER = process.env.MONGO_USER
const PASS = process.env.MONGO_PASS
const HOST = process.env.MONGO_HOST
const PORT = process.env.MONGO_PORT
const IS_PROD = process.env.NODE_ENV === 'production'

const connOpts: ConnectOptions = {
  autoIndex: !IS_PROD,
  maxPoolSize: 10,
  socketTimeoutMS: 45_000,
  dbName: 'perdidogs',
}

const URI = IS_PROD ? `mongodb://${USER}:${PASS}@${HOST}:${PORT}` : `mongodb://${HOST}:${PORT}`

export const conn = mongoose.createConnection(URI, connOpts)

conn.on('connected', () => console.log('Connected to MONGODB'))
conn.on('error', (err) => console.log(`MONGODB connection error: ${err}`))
conn.on('disconnected', () => console.log('MONGODB connection error: connection lost.'))
