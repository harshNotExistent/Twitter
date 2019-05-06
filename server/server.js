const express = require("express")

const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost/twitter"

try {
    mongoose.connect(url, {
        //useMongoClient: true
    })    
} catch (error) {
    
}
let port = 5002 || process.env.PORT

app.use(cors())
app.use(bodyParser.json())


//app.use(jwt()); 

app.listen(port, () => {
});