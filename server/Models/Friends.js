const mongoose = require('mongoose')

const FriendSchema = new mongoose.Schema( {
    name: {
        type: String,
        required : true
    },
    age: {
        type : Number,
        required: true
    },
    description: {
        type : String,
        required: false
    }
})

const FriendModel = mongoose.model('friendsMern', FriendSchema)
// The first argument is the singular name of the collection that will be created for your model (Mongoose will create the database collection for the above model SomeModel above), and the second argument is the schema you want to use in creating the model.

module.exports = FriendModel