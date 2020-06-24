const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require ("cors")
const bodyParser = require("body-parser")
// bodyParser parses JSON
const path = require("path")
const Puppy = require("./models/Puppy.model.js")
const puppyRouter = require("./routers/puppy")

require("dotenv").config()
// to access environment variables in the dotenv file

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

// connect our app to MongoDB with Mongoose
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
  "useCreateIndex": true,
  "useFindAndModify": false,
})
const connection = mongoose.connection

// open the mongoose connection
connection.once("open", () => {
  console.log("💾 MongoDB connection established")
})

app.use("/puppies", puppyRouter)

// const myDog = new Puppy({
//   name: 'Zildjian',
//   breed: "mixed",
//   age: 10,
//   adopted: true,
// })

// myDog.save().then(() => console.log("Saved ur pup!"))

app.get("/", (req, res) => {
  // res.send("<h1>🦝 Hello world or whatever</h1>")
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// serve any file in /public on its own route!
app.use(express.static(path.join(__dirname, "public")))


app.listen(PORT, () => console.log(`📠 Server running on port ${PORT}`))
