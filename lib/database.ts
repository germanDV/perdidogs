import mongoose, { ConnectOptions } from 'mongoose'

const USER = process.env.MONGO_USER
const PASS = process.env.MONGO_PASS
const HOST = process.env.MONGO_HOST
const PORT = process.env.MONGO_PORT
const IS_PROD = process.env.NODE_ENV === 'production'

const URI = IS_PROD
  ? `mongodb+srv://${USER}:${PASS}@${HOST}/?retryWrites=true&w=majority`
  : `mongodb://${HOST}:${PORT}`

mongoose.set('sanitizeFilter', true)

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      autoIndex: !IS_PROD,
      dbName: 'perdidogs',
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(URI, opts).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
