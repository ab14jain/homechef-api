const mongose = require('mongoose');

const userSchema = mongose.Schema({
    _id: mongose.Schema.Types.ObjectId, 
    email: { 
        type: String,
        required: true,
        //unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },     
    password: { type: String, required: true}
});

module.exports = mongose.model('User', userSchema);