const express = require('express')
const mongoose = require('mongoose')
const authRouter = require("./authRouter")
const cors = require('cors')
const path = require('path')
const port = process.env.port || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use("/auth", authRouter)

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname, '../')))

const start = async () => {
    try{
        await mongoose.connect(`mongodb+srv://admin:admin@cluster0.zeoir0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        app.listen(port, () => console.log(`server started on port ${port}`))
    } catch(e) {
        console.log(e)
    }
}

start()