import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Successfully connected to mongodb database`)
}).catch((err) => console.log("Error " + err))


app.listen(config.port, (err) => {
    if (err) console.log("Error while starting server...")
    console.info(`Listening to port. Visit http://localhost:${config.port} to browse...`)
})