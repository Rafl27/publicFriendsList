const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const FriendModel = require('./Models/Friends.js')

const uri = "mongodb+srv://user:123@crudfriends.aifas.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send("I'm aliveeee")
})

app.post('/addfriend', async (req, res) => {

    const name = req.body.name
    const age = req.body.age
    const description = req.body.description
    const friend = new FriendModel({
        name: name,
        age: age,
        description: description,
    });
    await friend.save()
    res.send(friend)
})

app.put('/update', async (req, res) => {
    const newAge = req.body.newAge
    const id = req.body.id
    console.log(newAge, id)
    try {
        await FriendModel.findById(id, (error, friendToUpdate) => {
            friendToUpdate.age = Number(newAge)
            //in the case above, when I receive the new age from the request, it is a string, but in my database age is a number, so that`s why I`m converting it to Number
            friendToUpdate.save()
        })

    } catch (error) {
        console.log(error)
    }

    res.send('age updated')
})

app.get('/read', (req, res) => {
    FriendModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })
})

app.delete('/delete/:id', async (req,res) => {
    const id = req.params.id
    await FriendModel.findByIdAndRemove(id).exec()
    res.send(`${id} removed from the database.`)
})

app.listen(3001, () => console.log("The server is running on http//:localhost:3001"))