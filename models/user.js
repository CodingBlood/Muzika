const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true,'Username cant be blank'],
            unique: true
        },
        password:  {
            type: String,
            required: [true,'Password cant be blank']
        }
    })


module.exports = mongoose.model('User',userSchema);