const express = require('express')
const Tasks = require('./models/task')
const User = require("./models/user")
require('./db/mongoose')

// const { request } = require('https')

const app = express()
const port = process.env.PORT || 3000




app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findById(_id).then((user) => {
//         if (!user) {
//            return res.status(404).send()
//         }
//     res.send(user)
//     }).catch((e) => {
//         res.status(500).send()
//      })
//  })

app.post('/tasks', (req, res) => {
    // console.log(req.body)
    // res.send("test")
    const task = new Tasks(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
     })
})


app.get('/tasks',(req,res) =>{
    Tasks.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e) =>{
        res.status(500).send()
    })
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, ()=>{
    console.log('Server is up port ' + port)
})
