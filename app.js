//jshint esversion:6
const express = require('express')
const bodyParser = require('body-parser')
const today = require(__dirname + '/date.js')
const mongoose = require('mongoose')

//allows us to specify the database to connect to or create
mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true });

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Task = new mongoose.model("Task", TaskSchema)

// const task = new Task({ name: "Take a picture" })
// task.save()

// Task.insertMany([{ name: "Read a book" }, { name: "Play games" }, { name: "watch Good doctor" }], (err) => { if (err) console.log(err) })

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', (req, res) => {

    let day = today.getCurrentDate()

    Task.find((err, results) => {
        if (err) console.log(err)

        res.render("list", { day: day, newItems: results })
    })
})

app.get('/about', (req, res) => {
    res.render("about")
})

app.post('/', (req, res) => {

    const task = new Task({ name: req.body.task })
    task.save()

    //console.log(task)
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('The app has started!')
})