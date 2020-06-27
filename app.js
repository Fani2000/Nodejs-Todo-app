//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const today = require(__dirname + '/date.js')

const app = express()

let tasks = ['Watch movies', 'Play video games'];

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', (req, res) => {

    let day = today.getCurrentDate()

    res.render("list", { day: day, newItems: tasks })
})

app.get('/about', (req, res) => {
    res.render("about")
})

app.post('/', (req, res) => {
    let task = req.body.task

    tasks.push(task)
        //console.log(task)
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('The app has started!')
})